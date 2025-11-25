import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { CompletionRingProps } from './typesCompletionRing';
import { styles } from './stylesCompletionRing';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const CompletionRing: React.FC<CompletionRingProps> = ({
  size = 120,
  strokeWidth = 4,
  progress = 0,
  children,
  style,
  testID = 'completion-ring',
}) => {
  const animatedProgress = useRef(new Animated.Value(0)).current;

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: progress,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [progress, animatedProgress]);

  const strokeDashoffset = animatedProgress.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
  });

  const getStrokeColor = (): string => {
    if (progress >= 100) return '#28C76F'; // Verde
    if (progress >= 50) return '#FF5301'; // Laranja
    return '#E63946'; // Vermelho
  };

  return (
    <View style={[styles.container, { width: size, height: size }, style]} testID={testID}>
      <Svg width={size} height={size} style={styles.svg}>
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#2A2F3D"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <AnimatedCircle
          cx={center}
          cy={center}
          r={radius}
          stroke={getStrokeColor()}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${center}, ${center}`}
        />
      </Svg>
      <View style={styles.childrenContainer}>{children}</View>
    </View>
  );
};
