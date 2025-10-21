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
