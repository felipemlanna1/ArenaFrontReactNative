import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { ArenaColors } from '@/constants';
import { ProgressBarProps } from './typesProgressBar';
import { useProgressBar } from './useProgressBar';
import { styles } from './stylesProgressBar';

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 4,
  animated = true,
  showPercentage = false,
  backgroundColor,
  progressColor,
  testID,
}) => {
  const { animatedWidth, percentageText } = useProgressBar({
    progress,
    animated,
  });

  return (
    <View style={styles.container} testID={testID}>
      <View
        style={[
          styles.track,
          { height },
          backgroundColor && { backgroundColor },
        ]}
      >
        <View
          style={[
            styles.fill,
            animatedWidth as never,
            progressColor && { backgroundColor: progressColor },
          ]}
        />
      </View>
      {showPercentage && (
        <View style={styles.percentageContainer}>
          <Text variant="captionSecondary" style={styles.percentageText}>
            {percentageText}
          </Text>
        </View>
      )}
    </View>
  );
};
