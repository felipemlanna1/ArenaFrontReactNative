import React from 'react';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Entypo } from '@expo/vector-icons';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { OptimizedImage } from '@/components/ui/optimizedImage';
import { ArenaColors } from '@/constants';
import { SkillLevel } from '@/types/sport';
import { getSportIcon } from '@/config/sportIcons';
import { styles } from './stylesSportCard';

const getLevelIcon = (level?: SkillLevel): keyof typeof Entypo.glyphMap => {
  const icons = {
    BEGINNER: 'progress-empty' as const,
    INTERMEDIATE: 'progress-one' as const,
    ADVANCED: 'progress-two' as const,
    PROFESSIONAL: 'progress-full' as const,
  };
  return icons[level as keyof typeof icons] || 'progress-empty';
};

interface SportCardProps {
  sportId: string;
  sportName: string;
  sportIcon: string;
  isSelected: boolean;
  onPress: () => void;
  disabled?: boolean;
  level?: SkillLevel;
  isPrimary?: boolean;
}

export const SportCard: React.FC<SportCardProps> = React.memo(
  ({
    sportName,
    sportIcon,
    isSelected,
    onPress,
    disabled = false,
    level,
    isPrimary = false,
  }) => {
    const iconSource = getSportIcon(sportIcon);

    return (
      <Card
        style={[
          styles.container,
          ...(isSelected ? [styles.selectedContainer] : []),
        ]}
        onPress={onPress}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={`${sportName}${isSelected ? ', selecionado' : ''}`}
        accessibilityState={{ selected: isSelected }}
      >
        <View
          style={[
            styles.iconContainer,
            ...(!isSelected ? [styles.iconUnselected] : []),
          ]}
        >
          <OptimizedImage
            source={iconSource}
            style={styles.icon}
            contentFit="contain"
            priority="high"
            showLoading={false}
          />
          {isPrimary && isSelected && (
            <View style={styles.primaryBadge}>
              <Ionicons
                name="star"
                size={12}
                color={ArenaColors.brand.primary}
              />
            </View>
          )}
        </View>
        <View style={styles.labelContainer}>
          <Text
            variant="bodyPrimary"
            style={[
              styles.label,
              ...(isSelected
                ? [styles.labelSelected]
                : [styles.labelUnselected]),
            ]}
            numberOfLines={2}
          >
            {sportName}
          </Text>
          {level && isSelected && (
            <Entypo
              name={getLevelIcon(level)}
              size={16}
              color={ArenaColors.brand.primary}
            />
          )}
        </View>
      </Card>
    );
  }
);
