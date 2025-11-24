/**
 * AvatarStack Component
 *
 * Stack de avatares circulares com overlap para social proof.
 * Usado em: Event cards (participantes), Friend recommendations (mutual friends)
 *
 * @example
 * <AvatarStack
 *   users={participants.slice(0, 3)}
 *   max={3}
 *   size="md"
 * />
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { OptimizedImage } from '@/components/ui/optimizedImage';
import { Text } from '@/components/ui/text';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export interface AvatarStackUser {
  id: string;
  name: string;
  photo?: string | null;
}

export interface AvatarStackProps {
  users: AvatarStackUser[];
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
  testID?: string;
}

const SIZES = {
  sm: 32,
  md: 40,
  lg: 48,
};

const OVERLAP = -8; // Negative margin para overlap

export const AvatarStack: React.FC<AvatarStackProps> = ({
  users,
  max = 3,
  size = 'md',
  style,
  testID,
}) => {
  const avatarSize = SIZES[size];
  const displayUsers = users.slice(0, max);
  const remainingCount = users.length - max;

  const getInitials = (name: string): string => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <View style={[styles.container, style]} testID={testID}>
      {displayUsers.map((user, index) => (
        <View
          key={user.id}
          style={[
            styles.avatarContainer,
            {
              width: avatarSize,
              height: avatarSize,
              borderRadius: avatarSize / 2,
              marginLeft: index > 0 ? OVERLAP : 0,
              zIndex: displayUsers.length - index,
            },
          ]}
        >
          {user.photo ? (
            <OptimizedImage
              source={{ uri: user.photo }}
              style={[
                styles.avatar,
                {
                  width: avatarSize,
                  height: avatarSize,
                  borderRadius: avatarSize / 2,
                },
              ]}
              contentFit="cover"
              priority="normal"
            />
          ) : (
            <View
              style={[
                styles.placeholder,
                {
                  width: avatarSize,
                  height: avatarSize,
                  borderRadius: avatarSize / 2,
                },
              ]}
            >
              <Text
                variant="captionSecondary"
                style={{
                  fontSize: size === 'sm' ? 11 : size === 'md' ? 13 : 15,
                  color: ArenaColors.neutral.light,
                }}
              >
                {getInitials(user.name)}
              </Text>
            </View>
          )}
        </View>
      ))}

      {remainingCount > 0 && (
        <View
          style={[
            styles.avatarContainer,
            styles.moreContainer,
            {
              width: avatarSize,
              height: avatarSize,
              borderRadius: avatarSize / 2,
              marginLeft: OVERLAP,
              zIndex: 0,
            },
          ]}
        >
          <Text
            variant="captionSecondary"
            style={{
              fontSize: size === 'sm' ? 11 : size === 'md' ? 13 : 15,
              color: ArenaColors.neutral.light,
            }}
          >
            +{remainingCount}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    borderWidth: 2,
    borderColor: ArenaColors.neutral.darkest,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    backgroundColor: ArenaColors.neutral.dark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreContainer: {
    backgroundColor: ArenaColors.neutral.dark,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
