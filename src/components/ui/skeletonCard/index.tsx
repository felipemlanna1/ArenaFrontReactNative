import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { styles } from './stylesSkeletonCard';

export interface SkeletonCardProps {
  testID?: string;
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({
  testID = 'skeleton-event-card',
}) => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => animation.stop();
  }, [shimmerAnim]);

  const shimmerStyle = {
    opacity: shimmerAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 0.7],
    }),
  };

  return (
    <View style={styles.container} testID={testID}>
      <Animated.View style={[styles.imageSkeleton, shimmerStyle]} />

      <View style={styles.divider} />

      <View style={styles.contentContainer}>
        <Animated.View style={[styles.titleSkeleton, shimmerStyle]} />

        <View style={styles.infoRow}>
          <Animated.View style={[styles.iconSkeleton, shimmerStyle]} />
          <Animated.View style={[styles.locationSkeleton, shimmerStyle]} />
        </View>

        <View style={styles.dateTimeRow}>
          <Animated.View style={[styles.iconSkeleton, shimmerStyle]} />
          <Animated.View style={[styles.dateTimeSkeleton, shimmerStyle]} />
        </View>

        <View style={styles.participantsRow}>
          <View style={styles.avatarsContainer}>
            <Animated.View style={[styles.avatarSkeleton, shimmerStyle]} />
            <Animated.View
              style={[styles.avatarSkeleton, styles.avatarOffset, shimmerStyle]}
            />
            <Animated.View
              style={[styles.avatarSkeleton, styles.avatarOffset, shimmerStyle]}
            />
          </View>
          <Animated.View
            style={[styles.participantsTextSkeleton, shimmerStyle]}
          />
        </View>

        <View style={styles.progressContainer}>
          <Animated.View style={[styles.progressSkeleton, shimmerStyle]} />
        </View>

        <View style={styles.actionsRow}>
          <Animated.View style={[styles.buttonSkeleton, shimmerStyle]} />
          <Animated.View style={[styles.buttonSkeleton, shimmerStyle]} />
        </View>
      </View>
    </View>
  );
};
