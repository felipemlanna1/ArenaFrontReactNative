import { useState, useCallback, useEffect } from 'react';
import { groupsApi } from '@/services/groups/groupsApi';
import { CreateGroupFormData } from './typesCreateGroupScreen';
import { Group } from '@/services/groups/typesGroups';

const initialFormData: CreateGroupFormData = {
  name: '',
  description: '',
  sportIds: [],
  city: '',
  state: '',
  isPublic: true,
};

export const useCreateGroupScreen = (
  existingGroup?: Group,
  groupId?: string
) => {
  const isEditMode = !!existingGroup && !!groupId;

  const [formData, setFormData] =
    useState<CreateGroupFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof CreateGroupFormData, string>>
  >({});

  useEffect(() => {
    if (existingGroup) {
      setFormData({
        name: existingGroup.name || '',
        description: existingGroup.description || '',
        sportIds: existingGroup.sports?.map(s => s.id) || [],
        city: existingGroup.city || '',
        state: existingGroup.state || '',
        isPublic: existingGroup.isPublic ?? true,
        maxMembers: existingGroup.maxMembers,
        coverImage: existingGroup.coverImage,
      });
    }
  }, [existingGroup]);

  const updateField = useCallback(
    <K extends keyof CreateGroupFormData>(
      key: K,
      value: CreateGroupFormData[K]
    ) => {
      setFormData(prev => ({ ...prev, [key]: value }));
      if (errors[key]) {
        setErrors(prev => ({ ...prev, [key]: undefined }));
      }
    },
    [errors]
  );

  const validate = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof CreateGroupFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    if (formData.sportIds.length === 0) {
      newErrors.sportIds = 'Selecione pelo menos um esporte';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(async (): Promise<boolean> => {
    if (!validate()) {
      return false;
    }

    setIsSubmitting(true);
    try {
      if (isEditMode && groupId) {
        await groupsApi.updateGroup(groupId, {
          name: formData.name,
          description: formData.description,
          sportIds: formData.sportIds,
          city: formData.city || undefined,
          state: formData.state || undefined,
          isPublic: formData.isPublic,
          maxMembers: formData.maxMembers,
          coverImage: formData.coverImage,
        });
      } else {
        await groupsApi.createGroup({
          name: formData.name,
          description: formData.description,
          sportIds: formData.sportIds,
          city: formData.city || undefined,
          state: formData.state || undefined,
          isPublic: formData.isPublic,
          maxMembers: formData.maxMembers,
          coverImage: formData.coverImage,
        });
      }
      return true;
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validate, isEditMode, groupId]);

  return {
    formData,
    errors,
    isSubmitting,
    updateField,
    handleSubmit,
  };
};
