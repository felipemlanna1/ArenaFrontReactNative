import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Entypo } from '@expo/vector-icons';
import { Text } from '@/components/ui/text';
import { OptimizedImage } from '@/components/ui/optimizedImage';
import { getSportIcon } from '@/config/sportIcons';
import { ArenaColors } from '@/constants';
import { SkillLevel } from '@/types/sport';
import { SportCardProps } from './typesSportCard';
import { styles } from './stylesSportCard';

const getLevelIcon = (level?: SkillLevel): keyof typeof Entypo.glyphMap => {
  const icons = {
    [SkillLevel.BEGINNER]: 'progress-empty' as const,
    [SkillLevel.INTERMEDIATE]: 'progress-one' as const,
    [SkillLevel.ADVANCED]: 'progress-two' as const,
    [SkillLevel.PROFESSIONAL]: 'progress-full' as const,
  };
  return level ? icons[level] : 'progress-empty';
};

export const SportCard: React.FC<SportCardProps> = React.memo(
  ({
    sportName,
    sportIcon,
    skillLevel,
    isPrimary = false,
    isSelected = true,
    onPress,
    disabled = false,
    testID = 'sport-card',
  }) => {
    const iconSource = getSportIcon(sportIcon);

    const content = (
      <>
        <View style={styles.cardHeader}>
          <OptimizedImage
            source={iconSource}
            style={[
              styles.sportIconImage,
              !isSelected && styles.sportIconUnselected,
            ]}
            contentFit="contain"
            priority="normal"
            showLoading={false}
          />
          {isPrimary && (
            <View style={styles.primaryBadge}>
              <Ionicons
                name="star"
                size={12}
                color={ArenaColors.brand.primary}
              />
            </View>
          )}
        </View>
        <View style={styles.cardContent}>
          <Text
            variant="labelPrimary"
            style={[
              styles.sportName,
              ...(!isSelected ? [styles.sportNameUnselected] : []),
            ]}
          >
            {sportName}
          </Text>
          {skillLevel && isSelected && (
            <Entypo
              name={getLevelIcon(skillLevel)}
              size={20}
              color={ArenaColors.brand.primary}
            />
          )}
        </View>
      </>
    );

    if (onPress && !disabled) {
      return (
        <TouchableOpacity
          style={[
            styles.card,
            isSelected && styles.cardSelected,
            isPrimary && styles.cardPrimary,
            { width: '100%', height: '100%' },
          ]}
          onPress={onPress}
          disabled={disabled}
          activeOpacity={0.7}
          testID={testID}
        >
          {content}
        </TouchableOpacity>
      );
    }

    return (
      <View
        style={[styles.card, isPrimary && styles.cardPrimary]}
        testID={testID}
      >
        {content}
      </View>
    );
  }
);

SportCard.displayName = 'SportCard';
