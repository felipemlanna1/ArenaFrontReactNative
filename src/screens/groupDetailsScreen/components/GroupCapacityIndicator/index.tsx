import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { styles } from './stylesGroupCapacityIndicator';

interface GroupCapacityIndicatorProps {
  currentMembers: number;
  maxMembers?: number;
  testID?: string;
}

export const GroupCapacityIndicator: React.FC<GroupCapacityIndicatorProps> = ({
  currentMembers,
  maxMembers,
  testID = 'group-capacity-indicator',
}) => {
  if (!maxMembers) {
    return (
      <View style={styles.container} testID={testID}>
        <Text variant="bodySecondary">
          {currentMembers} {currentMembers === 1 ? 'membro' : 'membros'}
        </Text>
      </View>
    );
  }

  const percentage = Math.min((currentMembers / maxMembers) * 100, 100);
  const isNearCapacity = percentage >= 80;
  const isFull = percentage >= 100;

  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.labelContainer}>
        <Text variant="bodySecondary">Capacidade</Text>
        <Text
          variant="bodyPrimary"
          style={isNearCapacity ? styles.warningText : undefined}
        >
          {currentMembers}/{maxMembers} membros
        </Text>
      </View>

      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBarFill,
            { width: `${percentage}%` },
            isFull
              ? styles.progressBarFull
              : isNearCapacity
                ? styles.progressBarWarning
                : styles.progressBarNormal,
          ]}
        />
      </View>

      {isFull && (
        <Text variant="captionSecondary" style={styles.warningText}>
          Grupo completo
        </Text>
      )}
      {!isFull && isNearCapacity && (
        <Text variant="captionSecondary" style={styles.warningText}>
          Quase cheio
        </Text>
      )}
    </View>
  );
};
