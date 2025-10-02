import React from 'react';
import { View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Text } from '@/components/ui/text';
import { SkillLevel } from '@/types/sport';
import { ArenaColors } from '@/constants';
import { LEVEL_ICON_SIZE } from '@/screens/onboardingSportsScreen/constants';
import { CardPressable } from './CardPressable';
import { styles } from './stylesLevelCard';

interface LevelCardProps {
  level: SkillLevel;
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

const getLevelDescription = (level: SkillLevel): string => {
  const descriptions = {
    [SkillLevel.BEGINNER]: 'Estou começando',
    [SkillLevel.INTERMEDIATE]: 'Já tenho experiência',
    [SkillLevel.ADVANCED]: 'Pratico regularmente',
    [SkillLevel.EXPERT]: 'Sou profissional',
  };
  return descriptions[level];
};

const getLevelIcon = (level: SkillLevel): keyof typeof Entypo.glyphMap => {
  const icons = {
    [SkillLevel.BEGINNER]: 'progress-empty' as const,
    [SkillLevel.INTERMEDIATE]: 'progress-one' as const,
    [SkillLevel.ADVANCED]: 'progress-two' as const,
    [SkillLevel.EXPERT]: 'progress-full' as const,
  };
  return icons[level];
};

export const LevelCard: React.FC<LevelCardProps> = React.memo(
  ({ level, label, isSelected, onPress }) => {
    const description = getLevelDescription(level);
    const iconName = getLevelIcon(level);
    const iconColor = isSelected
      ? ArenaColors.brand.primary
      : ArenaColors.neutral.medium;

    return (
      <CardPressable
        style={[styles.container, isSelected && styles.selectedContainer]}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={`${label}, ${description}${isSelected ? ', selecionado' : ''}`}
        accessibilityState={{ selected: isSelected }}
      >
        <View style={styles.iconContainer}>
          <Entypo name={iconName} size={LEVEL_ICON_SIZE} color={iconColor} />
        </View>
        <View style={styles.textContainer}>
          <Text
            variant="titlePrimary"
            style={[
              styles.label,
              ...(isSelected ? [styles.labelSelected] : []),
            ]}
          >
            {label}
          </Text>
          <Text
            variant="bodySecondary"
            style={[
              styles.description,
              ...(isSelected ? [styles.descriptionSelected] : []),
            ]}
          >
            {description}
          </Text>
        </View>
      </CardPressable>
    );
  }
);
