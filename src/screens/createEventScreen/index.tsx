import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppLayout } from '@/components/AppLayout';
import { ArenaKeyboardAwareScrollView } from '@/components/ui/arenaKeyboardAwareScrollView';
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
import { ArenaSpacing } from '@/constants';

export const CreateEventScreen: React.FC<CreateEventScreenProps> = ({
  navigation,
  route,
}) => {
  const insets = useSafeAreaInsets();
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
    <AppLayout
      showHeader={true}
      headerVariant="secondary"
      headerTitle={isEditMode ? 'Editar Evento' : 'Criar Evento'}
      headerShowLogo={false}
      headerShowBackButton={true}
      headerOnBackPress={handleCancel}
      headerChildren={
        <View style={styles.progressContainer}>
          <Stepper
            currentStep={currentStep}
            totalSteps={TOTAL_STEPS}
            variant="dots"
            showProgress={true}
            steps={[
              { label: 'Informações' },
              { label: 'Privacidade' },
              { label: 'Localização' },
              { label: 'Revisão' },
            ]}
          />
        </View>
      }
    >
      <ArenaKeyboardAwareScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bottomOffset={100}
      >
        {renderStepContent()}
      </ArenaKeyboardAwareScrollView>

      <View
        style={[
          styles.footer,
          { paddingBottom: ArenaSpacing.md + (insets.bottom || 0) },
        ]}
      >
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
    </AppLayout>
  );
};
