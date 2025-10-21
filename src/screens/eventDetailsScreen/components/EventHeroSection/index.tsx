import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { OptimizedImage } from '@/components/ui/optimizedImage';
import { Text } from '@/components/ui/text';
import { PrivacyBadge } from '@/components/ui/privacyBadge';
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
}) => {
  const iconSource = event.sport?.icon ? getSportIcon(event.sport.icon) : null;

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
        colors={['rgba(27, 29, 41, 0.7)', 'rgba(27, 29, 41, 0)']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.3 }}
        style={styles.overlay}
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

      <View style={styles.badgesContainer}>
        {event.sport && (
          <View style={styles.sportBadgeContainer}>
            <Text variant="labelPrimary" style={styles.sportBadgeText}>
              {event.sport.icon} {event.sport.name}
            </Text>
          </View>
        )}

        {event.privacy && (
          <View style={styles.privacyBadgeContainer}>
            <PrivacyBadge
              privacy={event.privacy}
              groupName={event.group?.name}
              size="sm"
            />
          </View>
        )}
      </View>
    </View>
  );
};
