import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { ArenaColors } from '@/constants';
import { haptic } from '@/utils/haptics';
import { StarRatingProps } from './typesStarRating';
import { styles } from './stylesStarRating';

const LABELS = {
  1: 'Muito Ruim',
  2: 'Ruim',
  3: 'Regular',
  4: 'Bom',
  5: 'Excelente',
};

export const StarRating: React.FC<StarRatingProps> = ({
  value,
  onValueChange,
  size = 'md',
  readonly = false,
  showLabel = false,
  testID,
}) => {
  const starSize = size === 'sm' ? 16 : size === 'md' ? 24 : 32;

  const handlePress = (star: number): void => {
    if (!readonly && onValueChange) {
      haptic.selection();
      onValueChange(star);
    }
  };

  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.starsRow}>
        {[1, 2, 3, 4, 5].map(star => (
          <TouchableOpacity
            key={star}
            onPress={() => handlePress(star)}
            disabled={readonly}
            activeOpacity={0.7}
            testID={`${testID}-star-${star}`}
          >
            <Ionicons
              name={value >= star ? 'star' : 'star-outline'}
              size={starSize}
              color={
                value >= star
                  ? ArenaColors.semantic.warning
                  : ArenaColors.neutral.medium
              }
            />
          </TouchableOpacity>
        ))}
      </View>
      {showLabel && value > 0 && (
        <Text variant="captionSecondary" style={styles.label}>
          {LABELS[value as keyof typeof LABELS]}
        </Text>
      )}
    </View>
  );
};
