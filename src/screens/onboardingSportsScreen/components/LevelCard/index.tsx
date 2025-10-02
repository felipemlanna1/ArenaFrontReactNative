import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from '@/components/ui/text';
import { SkillLevel } from '@/types/sport';
import { ArenaColors } from '@/constants';
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

const getLevelIcon = (level: SkillLevel): keyof typeof MaterialCommunityIcons.glyphMap => {
  const icons = {
    [SkillLevel.BEGINNER]: 'progress-one' as const,
    [SkillLevel.INTERMEDIATE]: 'progress-two' as const,
    [SkillLevel.ADVANCED]: 'progress-full' as const,
    [SkillLevel.EXPERT]: 'progress-full' as const,
  };
  return icons[level];
};

export const LevelCard: React.FC<LevelCardProps> = ({
  level,
  label,
  isSelected,
  onPress,
}) => {
  const description = getLevelDescription(level);
  const iconName = getLevelIcon(level);
  const iconColor = isSelected ? ArenaColors.brand.primary : ArenaColors.neutral.medium;

  return (
    <TouchableOpacity
      style={[styles.container, isSelected && styles.selectedContainer]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons 
          name={iconName} 
          size={40} 
          color={iconColor}
        />
      </View>
      <View style={styles.textContainer}>
        <Text
          variant="titlePrimary"
          style={[styles.label, isSelected && styles.labelSelected]}
        >
          {label}
        </Text>
        <Text
          variant="bodySecondary"
          style={[styles.description, isSelected && styles.descriptionSelected]}
        >
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
