import React from 'react';
import { View, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { OptimizedImage } from '@/components/ui/optimizedImage';
import { ArenaColors } from '@/constants';
import { UserCardProps } from './typesUserCard';
import { useUserCard } from './useUserCard';
import { styles } from './stylesUserCard';

export const UserCard: React.FC<UserCardProps> = ({
  user,
  variant,
  onPress,
  onAccept,
  onReject,
  onRemove,
  onAddFriend,
  isLoading = false,
  testID,
}) => {
  const {
    displayName,
    displayLocation,
    displaySports,
    hasActions,
    handlePrimaryAction,
    handleSecondaryAction,
    primaryActionLabel,
    secondaryActionLabel,
    isPrimaryDestructive,
  } = useUserCard({
    user,
    variant,
    onAccept,
    onReject,
    onRemove,
    onAddFriend,
    isLoading,
  });

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && onPress && styles.cardPressed,
      ]}
      testID={testID}
      accessibilityRole={onPress ? 'button' : 'none'}
      accessibilityLabel={`${displayName}, ${displayLocation || 'sem localização'}`}
    >
      <View style={styles.contentContainer}>
        <View style={styles.avatar}>
          {user.profilePicture ? (
            <OptimizedImage
              source={{ uri: user.profilePicture }}
              style={styles.avatarImage}
              contentFit="cover"
              priority="normal"
            />
          ) : (
            <Ionicons
              name="person"
              size={28}
              color={ArenaColors.neutral.medium}
            />
          )}
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.nameRow}>
            <Text variant="bodyPrimary">{displayName}</Text>
            {user.username && (
              <Text variant="captionSecondary">@{user.username}</Text>
            )}
          </View>

          {displayLocation && (
            <View style={styles.locationRow}>
              <Ionicons
                name="location-outline"
                size={14}
                color={ArenaColors.neutral.medium}
                style={styles.locationIcon}
              />
              <Text variant="captionSecondary">{displayLocation}</Text>
            </View>
          )}

          {displaySports.length > 0 && (
            <View style={styles.sportsContainer}>
              {displaySports.map((sportName, index) => (
                <Badge key={index} variant="secondary" size="sm">
                  {sportName}
                </Badge>
              ))}
              {user.sports && user.sports.length > 3 && (
                <Badge variant="secondary" size="sm">
                  +{user.sports.length - 3}
                </Badge>
              )}
            </View>
          )}
        </View>
      </View>

      {hasActions && (
        <View style={styles.actionsContainer}>
          {handleSecondaryAction && secondaryActionLabel && (
            <Button
              variant="secondary"
              size="sm"
              onPress={handleSecondaryAction}
              disabled={isLoading}
              style={styles.actionButton}
              testID={testID ? `${testID}-secondary` : undefined}
            >
              {secondaryActionLabel}
            </Button>
          )}
          <Button
            variant={isPrimaryDestructive ? 'destructive' : 'primary'}
            size="sm"
            onPress={handlePrimaryAction}
            loading={isLoading}
            disabled={isLoading}
            style={styles.actionButton}
            testID={testID ? `${testID}-primary` : undefined}
          >
            {primaryActionLabel}
          </Button>
        </View>
      )}
    </Pressable>
  );
};

export type { UserCardProps, UserCardVariant } from './typesUserCard';
