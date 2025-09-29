import { useMemo, useEffect } from 'react';
import { ViewStyle } from 'react-native';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  withDelay,
  SharedValue,
} from 'react-native-reanimated';
import { ArenaSpacing } from '@/constants';
import { getRandomSportsIcons } from './sports-icons';
import {
  UseSportsLoadingParams,
  UseSportsLoadingReturn,
  SportsLoadingConfig,
  SportsLoadingSize,
  SportsLoadingSpeed,
} from './typesSportsLoading';
import { styles } from './stylesSportsLoading';

const getSizeConfig = (
  size: SportsLoadingSize
): Pick<SportsLoadingConfig, 'iconSize' | 'spacing' | 'containerPadding'> => {
  if (!ArenaSpacing) {
    return {
      iconSize: 32,
      spacing: 12,
      containerPadding: 12,
    };
  }

  switch (size) {
    case 'xs':
      return {
        iconSize: 20,
        spacing: ArenaSpacing.xs || 4,
        containerPadding: ArenaSpacing.xs || 4,
      };
    case 'sm':
      return {
        iconSize: 24,
        spacing: ArenaSpacing.sm || 8,
        containerPadding: ArenaSpacing.sm || 8,
      };
    case 'lg':
      return {
        iconSize: 48,
        spacing: ArenaSpacing.lg || 16,
        containerPadding: ArenaSpacing.lg || 16,
      };
    case 'md':
    default:
      return {
        iconSize: 32,
        spacing: ArenaSpacing.md || 12,
        containerPadding: ArenaSpacing.md || 12,
      };
  }
};

const getAnimationDuration = (speed: SportsLoadingSpeed): number => {
  switch (speed) {
    case 'slow':
      return 1200;
    case 'fast':
      return 600;
    case 'normal':
    default:
      return 800;
  }
};

export const useSportsLoading = (
  params: UseSportsLoadingParams
): UseSportsLoadingReturn => {
  const { size, orientation, animationSpeed, iconCount } = params;

  const selectedIcons = useMemo(() => {
    return getRandomSportsIcons(iconCount);
  }, [iconCount]);

  const config = useMemo((): SportsLoadingConfig => {
    const sizeConfig = getSizeConfig(size);
    return {
      ...sizeConfig,
      animationDuration: getAnimationDuration(animationSpeed),
    };
  }, [size, animationSpeed]);

  const icon1Opacity = useSharedValue(0.3);
  const icon2Opacity = useSharedValue(0.3);
  const icon3Opacity = useSharedValue(0.3);
  const icon1Scale = useSharedValue(0.8);
  const icon2Scale = useSharedValue(0.8);
  const icon3Scale = useSharedValue(0.8);

  useEffect(() => {
    const animationDuration = config.animationDuration;
    const delay = animationDuration / 3;

    const createAnimation = (
      opacityValue: SharedValue<number>,
      scaleValue: SharedValue<number>,
      delayTime: number
    ) => {
      opacityValue.value = withDelay(
        delayTime,
        withRepeat(
          withSequence(
            withTiming(1, { duration: animationDuration / 2 }),
            withTiming(0.3, { duration: animationDuration / 2 })
          ),
          -1,
          false
        )
      );

      scaleValue.value = withDelay(
        delayTime,
        withRepeat(
          withSequence(
            withTiming(1, { duration: animationDuration / 2 }),
            withTiming(0.8, { duration: animationDuration / 2 })
          ),
          -1,
          false
        )
      );
    };

    createAnimation(icon1Opacity, icon1Scale, 0);
    createAnimation(icon2Opacity, icon2Scale, delay);
    createAnimation(icon3Opacity, icon3Scale, delay * 2);
  }, [
    config.animationDuration,
    icon1Opacity,
    icon2Opacity,
    icon3Opacity,
    icon1Scale,
    icon2Scale,
    icon3Scale,
  ]);

  const containerStyle = useMemo((): ViewStyle => {
    return {
      ...styles.container,
      ...(orientation === 'horizontal'
        ? styles.horizontalContainer
        : styles.verticalContainer),
      padding: config?.containerPadding || 12,
      gap: config?.spacing || 12,
    };
  }, [orientation, config?.containerPadding, config?.spacing]);

  const iconContainerStyle = useMemo((): ViewStyle => {
    const iconSize = config?.iconSize || 32;
    return {
      ...styles.iconContainer,
      width: iconSize,
      height: iconSize,
    };
  }, [config?.iconSize]);

  const icon1AnimatedStyle = useAnimatedStyle(() => ({
    opacity: icon1Opacity.value,
    transform: [{ scale: icon1Scale.value }],
  }));

  const icon2AnimatedStyle = useAnimatedStyle(() => ({
    opacity: icon2Opacity.value,
    transform: [{ scale: icon2Scale.value }],
  }));

  const icon3AnimatedStyle = useAnimatedStyle(() => ({
    opacity: icon3Opacity.value,
    transform: [{ scale: icon3Scale.value }],
  }));

  const iconStyle = (index: number) => {
    const iconSize = config?.iconSize || 32;

    const baseStyle = [
      styles.icon,
      {
        width: iconSize,
        height: iconSize,
      },
    ];

    const getAnimatedStyle = () => {
      switch (index) {
        case 0:
          return icon1AnimatedStyle;
        case 1:
          return icon2AnimatedStyle;
        case 2:
          return icon3AnimatedStyle;
        default:
          return {};
      }
    };

    return [baseStyle, getAnimatedStyle()];
  };

  return {
    selectedIcons,
    config,
    animationValues: {
      icon1Opacity,
      icon2Opacity,
      icon3Opacity,
      icon1Scale,
      icon2Scale,
      icon3Scale,
    },
    containerStyle,
    iconContainerStyle,
    iconStyle,
  };
};
