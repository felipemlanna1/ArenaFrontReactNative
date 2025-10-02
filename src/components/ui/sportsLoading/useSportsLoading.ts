import { useMemo, useEffect } from 'react';
import { ViewStyle } from 'react-native';
import {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
  withSequence,
  Easing,
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
    case 'xl':
      return {
        iconSize: 64,
        spacing: ArenaSpacing.xl || 20,
        containerPadding: ArenaSpacing.xl || 20,
      };
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
      return 3000;
    case 'fast':
      return 1200;
    default:
      return 2000;
  }
};

export const useSportsLoading = ({
  size,
  orientation,
  animationSpeed,
  iconCount,
}: UseSportsLoadingParams): UseSportsLoadingReturn => {
  const selectedIcons = useMemo(() => {
    return getRandomSportsIcons(iconCount);
  }, [iconCount]);

  const config: SportsLoadingConfig = useMemo(() => {
    const sizeConfig = getSizeConfig(size);
    return {
      ...sizeConfig,
      animationDuration: getAnimationDuration(animationSpeed),
    };
  }, [size, animationSpeed]);

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

  const opacity0 = useSharedValue(0.3);
  const opacity1 = useSharedValue(0.3);
  const opacity2 = useSharedValue(0.3);
  const opacity3 = useSharedValue(0.3);
  const opacity4 = useSharedValue(0.3);

  const scale0 = useSharedValue(0.8);
  const scale1 = useSharedValue(0.8);
  const scale2 = useSharedValue(0.8);
  const scale3 = useSharedValue(0.8);
  const scale4 = useSharedValue(0.8);

  const opacityValues = useMemo(
    () => [opacity0, opacity1, opacity2, opacity3, opacity4],
    [opacity0, opacity1, opacity2, opacity3, opacity4]
  );
  const scaleValues = useMemo(
    () => [scale0, scale1, scale2, scale3, scale4],
    [scale0, scale1, scale2, scale3, scale4]
  );

  useEffect(() => {
    const totalDuration = config.animationDuration;
    const delayBetweenIcons = totalDuration / iconCount;

    opacityValues.slice(0, iconCount).forEach((opacity, index) => {
      opacity.value = withDelay(
        index * delayBetweenIcons,
        withRepeat(
          withSequence(
            withTiming(1, {
              duration: totalDuration * 0.4,
              easing: Easing.bezier(0.4, 0, 0.2, 1),
            }),
            withTiming(0.4, {
              duration: totalDuration * 0.4,
              easing: Easing.bezier(0.4, 0, 0.2, 1),
            })
          ),
          -1,
          false
        )
      );
    });

    scaleValues.slice(0, iconCount).forEach((scale, index) => {
      scale.value = withDelay(
        index * delayBetweenIcons,
        withRepeat(
          withSequence(
            withTiming(1, {
              duration: totalDuration * 0.4,
              easing: Easing.bezier(0.4, 0, 0.2, 1),
            }),
            withTiming(0.9, {
              duration: totalDuration * 0.4,
              easing: Easing.bezier(0.4, 0, 0.2, 1),
            })
          ),
          -1,
          false
        )
      );
    });
  }, [
    config.animationDuration,
    iconCount,
    opacityValues,
    scaleValues,
    opacity0,
    opacity1,
    opacity2,
    opacity3,
    opacity4,
    scale0,
    scale1,
    scale2,
    scale3,
    scale4,
  ]);

  const iconSize = config?.iconSize || 32;

  const icon0Style = useAnimatedStyle(() => ({
    width: iconSize,
    height: iconSize,
    opacity: opacity0.value,
    transform: [{ scale: scale0.value }],
    zIndex: 1,
  }));

  const icon1Style = useAnimatedStyle(() => ({
    width: iconSize,
    height: iconSize,
    opacity: opacity1.value,
    transform: [{ scale: scale1.value }],
    zIndex: 1,
  }));

  const icon2Style = useAnimatedStyle(() => ({
    width: iconSize,
    height: iconSize,
    opacity: opacity2.value,
    transform: [{ scale: scale2.value }],
    zIndex: 1,
  }));

  const icon3Style = useAnimatedStyle(() => ({
    width: iconSize,
    height: iconSize,
    opacity: opacity3.value,
    transform: [{ scale: scale3.value }],
    zIndex: 1,
  }));

  const icon4Style = useAnimatedStyle(() => ({
    width: iconSize,
    height: iconSize,
    opacity: opacity4.value,
    transform: [{ scale: scale4.value }],
    zIndex: 1,
  }));

  const iconStyles = [
    icon0Style,
    icon1Style,
    icon2Style,
    icon3Style,
    icon4Style,
  ];

  const iconStyle = (index: number) => iconStyles[index];

  return {
    selectedIcons,
    containerStyle,
    iconContainerStyle,
    iconStyle,
  };
};
