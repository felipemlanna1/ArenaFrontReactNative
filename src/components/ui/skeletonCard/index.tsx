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
  divider: {
    height: ArenaBorders.width.thin,
    backgroundColor: ArenaColors.neutral.dark,
    opacity: 0.1,
  },
  contentContainer: {
    padding: ArenaSpacing.lg,
  },
  titleSkeleton: {
    width: '80%',
    height: 20,
    borderRadius: ArenaBorders.radius.sm,
    backgroundColor: ArenaColors.neutral.dark,
    marginBottom: ArenaSpacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.xs,
    marginBottom: ArenaSpacing.sm,
  },
  iconSkeleton: {
    width: 20,
    height: 20,
    borderRadius: ArenaBorders.radius.circle,
    backgroundColor: ArenaColors.neutral.dark,
  },
  locationSkeleton: {
    flex: 1,
    height: 16,
    borderRadius: ArenaBorders.radius.sm,
    backgroundColor: ArenaColors.neutral.dark,
  },
  dateTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.xs,
    marginBottom: ArenaSpacing.sm,
  },
  dateTimeSkeleton: {
    flex: 1,
    height: 16,
    borderRadius: ArenaBorders.radius.sm,
    backgroundColor: ArenaColors.neutral.dark,
  },
  participantsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.sm,
    marginTop: ArenaSpacing.md,
    marginBottom: ArenaSpacing.xs,
  },
  avatarsContainer: {
    flexDirection: 'row',
  },
  avatarSkeleton: {
    width: 32,
    height: 32,
    borderRadius: ArenaBorders.radius.circle,
    backgroundColor: ArenaColors.neutral.dark,
    borderWidth: ArenaBorders.width.thin,
    borderColor: ArenaColors.neutral.darkest,
  },
  avatarOffset: {
    marginLeft: -ArenaSpacing.sm,
  },
  participantsTextSkeleton: {
    width: 100,
    height: 14,
    borderRadius: ArenaBorders.radius.sm,
    backgroundColor: ArenaColors.neutral.dark,
  },
  progressContainer: {
    marginTop: ArenaSpacing.md,
    marginBottom: ArenaSpacing.md,
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
