import React from 'react';
import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { SportsLoading } from '@/components/ui/sportsLoading';
import { Stepper } from '@/components/ui/stepper';
import { BasicInfoStep } from './components/BasicInfoStep';
import { PrivacyStep } from './components/PrivacyStep';
import { LocationStep } from './components/LocationStep';
import { ReviewStep } from './components/ReviewStep';
import {
  CreateEventScreenProps,
  FormStep,
  TOTAL_STEPS,
} from './typesCreateEventScreen';
import { useCreateEventScreen } from './useCreateEventScreen';
import { styles } from './stylesCreateEventScreen';
import { ArenaColors } from '@/constants';

export const CreateEventScreen: React.FC<CreateEventScreenProps> = ({
  navigation,
  route,
}) => {
  const isEditMode = route?.params?.mode === 'edit';
  const eventToEdit = route?.params?.eventData;
  const preSelectedGroupId = route?.params?.preSelectedGroupId;
  const preSelectedSportId = route?.params?.preSelectedSportId;

  const {
    formData,
    errors,
    currentStep,
    isCreating,
    updateFormData,
    handleNext,
    handlePrevious,
    handleSubmit,
    handleCancel,
    isFirstStep,
    isLastStep,
  } = useCreateEventScreen({
    navigation,
    isEditMode,
    eventToEdit,
    preSelectedGroupId,
    preSelectedSportId,
  });

  const renderStepContent = () => {
    switch (currentStep) {
      case FormStep.BASIC_INFO:
        return (
          <BasicInfoStep
            formData={formData}
            errors={errors}
            onUpdate={updateFormData}
            isEditMode={isEditMode}
          />
        );
      case FormStep.PRIVACY:
        return (
          <PrivacyStep
            formData={formData}
            errors={errors}
            onUpdate={updateFormData}
          />
        );
      case FormStep.LOCATION:
        return (
          <LocationStep
            formData={formData}
            errors={errors}
            onUpdate={updateFormData}
          />
        );
      case FormStep.REVIEW:
        return (
          <ReviewStep
            formData={formData}
            errors={errors}
            onUpdate={updateFormData}
          />
        );
      default:
        return null;
    }
  };

  const getButtonText = () => {
    if (isLastStep) return isEditMode ? 'Salvar Alterações' : 'Criar Evento';
    return 'Próximo';
  };

  const handleButtonPress = () => {
    if (isLastStep) {
      handleSubmit();
    } else {
      handleNext();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 80}
      >
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <TouchableOpacity style={styles.backButton} onPress={handleCancel}>
              <Ionicons
                name="arrow-back"
                size={24}
                color={ArenaColors.neutral.light}
              />
            </TouchableOpacity>

            <Text variant="headingPrimary" style={styles.headerTitle}>
              {isEditMode ? 'Editar Evento' : 'Criar Evento'}
            </Text>

            <View style={styles.placeholder} />
          </View>
        </View>

        <View style={styles.progressContainer}>
          <Stepper
            currentStep={currentStep}
            totalSteps={TOTAL_STEPS}
            variant="dots"
          />
        </View>

        <View style={styles.content}>{renderStepContent()}</View>

        <View style={styles.footer}>
          <View style={styles.buttonRow}>
            {!isFirstStep && (
              <View style={styles.flex1}>
                <Button
                  variant="secondary"
                  onPress={handlePrevious}
                  disabled={isCreating}
                  fullWidth
                >
                  Voltar
                </Button>
              </View>
            )}

            <View style={styles.flex1}>
              <Button
                variant="primary"
                onPress={handleButtonPress}
                disabled={isCreating}
                fullWidth
              >
                {getButtonText()}
              </Button>
            </View>
          </View>

          {isCreating && (
            <View style={styles.loadingContainer}>
              <SportsLoading size="sm" />
              <Text variant="captionSecondary" style={styles.loadingText}>
                {isEditMode ? 'Salvando alterações...' : 'Criando evento...'}
              </Text>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
