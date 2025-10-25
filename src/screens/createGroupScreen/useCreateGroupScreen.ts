import { useState, useCallback } from 'react';
import { groupsApi } from '@/services/groups/groupsApi';
import { CreateGroupFormData } from './typesCreateGroupScreen';

const initialFormData: CreateGroupFormData = {
  name: '',
  description: '',
  sportIds: [],
  city: '',
  state: '',
  isPublic: true,
};

export const useCreateGroupScreen = () => {
  const [formData, setFormData] =
    useState<CreateGroupFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof CreateGroupFormData, string>>
  >({});

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
      await groupsApi.createGroup({
        name: formData.name,
        description: formData.description,
        sportIds: formData.sportIds,
        city: formData.city || undefined,
        state: formData.state || undefined,
        isPublic: formData.isPublic,
        maxMembers: formData.maxMembers,
      });
      return true;
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validate]);

  return {
    formData,
    errors,
    isSubmitting,
    updateField,
    handleSubmit,
  };
};
