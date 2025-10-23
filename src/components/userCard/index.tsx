import React from 'react';
import { View, Pressable, TouchableOpacity } from 'react-native';
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
  onCancel,
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
    onCancel,
    onRemove,
    onAddFriend,
    isLoading,
  });

  const getInitials = () => {
    const names = displayName.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return displayName.slice(0, 2).toUpperCase();
  };

  return (
    <View style={styles.card} testID={testID}>
      <TouchableOpacity
        onPress={onPress}
        disabled={!onPress}
        style={styles.touchableContent}
        activeOpacity={0.7}
        accessibilityRole={onPress ? 'button' : 'none'}
        accessibilityLabel={`${displayName}, ${displayLocation || 'sem localização'}`}
      >
        {user.profilePicture ? (
          <OptimizedImage
            source={{ uri: user.profilePicture }}
            style={styles.avatarImage}
            contentFit="cover"
            priority="normal"
          />
        ) : (
          <View style={styles.avatarFallback}>
            <Text variant="bodyPrimary" style={styles.initialsText}>
              {getInitials()}
            </Text>
          </View>
        )}

        <View style={styles.infoContainer}>
          <View style={styles.nameRow}>
            <Text variant="bodyPrimary" numberOfLines={1}>
              {displayName}
            </Text>
            {onPress && (
              <Ionicons
                name="chevron-forward"
                size={16}
                color={ArenaColors.neutral.medium}
                style={styles.chevronIcon}
              />
            )}
          </View>

          {user.username && (
            <Text variant="captionSecondary" style={styles.username}>
              @{user.username}
            </Text>
          )}

          {displayLocation && (
            <View style={styles.locationRow}>
              <Ionicons
                name="location-outline"
                size={14}
                color={ArenaColors.neutral.medium}
                style={styles.locationIcon}
              />
              <Text variant="captionSecondary" numberOfLines={1}>
                {displayLocation}
              </Text>
            </View>
          )}

          {displaySports.length > 0 && (
            <View style={styles.sportsContainer}>
              {displaySports.map((sportName, index) => (
                <Badge key={index} variant="outlined" size="sm">
                  {sportName}
                </Badge>
              ))}
              {user.sports && user.sports.length > 3 && (
                <Badge variant="outlined" size="sm">
                  {"+" + (user.sports.length - 3).toString()}
                </Badge>
              )}
            </View>
          )}
        </View>
      </TouchableOpacity>

      {hasActions && (
        <View style={styles.actionsContainer}>
          {handleSecondaryAction && secondaryActionLabel && (
            <Button
              variant="secondary"
              size="sm"
              onPress={handleSecondaryAction}
              disabled={isLoading}
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
            testID={testID ? `${testID}-primary` : undefined}
          >
            {primaryActionLabel}
          </Button>
        </View>
      )}
    </View>
  );
};

export type { UserCardProps, UserCardVariant } from './typesUserCard';
