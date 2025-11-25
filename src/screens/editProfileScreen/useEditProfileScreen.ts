import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useAlert } from '@/contexts/AlertContext';
import { useSports } from '@/contexts/SportsContext';
import { usersApi } from '@/services/users/api';
import { updateUserSports } from '@/services/sports';
import { SkillLevel, Sport } from '@/types/sport';
import { useImageUpload } from '@/hooks/useImageUpload';
import {
  EditProfileFormData,
  EditProfileFormErrors,
} from './typesEditProfileScreen';

const calculateAge = (birthDate: Date | null): number | null => {
  if (!birthDate) return null;

  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
};

interface UseEditProfileScreenReturn {
  formData: EditProfileFormData;
  errors: EditProfileFormErrors;
  isLoading: boolean;
  isSaving: boolean;
  availableSports: Sport[];
  isUploadingAvatar: boolean;
  isUploadingCover: boolean;
  avatarUploadProgress: number;
  coverUploadProgress: number;
  calculatedAge: number | null;
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

  const avatarUpload = useImageUpload({
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8,
  });

  const coverUpload = useImageUpload({
    allowsEditing: true,
    aspect: [16, 9],
    quality: 0.8,
  });

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
  const isInitializedRef = useRef(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!isInitializedRef.current && user && !sportsLoading) {
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

          setFormData(prev => ({
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            bio: user.bio || '',
            birthDate: dateOfBirthValue ? new Date(dateOfBirthValue) : null,
            gender: user.gender || null,
            profilePicture: prev.profilePicture || user.profilePicture || null,
            coverPhoto: prev.coverPhoto || user.coverImage || null,
            state: user.state || '',
            city: user.city || '',
            isProfilePrivate: user.isProfilePrivate || false,
            selectedSports: userSportIds,
            sportLevels,
            primarySportId,
          }));

          isInitializedRef.current = true;
          setIsLoading(false);
        }
      } catch {
        showError('Erro ao carregar dados');
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
        const isFirstSport = prev.selectedSports.length === 0;
        return {
          ...prev,
          selectedSports: [...prev.selectedSports, sportId],
          sportLevels: {
            ...prev.sportLevels,
            [sportId]: SkillLevel.INTERMEDIATE,
          },
          primarySportId: isFirstSport ? sportId : prev.primarySportId,
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
        profilePicture: formData.profilePicture || undefined,
        coverImage: formData.coverPhoto || undefined,
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

        const finalUser = {
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
        };
        await updateUser(finalUser);
      } else {
        const finalUser = {
          ...updatedUser,
          hasSports: false,
          sports: [],
        };
        await updateUser(finalUser);
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
    if (!user?.id) return;

    try {
      const selectedImage = await avatarUpload.pickImage();

      if (selectedImage) {
        const url = await avatarUpload.uploadImage({
          image: selectedImage,
          folder: `/users/${user.id}/avatar`,
          fileName: `avatar_${Date.now()}.jpg`,
          tags: ['avatar', 'profile'],
        });

        if (url) {
          setFormData(prev => ({
            ...prev,
            profilePicture: url,
          }));
          showSuccess('Foto de perfil atualizada');
        }
      }
    } catch (error) {
      showError(
        error instanceof Error ? error.message : 'Erro ao fazer upload da foto'
      );
    }
  }, [user?.id, avatarUpload, showSuccess, showError]);

  const handlePickCoverPhoto = useCallback(async () => {
    if (!user?.id) return;

    try {
      const selectedImage = await coverUpload.pickImage();

      if (selectedImage) {
        const url = await coverUpload.uploadImage({
          image: selectedImage,
          folder: `/users/${user.id}/cover`,
          fileName: `cover_${Date.now()}.jpg`,
          tags: ['cover', 'profile'],
        });

        if (url) {
          setFormData(prev => ({
            ...prev,
            coverPhoto: url,
          }));
          showSuccess('Foto de capa atualizada');
        }
      }
    } catch (error) {
      showError(
        error instanceof Error
          ? error.message
          : 'Erro ao fazer upload da foto de capa'
      );
    }
  }, [user?.id, coverUpload, showSuccess, showError]);

  const handleCancel = useCallback(() => {
    showConfirm({
      title: 'Descartar alterações',
      message: 'Tem certeza que deseja descartar as alterações?',
      confirmText: 'Sim',
      cancelText: 'Não',
      onConfirm: () => navigation.goBack(),
    });
  }, [navigation, showConfirm]);

  const calculatedAge = useMemo(
    () => calculateAge(formData.birthDate),
    [formData.birthDate]
  );

  return {
    formData,
    errors,
    isLoading,
    isSaving,
    availableSports,
    isUploadingAvatar: avatarUpload.isUploading,
    isUploadingCover: coverUpload.isUploading,
    avatarUploadProgress: avatarUpload.uploadProgress,
    coverUploadProgress: coverUpload.uploadProgress,
    calculatedAge,
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
