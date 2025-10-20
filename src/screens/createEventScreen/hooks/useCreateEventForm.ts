import { useState, useCallback } from 'react';
import {
  CreateEventFormData,
  CreateEventFormErrors,
  DEFAULT_EVENT_VALUES,
  FormStep,
} from '../typesCreateEventScreen';

interface UseCreateEventFormReturn {
  formData: CreateEventFormData;
  errors: CreateEventFormErrors;
  currentStep: FormStep;
  setCurrentStep: (step: FormStep) => void;
  updateFormData: (data: Partial<CreateEventFormData>) => void;
  validateStep: (step: FormStep) => boolean;
  clearErrors: () => void;
  resetForm: () => void;
}

export const useCreateEventForm = (): UseCreateEventFormReturn => {
  const [formData, setFormData] =
    useState<CreateEventFormData>(DEFAULT_EVENT_VALUES);
  const [errors, setErrors] = useState<CreateEventFormErrors>({});
  const [currentStep, setCurrentStep] = useState<FormStep>(FormStep.BASIC_INFO);

  const updateFormData = useCallback((data: Partial<CreateEventFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
    setErrors({});
  }, []);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const resetForm = useCallback(() => {
    setFormData(DEFAULT_EVENT_VALUES);
    setErrors({});
    setCurrentStep(FormStep.BASIC_INFO);
  }, []);

  const validateStep = useCallback(
    (step: FormStep): boolean => {
      const newErrors: CreateEventFormErrors = {};

      switch (step) {
        case FormStep.BASIC_INFO:
          if (!formData.title.trim()) {
            newErrors.title = 'Título é obrigatório';
          } else if (formData.title.trim().length < 3) {
            newErrors.title = 'Título deve ter no mínimo 3 caracteres';
          } else if (formData.title.length > 100) {
            newErrors.title = 'Título deve ter no máximo 100 caracteres';
          }

          if (!formData.sportId) {
            newErrors.sportId = 'Selecione um esporte';
          }

          if (!formData.startDate) {
            newErrors.startDate = 'Selecione a data e hora';
          } else {
            const now = new Date();
            if (formData.startDate < now) {
              newErrors.startDate = 'Data deve ser no futuro';
            }
          }

          if (!formData.duration) {
            newErrors.duration = 'Selecione a duração';
          }
          break;

        case FormStep.LOCATION:
          if (!formData.location.zipCode.trim()) {
            newErrors.zipCode = 'CEP é obrigatório';
          } else if (
            formData.location.zipCode.replace(/\D/g, '').length !== 8
          ) {
            newErrors.zipCode = 'CEP inválido';
          }

          if (!formData.location.street.trim()) {
            newErrors.street = 'Rua é obrigatória';
          }

          if (!formData.location.district.trim()) {
            newErrors.district = 'Bairro é obrigatório';
          }

          if (!formData.location.city.trim()) {
            newErrors.city = 'Cidade é obrigatória';
          }

          if (!formData.location.state.trim()) {
            newErrors.state = 'Estado é obrigatório';
          }

          if (
            formData.maxParticipants !== null &&
            formData.maxParticipants < 2
          ) {
            newErrors.maxParticipants = 'Mínimo de 2 participantes';
          }

          if (formData.price < 0) {
            newErrors.price = 'Preço não pode ser negativo';
          }
          break;

        case FormStep.REVIEW:
          if (formData.ageRestriction) {
            const { min, max } = formData.ageRestriction;
            if (min && min < 5) {
              newErrors.ageMin = 'Idade mínima: 5 anos';
            }
            if (max && max > 120) {
              newErrors.ageMax = 'Idade máxima: 120 anos';
            }
            if (min && max && min > max) {
              newErrors.ageMin = 'Idade mínima maior que máxima';
            }
          }

          if (formData.rules && formData.rules.length > 2000) {
            newErrors.rules = 'Máximo 2000 caracteres';
          }

          if (formData.requirements && formData.requirements.length > 1000) {
            newErrors.requirements = 'Máximo 1000 caracteres';
          }
          break;
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    [formData]
  );

  return {
    formData,
    errors,
    currentStep,
    setCurrentStep,
    updateFormData,
    validateStep,
    clearErrors,
    resetForm,
  };
};
