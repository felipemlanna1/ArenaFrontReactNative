import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ArenaColors } from '@/constants';
import { styles } from './stylesOnboardingHeader';

interface OnboardingHeaderProps {
  onBack: () => void;
  testID?: string;
}

export const OnboardingHeader: React.FC<OnboardingHeaderProps> = ({
  onBack,
  testID = 'onboarding-header',
}) => {
  return (
    <View style={styles.container} testID={testID}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={onBack}
        accessibilityRole="button"
        accessibilityLabel="Voltar"
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        testID={`${testID}-back-button`}
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color={ArenaColors.neutral.light}
        />
      </TouchableOpacity>
    </View>
  );
};
