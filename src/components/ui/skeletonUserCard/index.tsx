import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { styles } from './stylesSkeletonUserCard';

export interface SkeletonUserCardProps {
  showActions?: boolean;
  testID?: string;
}

export const SkeletonUserCard: React.FC<SkeletonUserCardProps> = ({
  showActions = false,
  testID = 'skeleton-user-card',
}) => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => animation.stop();
  }, [shimmerAnim]);

  const shimmerStyle = {
    opacity: shimmerAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 0.7],
    }),
  };

  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.contentRow}>
        {}
        <Animated.View style={[styles.avatarSkeleton, shimmerStyle]} />

        {}
        <View style={styles.infoContainer}>
          {}
          <Animated.View style={[styles.nameSkeleton, shimmerStyle]} />

          {}
          <Animated.View style={[styles.usernameSkeleton, shimmerStyle]} />

          {}
          <View style={styles.locationRow}>
            <Animated.View style={[styles.iconSkeleton, shimmerStyle]} />
            <Animated.View
              style={[styles.locationTextSkeleton, shimmerStyle]}
            />
          </View>

          {}
          <View style={styles.sportsRow}>
            <Animated.View style={[styles.sportBadgeSkeleton, shimmerStyle]} />
            <Animated.View style={[styles.sportBadgeSkeleton, shimmerStyle]} />
            <Animated.View style={[styles.sportBadgeSmall, shimmerStyle]} />
          </View>
        </View>
      </View>

      {}
      {showActions && (
        <View style={styles.actionsContainer}>
          <Animated.View style={[styles.buttonSkeleton, shimmerStyle]} />
          <Animated.View style={[styles.buttonSkeleton, shimmerStyle]} />
        </View>
      )}
    </View>
  );
};
