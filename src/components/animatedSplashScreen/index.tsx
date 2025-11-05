import React, { useEffect, useRef } from 'react';
import { View, Animated, Dimensions } from 'react-native';
import { Logo } from '@/components/ui/logo';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { styles } from './stylesAnimatedSplashScreen';

interface AnimatedSplashScreenProps {
  onAnimationComplete?: () => void;
}

interface SportBall {
  id: string;
  icon: string;
  iconFamily: 'Ionicons' | 'MaterialCommunityIcons';
  size: number;
  left: string;
  duration: number;
  delay: number;
  opacity: number;
}

const { height } = Dimensions.get('window');

const SPORT_BALLS: SportBall[] = [
  {
    id: 'football',
    icon: 'football',
    iconFamily: 'Ionicons',
    size: 40,
    left: '10%',
    duration: 20000,
    delay: 0,
    opacity: 0.15,
  },
  {
    id: 'basketball',
    icon: 'basketball',
    iconFamily: 'MaterialCommunityIcons',
    size: 45,
    left: '30%',
    duration: 25000,
    delay: 3000,
    opacity: 0.12,
  },
  {
    id: 'volleyball',
    icon: 'volleyball',
    iconFamily: 'MaterialCommunityIcons',
    size: 38,
    left: '50%',
    duration: 22000,
    delay: 6000,
    opacity: 0.14,
  },
  {
    id: 'tennis',
    icon: 'tennisball',
    iconFamily: 'Ionicons',
    size: 32,
    left: '70%',
    duration: 18000,
    delay: 9000,
    opacity: 0.13,
  },
  {
    id: 'baseball',
    icon: 'baseball',
    iconFamily: 'MaterialCommunityIcons',
    size: 35,
    left: '85%',
    duration: 23000,
    delay: 12000,
    opacity: 0.11,
  },
  {
    id: 'soccer',
    icon: 'soccer',
    iconFamily: 'MaterialCommunityIcons',
    size: 42,
    left: '20%',
    duration: 19000,
    delay: 15000,
    opacity: 0.14,
  },
  {
    id: 'golf',
    icon: 'golf',
    iconFamily: 'MaterialCommunityIcons',
    size: 30,
    left: '60%',
    duration: 21000,
    delay: 18000,
    opacity: 0.12,
  },
  {
    id: 'rugby',
    icon: 'rugby',
    iconFamily: 'MaterialCommunityIcons',
    size: 40,
    left: '40%',
    duration: 24000,
    delay: 21000,
    opacity: 0.13,
  },
];

const AnimatedBall: React.FC<{ ball: SportBall }> = ({ ball }) => {
  const translateY = useRef(new Animated.Value(height + 100)).current;
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startAnimation = () => {
      translateY.setValue(height + 100);
      rotate.setValue(0);

      setTimeout(() => {
        Animated.parallel([
          Animated.loop(
            Animated.timing(translateY, {
              toValue: -100,
              duration: ball.duration,
              useNativeDriver: true,
            })
          ),
          Animated.loop(
            Animated.timing(rotate, {
              toValue: 1,
              duration: ball.duration,
              useNativeDriver: true,
            })
          ),
        ]).start();
      }, ball.delay);
    };

    startAnimation();
  }, [ball.delay, ball.duration, translateY, rotate]);

  const rotateInterpolate = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const IconComponent =
    ball.iconFamily === 'Ionicons' ? Ionicons : MaterialCommunityIcons;

  return (
    <Animated.View
      style={[
        styles.ball,
        {
          left: ball.left as `${number}%`,
          transform: [{ translateY }, { rotate: rotateInterpolate }],
          opacity: ball.opacity,
        },
      ]}
    >
      <IconComponent
        name={ball.icon as never}
        size={ball.size}
        color="#FF5301"
      />
    </Animated.View>
  );
};

export const AnimatedSplashScreen: React.FC<AnimatedSplashScreenProps> = ({
  onAnimationComplete,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 10,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();

    if (onAnimationComplete) {
      setTimeout(onAnimationComplete, 3000);
    }
  }, [fadeAnim, scaleAnim, onAnimationComplete]);

  return (
    <View style={styles.container}>
      {SPORT_BALLS.map(ball => (
        <AnimatedBall key={ball.id} ball={ball} />
      ))}

      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Logo variant="white" size="xl" />
      </Animated.View>
    </View>
  );
};
