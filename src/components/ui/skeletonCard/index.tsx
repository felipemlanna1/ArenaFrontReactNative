/**
 * SkeletonCard Component
 *
 * Loading skeleton matching EventCard layout.
 * Usa Animated API (built-in) para compatibilidade Web/Native.
 *
 * @example
 * <SkeletonCard />
 * // Ou múltiplos:
 * {isLoading && (
 *   <>
 *     <SkeletonCard />
 *     <SkeletonCard />
 *     <SkeletonCard />
 *   </>
 * )}
 */

import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export interface SkeletonCardProps {
  testID?: string;
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({
  testID = 'skeleton-event-card',
}) => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Shimmer animation (pulse de opacity)
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
      outputRange: [0.3, 0.7], // Pulse entre 30% e 70% opacity
    }),
  };

  return (
    <View style={styles.container} testID={testID}>
      {/* Image Skeleton */}
      <Animated.View style={[styles.imageSkeleton, shimmerStyle]} />

      {/* Content */}
      <View style={styles.contentContainer}>
        {/* Title skeleton (80% width) */}
        <Animated.View style={[styles.titleSkeleton, shimmerStyle]} />

        {/* Location row skeleton */}
        <View style={styles.infoRow}>
          <Animated.View style={[styles.locationSkeleton, shimmerStyle]} />
        </View>

        {/* Date/Time row skeleton */}
        <View style={styles.dateTimeRow}>
          <Animated.View style={[styles.dateTimeSkeleton, shimmerStyle]} />
          <Animated.View style={[styles.slotsSkeleton, shimmerStyle]} />
        </View>

        {/* Progress bar skeleton */}
        <View style={styles.progressContainer}>
          <Animated.View style={[styles.progressSkeleton, shimmerStyle]} />
        </View>

        {/* Buttons row skeleton */}
        <View style={styles.actionsRow}>
          <Animated.View style={[styles.buttonSkeleton, shimmerStyle]} />
          <Animated.View style={[styles.buttonSkeleton, shimmerStyle]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: ArenaColors.neutral.darkest,
    borderRadius: ArenaBorders.radius.lg,
    marginBottom: ArenaSpacing.lg,
    overflow: 'hidden',
  },
  imageSkeleton: {
    width: '100%',
    height: 180,
    backgroundColor: ArenaColors.neutral.dark,
  },
  contentContainer: {
    padding: ArenaSpacing.lg,
  },
  titleSkeleton: {
    width: '80%',
    height: 20,
    borderRadius: ArenaBorders.radius.sm,
    backgroundColor: ArenaColors.neutral.dark,
    marginBottom: ArenaSpacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: ArenaSpacing.md,
  },
  locationSkeleton: {
    width: '40%',
    height: 16,
    borderRadius: ArenaBorders.radius.sm,
    backgroundColor: ArenaColors.neutral.dark,
  },
  dateTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: ArenaSpacing.md,
  },
  dateTimeSkeleton: {
    width: '50%',
    height: 16,
    borderRadius: ArenaBorders.radius.sm,
    backgroundColor: ArenaColors.neutral.dark,
  },
  slotsSkeleton: {
    width: '25%',
    height: 16,
    borderRadius: ArenaBorders.radius.sm,
    backgroundColor: ArenaColors.neutral.dark,
  },
  progressContainer: {
    marginBottom: ArenaSpacing.lg,
  },
  progressSkeleton: {
    width: '100%',
    height: 4,
    borderRadius: ArenaBorders.radius.sm,
    backgroundColor: ArenaColors.neutral.dark,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: ArenaSpacing.sm,
  },
  buttonSkeleton: {
    flex: 1,
    height: 44,
    borderRadius: ArenaBorders.radius.md,
    backgroundColor: ArenaColors.neutral.dark,
  },
});
