// eslint-disable-next-line arena/arena-file-structure
import React, { useRef } from 'react';
import { Animated, Pressable, ViewStyle } from 'react-native';
import { Button, ButtonProps } from '@/components/ui/button';
import { haptic } from '@/utils/haptics';

export interface AnimatedButtonProps extends Omit<ButtonProps, 'onPress'> {
  onPress?: () => void;

  enableHaptics?: boolean;

  pressScale?: number;

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
    if (enableHaptics) {
      haptic.light();
    }

    Animated.spring(scaleAnim, {
      toValue: pressScale,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (): void => {
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
        <Button {...buttonProps} onPress={() => {}} />
      </Pressable>
    </Animated.View>
  );
};

export const SuccessButton: React.FC<
  Omit<AnimatedButtonProps, 'variant' | 'enableHaptics'>
> = props => {
  const handlePress = (): void => {
    haptic.success();
    props.onPress?.();
  };

  return (
    <AnimatedButton
      {...props}
      variant="primary"
      onPress={handlePress}
      enableHaptics={false}
    />
  );
};

export const CelebrationButton: React.FC<
  Omit<AnimatedButtonProps, 'enableHaptics'>
> = props => {
  const handlePress = (): void => {
    haptic.celebration();
    props.onPress?.();
  };

  return (
    <AnimatedButton
      {...props}
      onPress={handlePress}
      enableHaptics={false}
      pressScale={0.9}
    />
  );
};
