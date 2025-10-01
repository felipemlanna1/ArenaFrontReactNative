import React from 'react';
import { View } from 'react-native';
import { Button } from '@/components/ui/button';
import { OnboardingStep } from '../../typesOnboardingSportsScreen';
import { styles } from './stylesOnboardingFooter';

interface OnboardingFooterProps {
  currentStep: OnboardingStep;
  canFinish: boolean;
  canGoNext: boolean;
  isLoading: boolean;
  onBack: () => void;
  onNext: () => void;
  onSkip: () => void;
  onFinish: () => void;
}

export const OnboardingFooter: React.FC<OnboardingFooterProps> = ({
  currentStep,
  canFinish,
  canGoNext,
  isLoading,
  onBack,
  onNext,
  onSkip,
  onFinish,
}) => {
  if (currentStep === 'level') {
    return (
      <View style={styles.container}>
        <Button variant="secondary" onPress={onBack} disabled={isLoading}>
          Voltar
        </Button>
        <Button
          variant="primary"
          onPress={onNext}
          disabled={!canGoNext || isLoading}
        >
          Próximo
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button variant="ghost" onPress={onSkip} disabled={isLoading}>
        Pular
      </Button>
      {canFinish && (
        <Button variant="primary" onPress={onFinish} loading={isLoading}>
          Finalizar
        </Button>
      )}
    </View>
  );
};
