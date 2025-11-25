import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { OptimizedImage } from '@/components/ui/optimizedImage';
import { Text } from '@/components/ui/text';
import { ArenaColors } from '@/constants';
import { getSportIcon } from '@/config/sportIcons';
import { EventHeroSectionProps } from './typesEventHeroSection';
import { styles } from './stylesEventHeroSection';

export const EventHeroSection: React.FC<EventHeroSectionProps> = ({
  event,
  isOwner,
  onBackPress,
  onSharePress,
  onEditPress,
  userStatus,
}) => {
  const iconSource = event.sport?.icon ? getSportIcon(event.sport.icon) : null;

  const getStatusBadge = () => {
    if (userStatus === 'confirmed') {
      return {
        icon: 'checkmark-circle' as const,
        text: 'Confirmado',
        color: ArenaColors.semantic.success,
      };
    }
    if (event.currentParticipants >= event.maxParticipants) {
      return {
        icon: 'close-circle' as const,
        text: 'Lotado',
        color: ArenaColors.semantic.error,
      };
    }
    return null;
  };

  const statusBadge = getStatusBadge();

  return (
    <View style={styles.container}>
      {event.coverImage ? (
        <OptimizedImage
          source={{ uri: event.coverImage }}
          style={styles.coverImage}
          contentFit="cover"
          priority="high"
        />
      ) : (
        <View
          style={[
            styles.placeholderContainer,
            {
              backgroundColor: event.sport?.color || ArenaColors.brand.primary,
            },
          ]}
        >
          {iconSource ? (
            <OptimizedImage
              source={iconSource}
              style={styles.placeholderIcon}
              contentFit="contain"
              priority="high"
              showLoading={false}
            />
          ) : (
            <Text variant="displayPrimary" style={styles.placeholderText}>
              ⚽
            </Text>
          )}
        </View>
      )}

      <LinearGradient
        colors={['transparent', 'rgba(27, 29, 41, 0.9)']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.gradientOverlay}
      />

      <View style={styles.headerOverlay}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={onBackPress}
          testID="back-button"
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={ArenaColors.neutral.light}
          />
        </TouchableOpacity>

        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={onSharePress}
            testID="share-button"
          >
            <Ionicons
              name="share-outline"
              size={22}
              color={ArenaColors.neutral.light}
            />
          </TouchableOpacity>

          {isOwner && onEditPress && (
            <TouchableOpacity
              style={styles.headerButton}
              onPress={onEditPress}
              testID="edit-button"
            >
              <Ionicons
                name="create-outline"
                size={22}
                color={ArenaColors.neutral.light}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {statusBadge && (
        <View
          style={[styles.statusBadge, { backgroundColor: statusBadge.color }]}
        >
          <Ionicons
            name={statusBadge.icon}
            size={16}
            color={ArenaColors.neutral.light}
          />
          <Text variant="captionSecondary" style={styles.statusBadgeText}>
            {statusBadge.text}
          </Text>
        </View>
      )}

      <View style={styles.categoryChipsContainer}>
        {event.sport && (
          <View style={styles.categoryChip}>
            <Text variant="captionSecondary" style={styles.categoryChipText}>
              {event.sport.name}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.titleContainer}>
        <Text
          variant="titlePrimary"
          style={styles.title}
          numberOfLines={2}
          testID="event-detail-title"
        >
          {event.title}
        </Text>
      </View>
    </View>
  );
};
