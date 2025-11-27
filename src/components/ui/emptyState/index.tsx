import React from 'react';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { ArenaColors } from '@/constants';
import { styles } from './stylesEmptyState';

interface EmptyStateProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  message: string;
  actionLabel?: string;
  onActionPress?: () => void;
  secondaryActionLabel?: string;
  onSecondaryActionPress?: () => void;
  testID?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  message,
  actionLabel,
  onActionPress,
  secondaryActionLabel,
  onSecondaryActionPress,
  testID,
}) => {
  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={64} color={ArenaColors.neutral.medium} />
      </View>

      <Text variant="titlePrimary" style={styles.title}>
        {title}
      </Text>

      <Text variant="bodySecondary" style={styles.message}>
        {message}
      </Text>

      {actionLabel && onActionPress && (
        <View style={styles.actionContainer}>
          <Button
            variant="primary"
            size="md"
            onPress={onActionPress}
            testID={`${testID}-action-button`}
          >
            {actionLabel}
          </Button>
        </View>
      )}

      {secondaryActionLabel && onSecondaryActionPress && (
        <View style={styles.secondaryActionContainer}>
          <Button
            variant="secondary"
            size="md"
            onPress={onSecondaryActionPress}
            testID={`${testID}-secondary-action-button`}
          >
            {secondaryActionLabel}
          </Button>
        </View>
      )}
    </View>
  );
};
