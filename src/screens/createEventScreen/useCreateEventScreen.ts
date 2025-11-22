import { useCallback, useMemo } from 'react';
import { useCreateEventForm } from './hooks/useCreateEventForm';
import { useCreateEventApi } from './hooks/useCreateEventApi';
import {
  FormStep,
  TOTAL_STEPS,
  CreateEventFormData,
} from './typesCreateEventScreen';
import { CreateEventScreenNavigationProp } from './typesCreateEventScreen';
import { eventsService } from '@/services/events/eventsService';
import { useAlert } from '@/contexts/AlertContext';
import { Event } from '@/services/events/typesEvents';

interface UseCreateEventScreenParams {
  navigation: CreateEventScreenNavigationProp;
  isEditMode?: boolean;
  eventToEdit?: Event;
  preSelectedGroupId?: string;
  preSelectedSportId?: string;
}

export const useCreateEventScreen = ({
  navigation,
  isEditMode = false,
  eventToEdit,
  preSelectedGroupId,
  preSelectedSportId,
}: UseCreateEventScreenParams) => {
  const { showError, showSuccess, showConfirm } = useAlert();

  const initialData = useMemo(() => {
    if (preSelectedGroupId && !isEditMode) {
      return {
        privacy: 'GROUP_ONLY' as const,
        groupId: preSelectedGroupId,
        sportId: preSelectedSportId || '',
      };
    }

    if (!isEditMode || !eventToEdit) return undefined;

    const startDate = new Date(eventToEdit.startDate);
    const endDate = eventToEdit.endDate
      ? new Date(eventToEdit.endDate)
      : startDate;
    const duration =
      Math.round((endDate.getTime() - startDate.getTime()) / 60000) || 60;

    const initialFormData: Partial<CreateEventFormData> = {
      title: eventToEdit.title,
      description: eventToEdit.description || '',
      sportId: eventToEdit.sport?.id || '',
      startDate,
      duration,
      location: {
        zipCode: eventToEdit.location?.zipCode || '',
        street: eventToEdit.location?.street || '',
        number: eventToEdit.location?.number || '',
        complement: eventToEdit.location?.complement || '',
        district: eventToEdit.location?.district || '',
        city: eventToEdit.location?.city || '',
        state: eventToEdit.location?.state || '',
        country: eventToEdit.location?.country || 'Brasil',
        latitude: eventToEdit.location?.latitude || 0,
        longitude: eventToEdit.location?.longitude || 0,
        formattedAddress: eventToEdit.location?.formattedAddress || '',
      },
      privacy: eventToEdit.privacy || 'PUBLIC',
      maxParticipants: eventToEdit.maxParticipants || null,
      isFree: eventToEdit.isFree ?? true,
      price: typeof eventToEdit.price === 'number' ? eventToEdit.price : 0,
      coverImage: eventToEdit.coverImage,
    };
    return initialFormData;
  }, [isEditMode, eventToEdit, preSelectedGroupId, preSelectedSportId]);

  const {
    formData,
    errors,
    currentStep,
    setCurrentStep,
    updateFormData,
    validateStep,
    resetForm,
  } = useCreateEventForm(initialData);

  const { isCreating, createEvent } = useCreateEventApi();

  const handleNext = useCallback(() => {
    if (validateStep(currentStep)) {
      if (currentStep < TOTAL_STEPS - 1) {
        setCurrentStep((currentStep + 1) as FormStep);
      }
    }
  }, [currentStep, validateStep, setCurrentStep]);

  const handlePrevious = useCallback(() => {
    if (currentStep > FormStep.BASIC_INFO) {
      setCurrentStep((currentStep - 1) as FormStep);
    }
  }, [currentStep, setCurrentStep]);

  const handleSubmit = useCallback(async () => {
    const stepsToValidate = [
      FormStep.BASIC_INFO,
      FormStep.PRIVACY,
      FormStep.LOCATION,
      FormStep.REVIEW,
    ];

    const validationResults = stepsToValidate.map((step, index) =>
      validateStep(step, index > 0)
    );
    const allStepsValid = validationResults.every(isValid => isValid);

    if (!allStepsValid) {
      showError(
        `Por favor, corrija os erros antes de ${isEditMode ? 'salvar' : 'criar'} o evento.`
      );
      return;
    }

    try {
      let result;

      if (isEditMode && eventToEdit?.id) {
        const updateDto = {
          title: formData.title,
          description: formData.description,
          sportId: formData.sportId,
          startDate: formData.startDate?.toISOString(),
          endDate: formData.startDate
            ? new Date(
                formData.startDate.getTime() + formData.duration * 60000
              ).toISOString()
            : undefined,
          location: formData.location,
          price: formData.price || 0,
          maxParticipants: formData.maxParticipants || undefined,
          coverImage: formData.coverImage,
          privacy: formData.privacy || 'PUBLIC',
          isFree: formData.isFree ?? (!formData.price || formData.price === 0),
        };
        result = await eventsService.updateEvent(eventToEdit.id, updateDto);
      } else {
        result = await createEvent(formData);
      }

      if (result) {
        resetForm();
        navigation.navigate('EventDetails', {
          eventId: result.id || eventToEdit?.id || '',
        });
        showSuccess(
          isEditMode
            ? 'Evento atualizado com sucesso!'
            : 'Evento criado com sucesso!'
        );
      }
    } catch {
      showError(
        isEditMode ? 'Erro ao atualizar o evento.' : 'Erro ao criar o evento.'
      );
    }
  }, [
    formData,
    validateStep,
    createEvent,
    navigation,
    resetForm,
    isEditMode,
    eventToEdit,
    showError,
    showSuccess,
  ]);

  const handleCancel = useCallback(() => {
    const hasChanges = !!(
      formData.title ||
      formData.sportId ||
      formData.startDate
    );

    if (hasChanges) {
      showConfirm({
        title: 'Cancelar criação?',
        message: 'As informações preenchidas serão perdidas.',
        confirmText: 'Descartar',
        cancelText: 'Continuar editando',
        variant: 'warning',
        onConfirm: () => {
          resetForm();
          navigation.goBack();
        },
        onCancel: () => {},
      });
    } else {
      navigation.goBack();
    }
  }, [formData, navigation, resetForm, showConfirm]);

  const progress = ((currentStep + 1) / TOTAL_STEPS) * 100;

  return {
    formData,
    errors,
    currentStep,
    isCreating,
    progress,
    updateFormData,
    handleNext,
    handlePrevious,
    handleSubmit,
    handleCancel,
    isFirstStep: currentStep === FormStep.BASIC_INFO,
    isLastStep: currentStep === FormStep.REVIEW,
  };
};
