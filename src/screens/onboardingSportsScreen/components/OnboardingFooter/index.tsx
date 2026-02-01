import React from 'react';
import { View } from 'react-native';
import { Button } from '@/components/ui/button';
import { styles } from './stylesOnboardingFooter';

interface OnboardingFooterProps {
  canFinish: boolean;
  isLoading: boolean;
  onSkip: () => void;
  onFinish: () => void;
}

export const OnboardingFooter: React.FC<OnboardingFooterProps> = ({
  canFinish,
  isLoading,
  onSkip,
  onFinish,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonWrapper}>
        <Button
          variant="outline-light"
          onPress={onSkip}
          disabled={isLoading}
          size="lg"
          fullWidth
        >
          Pular
        </Button>
      </View>
      <View style={styles.buttonWrapper}>
        <Button
          variant="primary"
          onPress={onFinish}
          loading={isLoading}
          disabled={!canFinish}
          size="lg"
          fullWidth
        >
          Continuar
        </Button>
      </View>
    </View>
  );
};
