import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useCreateEventForm } from './hooks/useCreateEventForm';
import { useCreateEventApi } from './hooks/useCreateEventApi';
import { FormStep, TOTAL_STEPS } from './typesCreateEventScreen';
import { CreateEventScreenNavigationProp } from './typesCreateEventScreen';

interface UseCreateEventScreenParams {
  navigation: CreateEventScreenNavigationProp;
}

export const useCreateEventScreen = ({
  navigation,
}: UseCreateEventScreenParams) => {
  const {
    formData,
    errors,
    currentStep,
    setCurrentStep,
    updateFormData,
    validateStep,
    resetForm,
  } = useCreateEventForm();

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
        'Por favor, corrija os erros antes de criar o evento.'
      );
      return;
    }

    const createdEvent = await createEvent(formData);

    if (createdEvent) {
      Alert.alert('Sucesso!', 'Evento criado com sucesso!', [
        {
          text: 'Ver Evento',
          onPress: () => {
            resetForm();
            navigation.navigate('MainTabs');
          },
        },
      ]);
    }
  }, [formData, validateStep, createEvent, navigation, resetForm]);

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
