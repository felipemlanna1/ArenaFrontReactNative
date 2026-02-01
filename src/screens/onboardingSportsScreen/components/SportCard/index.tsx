import React from 'react';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { OptimizedImage } from '@/components/ui/optimizedImage';
import { ArenaColors } from '@/constants';
import { SkillLevel } from '@/types/sport';
import { getSportIcon } from '@/config/sportIcons';
import { styles } from './stylesSportCard';

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
    isPrimary = false,
  }) => {
    const iconSource = getSportIcon(sportIcon);

    return (
      <Card
        style={[
          styles.container,
          isSelected ? styles.selectedContainer : styles.unselectedContainer,
        ]}
        onPress={onPress}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={`${sportName}${isSelected ? ', selecionado' : ''}`}
        accessibilityState={{ selected: isSelected }}
      >
        {isSelected && (
          <View style={styles.checkmarkBadge}>
            <Ionicons
              name="checkmark"
              size={14}
              color={ArenaColors.neutral.light}
            />
          </View>
        )}
        {isPrimary && isSelected && (
          <View style={styles.primaryBadge}>
            <Ionicons
              name="star"
              size={10}
              color={ArenaColors.semantic.warning}
            />
          </View>
        )}
        <View
          style={[styles.iconContainer, !isSelected && styles.iconUnselected]}
        >
          <OptimizedImage
            source={iconSource}
            style={styles.icon}
            contentFit="contain"
            priority="high"
            showLoading={false}
          />
        </View>
        <Text
          variant="labelPrimary"
          style={isSelected ? styles.labelSelected : styles.label}
          numberOfLines={1}
        >
          {sportName}
        </Text>
      </Card>
    );
  }
);
