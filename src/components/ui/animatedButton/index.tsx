/**
 * AnimatedButton - Button Wrapper with Haptic Feedback & Spring Animation
 *
 * Wraps existing Button component with:
 * - Scale animation on press (spring physics)
 * - Haptic feedback (light impact)
 * - Uses Animated API for Web compatibility
 *
 * @module components/ui/animatedButton
 */

import React, { useRef } from 'react';
import { Animated, Pressable, ViewStyle } from 'react-native';
import { Button, ButtonProps } from '@/components/ui/button';
import { haptic } from '@/utils/haptics';

export interface AnimatedButtonProps extends ButtonProps {
  /**
   * Enable haptic feedback on press
   * @default true
   */
  enableHaptics?: boolean;

  /**
   * Scale factor when pressed (0.95 = 95% of original size)
   * @default 0.95
   */
  pressScale?: number;

  /**
   * Animation duration in ms
   * @default 100
   */
  animationDuration?: number;

  style?: ViewStyle;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  enableHaptics = true,
  pressScale = 0.95,
  animationDuration = 100,
  onPress,
  style,
  ...buttonProps
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = (): void => {
    // Trigger haptic feedback
    if (enableHaptics) {
      haptic.light();
    }

    // Scale down animation
    Animated.spring(scaleAnim, {
      toValue: pressScale,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (): void => {
    // Scale back up animation
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = (): void => {
    onPress?.();
  };

  return (
    <Animated.View
      style={[
        {
          transform: [{ scale: scaleAnim }],
        },
        style,
      ]}
    >
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
      >
        <Button {...buttonProps} onPress={undefined} />
      </Pressable>
    </Animated.View>
  );
};

/**
 * Preset: Success Button (green with success haptic)
 */
export const SuccessButton: React.FC<
  Omit<AnimatedButtonProps, 'variant' | 'enableHaptics'>
> = (props) => {
  const handlePress = (): void => {
    haptic.success(); // Triple-tap celebration
    props.onPress?.();
  };

  return (
    <AnimatedButton
      {...props}
      variant="primary"
      onPress={handlePress}
      enableHaptics={false} // Already handling via success()
    />
  );
};

/**
 * Preset: Celebration Button (for achievements, milestones)
 */
export const CelebrationButton: React.FC<
  Omit<AnimatedButtonProps, 'enableHaptics'>
> = (props) => {
  const handlePress = (): void => {
    haptic.celebration(); // Triple-tap pattern
    props.onPress?.();
  };

  return (
    <AnimatedButton
      {...props}
      onPress={handlePress}
      enableHaptics={false}
      pressScale={0.9} // More pronounced scale
    />
  );
};
