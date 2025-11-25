/**
 * SkeletonUserCard Component
 *
 * Loading skeleton matching UserCard layout.
 * Usa Animated API (built-in) para compatibilidade Web/Native.
 *
 * @example
 * <SkeletonUserCard />
 * // Ou múltiplos:
 * {isLoading && (
 *   <>
 *     <SkeletonUserCard />
 *     <SkeletonUserCard />
 *     <SkeletonUserCard />
 *   </>
 * )}
 */

import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export interface SkeletonUserCardProps {
  showActions?: boolean;
  testID?: string;
}

export const SkeletonUserCard: React.FC<SkeletonUserCardProps> = ({
  showActions = false,
  testID = 'skeleton-user-card',
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
      <View style={styles.contentRow}>
        {/* Avatar circular */}
        <Animated.View style={[styles.avatarSkeleton, shimmerStyle]} />

        {/* Info container (nome, username, localização, esportes) */}
        <View style={styles.infoContainer}>
          {/* Nome */}
          <Animated.View style={[styles.nameSkeleton, shimmerStyle]} />

          {/* Username */}
          <Animated.View style={[styles.usernameSkeleton, shimmerStyle]} />

          {/* Localização */}
          <View style={styles.locationRow}>
            <Animated.View style={[styles.iconSkeleton, shimmerStyle]} />
            <Animated.View style={[styles.locationTextSkeleton, shimmerStyle]} />
          </View>

          {/* Badges de esportes */}
          <View style={styles.sportsRow}>
            <Animated.View style={[styles.sportBadgeSkeleton, shimmerStyle]} />
            <Animated.View style={[styles.sportBadgeSkeleton, shimmerStyle]} />
            <Animated.View style={[styles.sportBadgeSmall, shimmerStyle]} />
          </View>
        </View>
      </View>

      {/* Botões de ação (opcional) */}
      {showActions && (
        <View style={styles.actionsContainer}>
          <Animated.View style={[styles.buttonSkeleton, shimmerStyle]} />
          <Animated.View style={[styles.buttonSkeleton, shimmerStyle]} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: ArenaColors.neutral.darkest,
    borderRadius: ArenaBorders.radius.lg,
    padding: ArenaSpacing.lg,
    marginBottom: ArenaSpacing.md,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: ArenaSpacing.md,
  },
  avatarSkeleton: {
    width: 56,
    height: 56,
    borderRadius: ArenaBorders.radius.circle,
    backgroundColor: ArenaColors.neutral.dark,
  },
  infoContainer: {
    flex: 1,
    gap: ArenaSpacing.xs,
  },
  nameSkeleton: {
    width: '60%',
    height: 18,
    borderRadius: ArenaBorders.radius.sm,
    backgroundColor: ArenaColors.neutral.dark,
  },
  usernameSkeleton: {
    width: '40%',
    height: 14,
    borderRadius: ArenaBorders.radius.sm,
    backgroundColor: ArenaColors.neutral.dark,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.xs,
    marginTop: ArenaSpacing.xs,
  },
  iconSkeleton: {
    width: 16,
    height: 16,
    borderRadius: ArenaBorders.radius.circle,
    backgroundColor: ArenaColors.neutral.dark,
  },
  locationTextSkeleton: {
    width: 100,
    height: 14,
    borderRadius: ArenaBorders.radius.sm,
    backgroundColor: ArenaColors.neutral.dark,
  },
  sportsRow: {
    flexDirection: 'row',
    gap: ArenaSpacing.xs,
    marginTop: ArenaSpacing.xs,
  },
  sportBadgeSkeleton: {
    width: 60,
    height: 24,
    borderRadius: ArenaBorders.radius.pill,
    backgroundColor: ArenaColors.neutral.dark,
  },
  sportBadgeSmall: {
    width: 40,
    height: 24,
    borderRadius: ArenaBorders.radius.pill,
    backgroundColor: ArenaColors.neutral.dark,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: ArenaSpacing.sm,
    marginTop: ArenaSpacing.md,
  },
  buttonSkeleton: {
    flex: 1,
    height: 36,
    borderRadius: ArenaBorders.radius.md,
    backgroundColor: ArenaColors.neutral.dark,
  },
});
