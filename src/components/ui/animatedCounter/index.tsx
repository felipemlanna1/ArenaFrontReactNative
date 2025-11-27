// eslint-disable-next-line arena/arena-file-structure
import React, { useEffect, useState, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { Text } from '@/components/ui/text';
import { AnimatedCounterProps } from './typesAnimatedCounter';

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 1000,
  variant = 'displayPrimary',
  style,
  testID = 'animated-counter',
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animatedValue.setValue(0);
    setDisplayValue(0);

    const animation = Animated.timing(animatedValue, {
      toValue: value,
      duration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    });

    const listenerId = animatedValue.addListener(({ value: v }) => {
      setDisplayValue(Math.floor(v));
    });

    animation.start();

    return () => {
      animatedValue.removeListener(listenerId);
      animation.stop();
    };
  }, [value, duration, animatedValue]);

  return (
    <Text variant={variant} style={style} testID={testID}>
      {displayValue}
    </Text>
  );
};
