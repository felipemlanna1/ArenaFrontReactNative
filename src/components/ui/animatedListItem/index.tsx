// eslint-disable-next-line arena/arena-file-structure
import React, { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

interface AnimatedListItemProps {
  children: React.ReactNode;
  index: number;
  duration?: number;
  delay?: number;
}

export const AnimatedListItem: React.FC<AnimatedListItemProps> = ({
  children,
  index,
  duration = 400,
  delay = 50,
}) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffect(() => {
    const itemDelay = index * delay;

    opacity.value = withDelay(itemDelay, withTiming(1, { duration }));

    translateY.value = withDelay(
      itemDelay,
      withSpring(0, {
        damping: 20,
        stiffness: 90,
      })
    );
  }, [index, delay, duration, opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
};
