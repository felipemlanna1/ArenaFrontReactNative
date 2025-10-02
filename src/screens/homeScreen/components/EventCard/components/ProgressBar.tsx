import React from 'react';
import { View, Text } from 'react-native';
import { ArenaColors } from '@/constants';
import { styles } from './stylesProgressBar';

interface ProgressBarProps {
  current: number;
  max: number;
  testID?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  max,
  testID = 'progress-bar',
}) => {
  const percentage = Math.min((current / max) * 100, 100);
  const available = max - current;

  const getProgressColor = () => {
    if (percentage >= 75) return ArenaColors.semantic.error;
    if (percentage >= 50) return ArenaColors.semantic.warning;
    return ArenaColors.semantic.success;
  };

  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.barContainer}>
        <View
          style={[
            styles.barFill,
            {
              width: `${percentage}%`,
              backgroundColor: getProgressColor(),
            },
          ]}
        />
      </View>
      <Text style={styles.text}>
        {current}/{max}
      </Text>
    </View>
  );
};
