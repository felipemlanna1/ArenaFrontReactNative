import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { Badge } from '@/components/ui/badge';
import type { BadgeVariant } from '@/components/ui/badge/typesBadge';

interface PulsatingBadgeProps {
  variant: BadgeVariant;
  children: string;
}

export const PulsatingBadge: React.FC<PulsatingBadgeProps> = ({
  variant,
  children,
}) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [pulseAnim]);

  return (
    <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
      <Badge variant={variant}>{children}</Badge>
    </Animated.View>
  );
};
