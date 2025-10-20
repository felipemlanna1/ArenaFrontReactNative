import { useCallback, useMemo } from 'react';
import { useCreateEventForm } from './hooks/useCreateEventForm';
import { useCreateEventApi } from './hooks/useCreateEventApi';
import { FormStep, TOTAL_STEPS, CreateEventFormData } from './typesCreateEventScreen';
import { CreateEventScreenNavigationProp } from './typesCreateEventScreen';
import { eventsService } from '@/services/events/eventsService';
import { useAlert } from '@/contexts/AlertContext';

interface UseCreateEventScreenParams {
  navigation: CreateEventScreenNavigationProp;
  isEditMode?: boolean;
  eventToEdit?: any;
}

export const useCreateEventScreen = ({
  navigation,
  isEditMode = false,
  eventToEdit,
}: UseCreateEventScreenParams) => {
  const { showError, showSuccess, showConfirm } = useAlert();

  const initialData = useMemo(() => {
    if (!isEditMode || !eventToEdit) return undefined;

    const initialFormData: Partial<CreateEventFormData> = {
      title: eventToEdit.title,
      description: eventToEdit.description || '',
      sportId: eventToEdit.sport?.id || eventToEdit.sportId,
      startDate: new Date(eventToEdit.startDate),
      duration: eventToEdit.duration || 60,
      location: {
        zipCode: eventToEdit.location?.zipCode || '',
        street: eventToEdit.location?.street || '',
        number: eventToEdit.location?.number || '',
        complement: eventToEdit.location?.complement || '',
        district: eventToEdit.location?.district || '',
        city: eventToEdit.location?.city || '',
        state: eventToEdit.location?.state || '',
        country: 'Brasil',
        latitude: eventToEdit.location?.latitude || 0,
        longitude: eventToEdit.location?.longitude || 0,
      },
      privacy: eventToEdit.privacy || 'PUBLIC',
      maxParticipants: eventToEdit.maxParticipants,
      isFree: eventToEdit.isFree ?? true,
      price: eventToEdit.price || 0,
      coverImage: eventToEdit.coverImage,
    };
    return initialFormData;
  }, [isEditMode, eventToEdit]);

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
    const allStepsValid = [
      FormStep.BASIC_INFO,
      FormStep.LOCATION,
      FormStep.REVIEW,
    ].every(step => validateStep(step));

    if (!allStepsValid) {
      showError(`Por favor, corrija os erros antes de ${isEditMode ? 'salvar' : 'criar'} o evento.`);
      return;
    }

    try {
      let result;

      if (isEditMode && eventToEdit?.id) {
        // Converter formData para o formato esperado pela API
        const updateDto: any = {
          title: formData.title,
          description: formData.description,
          sportId: formData.sportId,
          startDate: formData.startDate?.toISOString(),
          endDate: formData.startDate ? new Date(formData.startDate.getTime() + formData.duration * 60000).toISOString() : undefined,
          location: formData.location,
          price: formData.price || 0,
          maxParticipants: formData.maxParticipants,
          privacy: formData.privacy || 'PUBLIC',
          isFree: formData.isFree ?? (!formData.price || formData.price === 0),
        };
        result = await eventsService.updateEvent(eventToEdit.id, updateDto);
      } else {
        result = await createEvent(formData);
      }

      if (result) {
        resetForm();
        showConfirm({
          title: 'Sucesso!',
          message: isEditMode ? 'Evento atualizado com sucesso!' : 'Evento criado com sucesso!',
          primaryButtonText: 'Ver Evento',
          secondaryButtonText: 'Voltar à Home',
          onConfirm: () => {
            navigation.navigate('EventDetails', { eventId: result.id || eventToEdit?.id });
          },
          onCancel: () => {
            navigation.navigate('MainTabs');
          },
        });
      }
    } catch (error) {
      showError(isEditMode ? 'Erro ao atualizar o evento.' : 'Erro ao criar o evento.');
    }
  }, [formData, validateStep, createEvent, navigation, resetForm, isEditMode, eventToEdit, showError, showConfirm]);

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
        primaryButtonText: 'Descartar',
        secondaryButtonText: 'Continuar editando',
        variant: 'warning',
        onConfirm: () => {
          resetForm();
          navigation.goBack();
        },
        onCancel: () => {
          // Não faz nada, continua editando
        },
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
