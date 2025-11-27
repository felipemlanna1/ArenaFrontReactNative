import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { Text } from '@/components/ui/text';
import { ActiveBadgeProps } from './typesActiveBadge';
import { styles } from './stylesActiveBadge';

export const ActiveBadge: React.FC<ActiveBadgeProps> = ({
  isActive = false,
  style,
  testID = 'active-badge',
}) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!isActive) return;

    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0.6,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    pulseAnimation.start();

    return () => {
      pulseAnimation.stop();
    };
  }, [isActive, pulseAnim, opacityAnim]);

  if (!isActive) return null;

  return (
    <View style={[styles.container, style]} testID={testID}>
      <Animated.View
        style={[
          styles.dot,
          {
            transform: [{ scale: pulseAnim }],
            opacity: opacityAnim,
          },
        ]}
      />
      <View style={styles.dot} />
      <Text variant="captionSecondary" style={styles.text}>
        Ativo agora
      </Text>
    </View>
  );
};
