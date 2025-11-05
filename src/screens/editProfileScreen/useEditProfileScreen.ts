import { useState, useCallback, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '@/contexts/AuthContext';
import { useAlert } from '@/contexts/AlertContext';
import { useSports } from '@/contexts/SportsContext';
import { usersApi } from '@/services/users/api';
import { updateUserSports } from '@/services/sports';
import { SkillLevel, Sport } from '@/types/sport';
import {
  EditProfileFormData,
  EditProfileFormErrors,
} from './typesEditProfileScreen';

interface UseEditProfileScreenReturn {
  formData: EditProfileFormData;
  errors: EditProfileFormErrors;
  isLoading: boolean;
  isSaving: boolean;
  availableSports: Sport[];
  handleFieldChange: (
    field: keyof EditProfileFormData,
    value: string | Date | boolean | null
  ) => void;
  handleToggleSport: (sportId: string) => void;
  handleTogglePrimary: (sportId: string) => void;
  handleUpdateSportLevel: (sportId: string, level: SkillLevel) => void;
  handlePickProfilePicture: () => Promise<void>;
  handlePickCoverPhoto: () => Promise<void>;
  handleSave: () => Promise<void>;
  handleCancel: () => void;
}

interface UseEditProfileScreenParams {
  navigation: {
    goBack: () => void;
  };
}

export const useEditProfileScreen = ({
  navigation,
}: UseEditProfileScreenParams): UseEditProfileScreenReturn => {
  const { user, updateUser } = useAuth();
  const { showSuccess, showError, showConfirm } = useAlert();
  const { sports: availableSports, isLoading: sportsLoading } = useSports();

  const [formData, setFormData] = useState<EditProfileFormData>({
    firstName: '',
    lastName: '',
    bio: '',
    birthDate: null,
    gender: null,
    state: '',
    city: '',
    isProfilePrivate: false,
    selectedSports: [],
    sportLevels: {},
    primarySportId: null,
  });

  const [errors, setErrors] = useState<EditProfileFormErrors>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (user && !sportsLoading) {
          const userSportIds = user.sports?.map(s => s.sportId) || [];

          const sportLevels: { [sportId: string]: SkillLevel } = {};
          let primarySportId: string | null = null;

          user.sports?.forEach(userSport => {
            sportLevels[userSport.sportId] = userSport.skillLevel as SkillLevel;
            if (userSport.isPrimary) {
              primarySportId = userSport.sportId;
            }
          });

          const dateOfBirthValue = user.dateOfBirth || user.birthDate || null;

          setFormData({
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            bio: user.bio || '',
            birthDate: dateOfBirthValue ? new Date(dateOfBirthValue) : null,
            gender: user.gender || null,
            profilePicture: user.profilePicture || null,
            coverPhoto: null,
            state: user.state || '',
            city: user.city || '',
            isProfilePrivate: user.isProfilePrivate || false,
            selectedSports: userSportIds,
            sportLevels,
            primarySportId,
          });
        }
      } catch {
        showError('Erro ao carregar dados');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [user, sportsLoading, showError]);

  const validateForm = useCallback((): boolean => {
    const newErrors: EditProfileFormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Nome é obrigatório';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Sobrenome é obrigatório';
    }

    if (formData.bio && formData.bio.length > 500) {
      newErrors.bio = 'Bio deve ter no máximo 500 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleFieldChange = useCallback(
    (
      field: keyof EditProfileFormData,
      value: string | Date | boolean | null
    ) => {
      setFormData(prev => {
        if (field === 'state' && prev.state !== value) {
          return {
            ...prev,
            state: value as string,
            city: '',
          };
        }
        return { ...prev, [field]: value };
      });

      if (field === 'state') {
        setErrors(prev => ({ ...prev, state: undefined, city: undefined }));
      } else {
        setErrors(prev => ({ ...prev, [field]: undefined }));
      }
    },
    []
  );

  const handleToggleSport = useCallback((sportId: string) => {
    setFormData(prev => {
      const isSelected = prev.selectedSports.includes(sportId);

      if (isSelected) {
        const newLevels = { ...prev.sportLevels };
        delete newLevels[sportId];
        return {
          ...prev,
          selectedSports: prev.selectedSports.filter(id => id !== sportId),
          sportLevels: newLevels,
          primarySportId:
            prev.primarySportId === sportId ? null : prev.primarySportId,
        };
      } else {
        return {
          ...prev,
          selectedSports: [...prev.selectedSports, sportId],
          sportLevels: {
            ...prev.sportLevels,
            [sportId]: SkillLevel.INTERMEDIATE,
          },
        };
      }
    });
  }, []);

  const handleTogglePrimary = useCallback((sportId: string) => {
    setFormData(prev => ({
      ...prev,
      primarySportId: prev.primarySportId === sportId ? null : sportId,
    }));
  }, []);

  const handleUpdateSportLevel = useCallback(
    (sportId: string, level: SkillLevel) => {
      setFormData(prev => ({
        ...prev,
        sportLevels: {
          ...prev.sportLevels,
          [sportId]: level,
        },
      }));
    },
    []
  );

  const handleSave = useCallback(async () => {
    if (!validateForm()) {
      showError('Por favor, corrija os erros antes de continuar');
      return;
    }

    if (!user?.id) {
      showError('Usuário não encontrado');
      return;
    }

    try {
      setIsSaving(true);

      const updatedUser = await usersApi.updateUserProfile(user.id, {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        bio: formData.bio.trim() || undefined,
        dateOfBirth: formData.birthDate?.toISOString() || undefined,
        gender: formData.gender || undefined,
        state: formData.state || undefined,
        city: formData.city || undefined,
        isProfilePrivate: formData.isProfilePrivate,
      });

      if (formData.selectedSports.length > 0) {
        const sportsData = formData.selectedSports.map(sportId => ({
          sportId,
          isPrimary: sportId === formData.primarySportId,
          skillLevel: formData.sportLevels[sportId] || SkillLevel.INTERMEDIATE,
        }));

        const updatedSports = await updateUserSports(user.id, {
          sports: sportsData,
        });

        await updateUser({
          ...updatedUser,
          hasSports: true,
          sports: updatedSports.map(userSport => ({
            sportId: userSport.sportId,
            sportName: userSport.sportName,
            sportIcon: userSport.sportIcon,
            sportColor: userSport.sportColor,
            isPrimary: userSport.isPrimary,
            skillLevel: userSport.skillLevel,
          })),
        });
      } else {
        await updateUser({
          ...updatedUser,
          hasSports: false,
          sports: [],
        });
      }

      showSuccess('Perfil atualizado com sucesso', () => navigation.goBack());
    } catch (error) {
      showError(
        error instanceof Error
          ? error.message
          : 'Erro ao atualizar perfil. Tente novamente.'
      );
    } finally {
      setIsSaving(false);
    }
  }, [
    formData,
    user,
    validateForm,
    updateUser,
    navigation,
    showSuccess,
    showError,
  ]);

  const handlePickProfilePicture = useCallback(async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      showError('Precisamos de permissão para acessar suas fotos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setFormData(prev => ({
        ...prev,
        profilePicture: result.assets[0].uri,
      }));
    }
  }, [showError]);

  const handlePickCoverPhoto = useCallback(async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      showError('Precisamos de permissão para acessar suas fotos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setFormData(prev => ({
        ...prev,
        coverPhoto: result.assets[0].uri,
      }));
    }
  }, [showError]);

  const handleCancel = useCallback(() => {
    showConfirm({
      title: 'Descartar alterações',
      message: 'Tem certeza que deseja descartar as alterações?',
      confirmText: 'Sim',
      cancelText: 'Não',
      onConfirm: () => navigation.goBack(),
    });
  }, [navigation, showConfirm]);

  return {
    formData,
    errors,
    isLoading,
    isSaving,
    availableSports,
    handleFieldChange,
    handleToggleSport,
    handleTogglePrimary,
    handleUpdateSportLevel,
    handlePickProfilePicture,
    handlePickCoverPhoto,
    handleSave,
    handleCancel,
  };
};
