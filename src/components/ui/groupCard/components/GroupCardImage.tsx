import React from 'react';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { OptimizedImage } from '@/components/ui/optimizedImage';
import { Text } from '@/components/ui/text';
import { ArenaColors } from '@/constants';
import { getSportIcon } from '@/config/sportIcons';
import { GroupCardImageProps } from '../typesGroupCard';
import { styles } from './stylesGroupCardImage';

export const GroupCardImage: React.FC<GroupCardImageProps> = ({
  coverImage,
  name,
  sport,
  isPublic,
  memberCount,
  maxMembers,
  testID = 'group-card-image',
}) => {
  const hasImage = !!coverImage;
  const currentMembers = memberCount || 0;
  const capacityPercentage =
    maxMembers && maxMembers > 0
      ? Math.min((currentMembers / maxMembers) * 100, 100)
      : 0;
  const isNearCapacity = capacityPercentage >= 80;
  const isFull = capacityPercentage >= 100;

  const sportIcon = sport?.icon ? getSportIcon(sport.icon) : null;
  const backgroundColor = sport?.color || ArenaColors.neutral.dark;

  return (
    <View style={styles.container} testID={testID}>
      {hasImage ? (
        <OptimizedImage
          source={{ uri: coverImage }}
          style={styles.image}
          contentFit="cover"
          priority="normal"
          testID={`${testID}-image`}
        />
      ) : sportIcon ? (
        <View style={[styles.placeholderContainer, { backgroundColor }]}>
          <OptimizedImage
            source={sportIcon}
            style={styles.sportIcon}
            contentFit="contain"
            priority="high"
            showLoading={false}
          />
        </View>
      ) : (
        <View
          style={[
            styles.placeholderContainer,
            { backgroundColor: ArenaColors.neutral.dark },
          ]}
        >
          <Ionicons
            name="people"
            size={48}
            color={ArenaColors.neutral.medium}
          />
        </View>
      )}

      {!isPublic && (
        <View style={styles.privacyBadge}>
          <Ionicons
            name="lock-closed"
            size={14}
            color={ArenaColors.neutral.light}
          />
          <Text variant="bodySecondary" style={styles.privacyText}>
            Privado
          </Text>
        </View>
      )}

      <View
        style={[
          styles.capacityBadge,
          isFull && styles.capacityBadgeFull,
          isNearCapacity && !isFull && styles.capacityBadgeWarning,
        ]}
      >
        <Ionicons name="people" size={14} color={ArenaColors.neutral.light} />
        <Text variant="bodySecondary" style={styles.capacityText}>
          {maxMembers ? `${currentMembers}/${maxMembers}` : currentMembers}
        </Text>
      </View>
    </View>
  );
};
