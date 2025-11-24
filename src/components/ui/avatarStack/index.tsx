import React, { useCallback, useRef } from 'react';
import { View, Animated, Pressable, Easing } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { OptimizedImage } from '@/components/ui/optimizedImage';
import { Text } from '@/components/ui/text';
import { ArenaColors } from '@/constants';
import {
  AvatarStackProps,
  AvatarProps,
  OverflowBadgeProps,
} from './typesAvatarStack';
import { styles } from './stylesAvatarStack';

export type { AvatarStackProps, Participant } from './typesAvatarStack';

const getInitials = (name: string): string => {
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

const Avatar: React.FC<AvatarProps> = ({
  source,
  name,
  size,
  overlap,
  isOrganizer = false,
  onPress,
  testID,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = useCallback(() => {
    Animated.timing(scaleAnim, {
      toValue: 1.1,
      duration: 150,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [scaleAnim]);

  const handlePressOut = useCallback(() => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 150,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [scaleAnim]);

  return (
    <View
      style={{
        marginRight: overlap,
      }}
    >
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        testID={testID}
      >
        <Animated.View
          style={[
            styles.avatarWrapper,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {source ? (
            <OptimizedImage
              source={source}
              style={[styles.avatar, { width: size, height: size }]}
              contentFit="cover"
              priority="normal"
            />
          ) : (
            <View style={[styles.placeholder, { width: size, height: size }]}>
              <Text variant="captionSecondary" style={styles.initialsText}>
                {getInitials(name)}
              </Text>
            </View>
          )}
          {isOrganizer && (
            <View style={styles.organizerBadge}>
              <Ionicons
                name="shield-checkmark"
                size={10}
                color={ArenaColors.neutral.light}
              />
            </View>
          )}
        </Animated.View>
      </Pressable>
    </View>
  );
};

const OverflowBadge: React.FC<OverflowBadgeProps> = ({
  count,
  size,
  onPress,
  testID,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = useCallback(() => {
    Animated.timing(scaleAnim, {
      toValue: 1.1,
      duration: 150,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [scaleAnim]);

  const handlePressOut = useCallback(() => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 150,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [scaleAnim]);

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      testID={testID}
    >
      <Animated.View
        style={[
          styles.overflowBadge,
          {
            width: size,
            height: size,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Text variant="captionSecondary" style={styles.overflowText}>
          +{count}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

const SkeletonAvatar: React.FC<{ size: number; overlap: number }> = ({
  size,
  overlap,
}) => {
  const pulseAnim = useRef(new Animated.Value(0.3)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 750,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.3,
          duration: 750,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  return (
    <Animated.View
      style={[
        styles.skeletonCircle,
        {
          width: size,
          height: size,
          marginRight: overlap,
          opacity: pulseAnim,
        },
      ]}
    />
  );
};

export const AvatarStack: React.FC<AvatarStackProps> = ({
  participants,
  maxVisible = 5,
  avatarSize = 40,
  overlap = -8,
  onPress,
  showLabel = true,
  labelText = 'Quem vai:',
  isLoading = false,
  testID,
}) => {
  const visibleParticipants = participants.slice(0, maxVisible);
  const overflowCount = Math.max(0, participants.length - maxVisible);

  if (isLoading) {
    return (
      <View style={styles.container} testID={testID}>
        {showLabel && (
          <Text variant="labelSecondary" style={styles.label}>
            {labelText}
          </Text>
        )}
        <View style={styles.avatarsRow}>
          {Array.from({ length: maxVisible }).map((_, index) => (
            <SkeletonAvatar key={index} size={avatarSize} overlap={overlap} />
          ))}
        </View>
      </View>
    );
  }

  if (participants.length === 0) {
    return null;
  }

  return (
    <View style={styles.container} testID={testID}>
      {showLabel && (
        <Text variant="labelSecondary" style={styles.label}>
          {labelText}
        </Text>
      )}
      <View style={styles.avatarsRow}>
        {visibleParticipants.map((participant, index) => (
          <Avatar
            key={participant.id}
            source={
              participant.profileImage
                ? { uri: participant.profileImage }
                : null
            }
            name={participant.name}
            size={avatarSize}
            overlap={
              index < visibleParticipants.length - 1 || overflowCount > 0
                ? overlap
                : 0
            }
            isOrganizer={participant.isOrganizer}
            onPress={onPress}
            testID={`${testID}-avatar-${index}`}
          />
        ))}
        {overflowCount > 0 && (
          <OverflowBadge
            count={overflowCount}
            size={avatarSize}
            onPress={onPress}
            testID={`${testID}-overflow`}
          />
        )}
      </View>
    </View>
  );
};
