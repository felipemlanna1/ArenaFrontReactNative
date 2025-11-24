import React, { useCallback, useState } from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { OptimizedImage } from '@/components/ui/optimizedImage';
import { SportsLoading } from '@/components/ui/sportsLoading';
import { getSportIcon } from '@/config/sportIcons';
import { SkillLevel } from '@/types/sport';
import { ArenaColors } from '@/constants';
import { MultiSelectSportsProps } from './typesMultiSelectSports';
import { styles } from './stylesMultiSelectSports';

const INITIAL_SPORTS_COUNT = 6;

const getLevelIcon = (level: SkillLevel): keyof typeof Entypo.glyphMap => {
  const icons = {
    [SkillLevel.BEGINNER]: 'progress-empty' as const,
    [SkillLevel.INTERMEDIATE]: 'progress-one' as const,
    [SkillLevel.ADVANCED]: 'progress-two' as const,
    [SkillLevel.PROFESSIONAL]: 'progress-full' as const,
  };
  return icons[level];
};

export const MultiSelectSports: React.FC<MultiSelectSportsProps> = ({
  sports,
  selectedSportIds,
  onToggleSport,
  sportLevels,
  primarySportId,
  onEditLevel,
  onTogglePrimary,
  isLoading = false,
  testID,
}) => {
  const [showAll, setShowAll] = useState(false);

  const handleCardPress = useCallback(
    (sport: (typeof sports)[0]) => {
      const isSelected = selectedSportIds.includes(sport.id);

      if (isSelected && onEditLevel && sportLevels) {
        const currentLevel = sportLevels[sport.id] || SkillLevel.INTERMEDIATE;
        onEditLevel(sport.id, sport.name, currentLevel);
      } else {
        onToggleSport(sport.id);
      }
    },
    [selectedSportIds, onEditLevel, onToggleSport, sportLevels]
  );

  const handleStarPress = useCallback(
    (e: unknown, sportId: string) => {
      if (e && typeof e === 'object' && 'stopPropagation' in e) {
        (e as { stopPropagation: () => void }).stopPropagation();
      }
      if (onTogglePrimary) {
        onTogglePrimary(sportId);
      }
    },
    [onTogglePrimary]
  );

  if (isLoading) {
    return (
      <View
        style={styles.loadingContainer}
        testID={testID ? `${testID}-loading` : undefined}
      >
        <SportsLoading size="md" animationSpeed="normal" />
      </View>
    );
  }

  const displayedSports = showAll
    ? sports
    : sports.slice(0, INITIAL_SPORTS_COUNT);
  const hasMore = sports.length > INITIAL_SPORTS_COUNT;

  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.sportsGrid}>
        {displayedSports.map(sport => {
          const isSelected = selectedSportIds.includes(sport.id);
          const skillLevel = sportLevels?.[sport.id];
          const isPrimary = primarySportId === sport.id;

          return (
            <TouchableOpacity
              key={sport.id}
              onPress={() => handleCardPress(sport)}
              activeOpacity={0.7}
              testID={
                testID ? `${testID}-card-${sport.id}` : `sport-card-${sport.id}`
              }
            >
              <Animated.View
                style={[
                  styles.sportCard,
                  isSelected
                    ? styles.sportCardSelected
                    : styles.sportCardUnselected,
                ]}
              >
                <OptimizedImage
                  source={getSportIcon(sport.icon)}
                  style={styles.sportCardIcon}
                  contentFit="contain"
                  priority="high"
                />
                <Text
                  variant={isSelected ? 'labelPrimary' : 'labelSecondary'}
                  style={styles.sportCardText}
                >
                  {sport.name}
                </Text>

                {isSelected && (
                  <View style={styles.checkmarkContainer}>
                    <Ionicons
                      name="checkmark"
                      size={12}
                      color={ArenaColors.neutral.light}
                    />
                  </View>
                )}

                {isSelected && skillLevel && (
                  <Entypo
                    name={getLevelIcon(skillLevel)}
                    size={16}
                    color={ArenaColors.brand.primary}
                    style={styles.levelIcon}
                  />
                )}
                {isSelected && onTogglePrimary && (
                  <TouchableOpacity
                    onPress={e => handleStarPress(e, sport.id)}
                    style={styles.starButton}
                    testID={`${testID}-star-${sport.id}`}
                  >
                    <Ionicons
                      name={isPrimary ? 'star' : 'star-outline'}
                      size={16}
                      color={
                        isPrimary
                          ? ArenaColors.brand.primary
                          : ArenaColors.neutral.medium
                      }
                    />
                  </TouchableOpacity>
                )}
              </Animated.View>
            </TouchableOpacity>
          );
        })}

        {hasMore && !showAll && (
          <TouchableOpacity
            onPress={() => setShowAll(true)}
            activeOpacity={0.7}
            testID={testID ? `${testID}-view-more` : 'sport-view-more'}
          >
            <View style={styles.viewMoreButton}>
              <Ionicons
                name="add-circle-outline"
                size={32}
                color={ArenaColors.neutral.medium}
              />
              <Text variant="labelSecondary" style={styles.viewMoreText}>
                Ver Mais ({sports.length - INITIAL_SPORTS_COUNT})
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export type { MultiSelectSportsProps } from './typesMultiSelectSports';
