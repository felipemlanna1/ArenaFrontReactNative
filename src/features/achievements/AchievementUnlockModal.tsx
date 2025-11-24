/**
 * Achievement Unlock Modal
 *
 * Celebratory modal displayed when user unlocks an achievement.
 * Features: Scale animation, glow effect, haptic celebration.
 *
 * @module features/achievements/AchievementUnlockModal
 */

import React, { useEffect, useRef } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Animated,
  Dimensions,
  Pressable,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import {
  ArenaColors,
  ArenaSpacing,
  ArenaBorders,
  ArenaTypography,
} from '@/constants';
import { Achievement } from './types';
import { haptic } from '@/utils/haptics';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export interface AchievementUnlockModalProps {
  /**
   * Whether modal is visible
   */
  visible: boolean;

  /**
   * Achievement that was unlocked
   */
  achievement: Achievement | null;

  /**
   * Callback when modal is dismissed
   */
  onDismiss: () => void;

  testID?: string;
}

const TIER_COLORS = {
  bronze: '#CD7F32',
  silver: '#C0C0C0',
  gold: '#FFD700',
  platinum: '#E5E4E2',
};

export const AchievementUnlockModal: React.FC<
  AchievementUnlockModalProps
> = ({ visible, achievement, onDismiss, testID = 'achievement-unlock-modal' }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible && achievement) {
      // Trigger celebration haptic
      haptic.celebration();

      // Entrance animations
      Animated.parallel([
        // Scale up with bounce
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 5,
          tension: 40,
          useNativeDriver: true,
        }),
        // Fade in
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Continuous glow animation
      const glowAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      );
      glowAnimation.start();

      return () => {
        glowAnimation.stop();
      };
    } else {
      // Reset animations
      scaleAnim.setValue(0);
      fadeAnim.setValue(0);
      glowAnim.setValue(0);
    }
  }, [visible, achievement, scaleAnim, fadeAnim, glowAnim]);

  const handleDismiss = (): void => {
    // Exit animations
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss();
    });
  };

  if (!achievement) return null;

  const tierColor = TIER_COLORS[achievement.tier];
  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.8],
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={handleDismiss}
      testID={testID}
    >
      <Pressable style={styles.backdrop} onPress={handleDismiss}>
        <Animated.View
          style={[
            styles.container,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {/* Glow effect */}
          <Animated.View
            style={[
              styles.glow,
              {
                backgroundColor: tierColor,
                opacity: glowOpacity,
              },
            ]}
          />

          {/* Content */}
          <View style={styles.content}>
            {/* Achievement unlocked header */}
            <Text variant="captionPrimary" style={styles.unlockText}>
              ACHIEVEMENT UNLOCKED
            </Text>

            {/* Icon */}
            <View
              style={[
                styles.iconContainer,
                { borderColor: tierColor, backgroundColor: tierColor + '20' },
              ]}
            >
              <Ionicons
                name={achievement.icon as keyof typeof Ionicons.glyphMap}
                size={64}
                color={tierColor}
              />
            </View>

            {/* Title */}
            <Text variant="headingPrimary" style={styles.title}>
              {achievement.title}
            </Text>

            {/* Description */}
            <Text variant="bodySecondary" style={styles.description}>
              {achievement.description}
            </Text>

            {/* Points */}
            <View style={styles.pointsContainer}>
              <Ionicons
                name="star"
                size={20}
                color={ArenaColors.semantic.warning}
              />
              <Text variant="titlePrimary" style={styles.points}>
                +{achievement.points} pontos
              </Text>
            </View>

            {/* Tier badge */}
            <View
              style={[styles.tierBadge, { backgroundColor: tierColor + '40' }]}
            >
              <Text
                variant="captionPrimary"
                style={[styles.tierText, { color: tierColor }]}
              >
                {achievement.tier.toUpperCase()}
              </Text>
            </View>

            {/* Dismiss button */}
            <Button
              variant="primary"
              size="lg"
              onPress={handleDismiss}
              style={styles.button}
            >
              Continuar
            </Button>
          </View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: SCREEN_WIDTH - ArenaSpacing['2xl'] * 2,
    maxWidth: 400,
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaBorders.radius.lg,
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
    top: -100,
    left: -100,
    right: -100,
    bottom: -100,
    borderRadius: 200,
    opacity: 0.3,
  },
  content: {
    padding: ArenaSpacing['2xl'],
    alignItems: 'center',
    gap: ArenaSpacing.md,
  },
  unlockText: {
    color: ArenaColors.brand.primary,
    letterSpacing: 2,
    textAlign: 'center',
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: ArenaSpacing.md,
  },
  title: {
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    opacity: 0.8,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.xs,
    marginTop: ArenaSpacing.sm,
  },
  points: {
    color: ArenaColors.semantic.warning,
  },
  tierBadge: {
    paddingHorizontal: ArenaSpacing.md,
    paddingVertical: ArenaSpacing.xs,
    borderRadius: ArenaBorders.radius.full,
    marginTop: ArenaSpacing.sm,
  },
  tierText: {
    fontSize: ArenaTypography.size.xs,
    fontWeight: ArenaTypography.weight.bold,
    letterSpacing: 1.5,
  },
  button: {
    width: '100%',
    marginTop: ArenaSpacing.lg,
  },
});
