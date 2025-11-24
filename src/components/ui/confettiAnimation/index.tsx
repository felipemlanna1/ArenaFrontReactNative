import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { ArenaColors } from '@/constants';
import { ConfettiAnimationProps, Particle } from './typesConfettiAnimation';
import { styles } from './stylesConfettiAnimation';

const createParticles = (count: number): Particle[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    x: Math.random() * 100,
    y: -20,
    rotation: Math.random() * 360,
    size: 6 + Math.random() * 6,
    color:
      [
        ArenaColors.brand.primary,
        ArenaColors.brand.secondary,
        ArenaColors.semantic.success,
      ][Math.floor(Math.random() * 3)] || ArenaColors.brand.primary,
    velocityX: (Math.random() - 0.5) * 2,
    velocityY: 2 + Math.random() * 2,
  }));
};

export const ConfettiAnimation: React.FC<ConfettiAnimationProps> = ({
  particleCount = 15,
  duration = 1500,
  onComplete,
  testID = 'confetti-animation',
}) => {
  const particles = useRef<Particle[]>(createParticles(particleCount)).current;
  const animatedValues = useRef(
    particles.map(
      () =>
        new Animated.ValueXY({
          x: 0,
          y: 0,
        })
    )
  ).current;
  const opacityValues = useRef(
    particles.map(() => new Animated.Value(1))
  ).current;

  useEffect(() => {
    const animations = particles.map((particle, index) => {
      const finalY = 150 + Math.random() * 50;

      return Animated.parallel([
        Animated.timing(animatedValues[index], {
          toValue: {
            x: particle.velocityX * 50,
            y: finalY,
          },
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValues[index], {
          toValue: 0,
          duration: duration * 0.8,
          delay: duration * 0.2,
          useNativeDriver: true,
        }),
      ]);
    });

    Animated.parallel(animations).start(() => {
      onComplete?.();
    });
  }, [particles, animatedValues, opacityValues, duration, onComplete]);

  return (
    <View style={styles.container} testID={testID} pointerEvents="none">
      {particles.map((particle, index) => {
        const translateX = animatedValues[index].x;
        const translateY = animatedValues[index].y;
        const opacity = opacityValues[index];

        return (
          <Animated.View
            key={particle.id}
            style={[
              styles.particle,
              {
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: particle.size,
                height: particle.size,
                backgroundColor: particle.color,
                opacity,
                transform: [{ translateX }, { translateY }],
              },
            ]}
            testID={`${testID}-particle-${index}`}
          />
        );
      })}
    </View>
  );
};
