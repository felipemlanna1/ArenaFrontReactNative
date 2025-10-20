import { useCallback, useEffect, useMemo } from 'react';
import { Alert } from 'react-native';
import { useCreateEventForm } from './hooks/useCreateEventForm';
import { useCreateEventApi } from './hooks/useCreateEventApi';
import { FormStep, TOTAL_STEPS, CreateEventFormData } from './typesCreateEventScreen';
import { CreateEventScreenNavigationProp } from './typesCreateEventScreen';
import { eventsService } from '@/services/events/eventsService';

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
      Alert.alert(
        'Erro',
        `Por favor, corrija os erros antes de ${isEditMode ? 'salvar' : 'criar'} o evento.`
      );
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
        Alert.alert(
          'Sucesso!',
          isEditMode ? 'Evento atualizado com sucesso!' : 'Evento criado com sucesso!',
          [
            {
              text: 'Ver Evento',
              onPress: () => {
                navigation.navigate('EventDetails', { eventId: result.id || eventToEdit?.id });
              },
            },
            {
              text: 'Voltar à Home',
              onPress: () => {
                navigation.navigate('MainTabs');
              },
              style: 'cancel',
            },
          ]
        );
      }
    } catch (error) {
      Alert.alert(
        'Erro',
        isEditMode ? 'Erro ao atualizar o evento.' : 'Erro ao criar o evento.'
      );
    }
  }, [formData, validateStep, createEvent, navigation, resetForm, isEditMode, eventToEdit]);

  const handleCancel = useCallback(() => {
    const hasChanges = !!(
      formData.title ||
      formData.sportId ||
      formData.startDate
    );

    if (hasChanges) {
      Alert.alert(
        'Cancelar criação?',
        'As informações preenchidas serão perdidas.',
        [
          { text: 'Continuar editando', style: 'cancel' },
          {
            text: 'Descartar',
            style: 'destructive',
            onPress: () => {
              resetForm();
              navigation.goBack();
            },
          },
        ]
      );
    } else {
      navigation.goBack();
    }
  }, [formData, navigation, resetForm]);

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
