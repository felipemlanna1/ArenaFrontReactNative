import React, { useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Text } from '@/components/ui/text';
import { ArenaColors } from '@/constants';
import { styles } from './stylesSkillLevelRating';
import {
  SkillLevel,
  SkillLevelOption,
  SkillLevelRatingProps,
} from './typesSkillLevelRating';

const SKILL_LEVELS: SkillLevelOption[] = [
  {
    value: 1,
    label: 'Iniciante',
    shortLabel: 'I',
    color: ArenaColors.semantic.success,
  },
  {
    value: 2,
    label: 'Intermediário',
    shortLabel: 'M',
    color: ArenaColors.semantic.warning,
  },
  {
    value: 3,
    label: 'Avançado',
    shortLabel: 'A',
    color: ArenaColors.brand.primary,
  },
  {
    value: 4,
    label: 'Expert',
    shortLabel: 'E',
    color: ArenaColors.brand.primary,
  },
];

export const SkillLevelRating: React.FC<SkillLevelRatingProps> = ({
  value,
  onChange,
  disabled = false,
  testID,
}) => {
  const handlePress = useCallback(
    (level: SkillLevel) => {
      if (disabled) return;
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onChange(level);
    },
    [disabled, onChange]
  );

  const renderCard = useCallback(
    (option: SkillLevelOption) => {
      const isSelected = value === option.value;

      const cardStyle = [
        styles.card,
        isSelected && styles.cardSelected,
        isSelected && { borderColor: option.color },
        isSelected && {
          backgroundColor: `${option.color}33`,
        },
        disabled && styles.cardDisabled,
      ];

      return (
        <TouchableOpacity
          key={option.value}
          style={cardStyle}
          onPress={() => handlePress(option.value)}
          disabled={disabled}
          accessibilityRole="radio"
          accessibilityState={{ checked: isSelected }}
          accessibilityLabel={`${option.label} - Nível ${option.value}`}
          testID={`${testID}-level-${option.value}`}
        >
          <View style={styles.labelContainer}>
            <Text variant="labelPrimary">{option.shortLabel}</Text>
            <Text variant="captionSecondary">{option.label}</Text>
          </View>
        </TouchableOpacity>
      );
    },
    [value, disabled, handlePress, testID]
  );

  return (
    <View
      style={styles.container}
      accessibilityRole="radiogroup"
      testID={testID}
    >
      {SKILL_LEVELS.map(renderCard)}
    </View>
  );
};
