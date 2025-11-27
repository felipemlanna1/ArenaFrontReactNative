import React, { useEffect, useRef } from 'react';
import { Modal, View, StyleSheet, Animated, Dimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';
import { Achievement } from './typesAchievements';
import { haptic } from '@/utils/haptics';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export interface AchievementUnlockModalProps {
  visible: boolean;
  achievement: Achievement | null;
  onDismiss: () => void;
  testID?: string;
}

const TIER_COLORS = {
  bronze: ArenaColors.achievement.bronze,
  silver: ArenaColors.achievement.silver,
  gold: ArenaColors.achievement.gold,
  platinum: ArenaColors.achievement.platinum,
};

export const AchievementUnlockModal: React.FC<AchievementUnlockModalProps> = ({
  visible,
  achievement,
  onDismiss,
  testID = 'achievement-unlock-modal',
}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible && achievement) {
      haptic.celebration();

      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 5,
          tension: 40,
          useNativeDriver: true,
        }),

        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

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
      scaleAnim.setValue(0);
      fadeAnim.setValue(0);
      glowAnim.setValue(0);
    }
  }, [visible, achievement, scaleAnim, fadeAnim, glowAnim]);

  const handleDismiss = (): void => {
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
      <View style={styles.backdrop}>
        <Animated.View
          style={[
            styles.container,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Animated.View
            style={[
              styles.glow,
              {
                backgroundColor: tierColor,
                opacity: glowOpacity,
              },
            ]}
          />

          <View style={styles.content}>
            <Text variant="captionSecondary" style={styles.unlockText}>
              ACHIEVEMENT UNLOCKED
            </Text>

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

            <Text variant="headingPrimary" style={styles.title}>
              {achievement.title}
            </Text>

            <Text variant="bodySecondary" style={styles.description}>
              {achievement.description}
            </Text>

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

            <View
              style={[styles.tierBadge, { backgroundColor: tierColor + '40' }]}
            >
              <Text
                variant="captionSecondary"
                style={[styles.tierText, { color: tierColor }]}
              >
                {achievement.tier.toUpperCase()}
              </Text>
            </View>

            <View style={styles.buttonContainer}>
              <Button
                variant="primary"
                size="lg"
                onPress={handleDismiss}
                fullWidth
              >
                Continuar
              </Button>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const MODAL_MAX_WIDTH = 400;
const ICON_SIZE = 120;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: ArenaColors.backdrop.dark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: SCREEN_WIDTH - ArenaSpacing['2xl'] * 2,
    maxWidth: MODAL_MAX_WIDTH,
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
    borderRadius: ArenaBorders.radius.circle,
    opacity: 0.3,
  },
  content: {
    padding: ArenaSpacing['2xl'],
    alignItems: 'center',
    gap: ArenaSpacing.md,
  },
  unlockText: {
    color: ArenaColors.brand.primary,
    textAlign: 'center',
  },
  iconContainer: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ArenaBorders.radius.circle,
    borderWidth: ArenaBorders.width.thick,
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
    borderRadius: ArenaBorders.radius.pill,
    marginTop: ArenaSpacing.sm,
  },
  tierText: {
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    marginTop: ArenaSpacing.lg,
  },
});
