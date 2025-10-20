import { useMemo } from 'react';
import { ArenaColors, ArenaSpacing, ArenaOpacity } from '@/constants';
import {
  UseFabParams,
  UseFabReturn,
  FabSizeConfig,
  FabVariantConfig,
  FabPositionConfig,
} from './typesFab';

const SIZE_CONFIGS: Record<string, FabSizeConfig> = {
  sm: {
    width: ArenaSpacing['5xl'],
    height: ArenaSpacing['5xl'],
    iconSize: ArenaSpacing.xl,
  },
  md: {
    width: ArenaSpacing['5.75xl'],
    height: ArenaSpacing['5.75xl'],
    iconSize: ArenaSpacing['2xl'],
  },
  lg: {
    width: ArenaSpacing['6xl'],
    height: ArenaSpacing['6xl'],
    iconSize: ArenaSpacing['2.5xl'],
  },
};

const VARIANT_CONFIGS: Record<string, FabVariantConfig> = {
  primary: {
    backgroundColor: ArenaColors.brand.primary,
    iconColor: ArenaColors.neutral.light,
    pressedBackgroundColor: ArenaColors.brand.primaryPressed,
  },
  secondary: {
    backgroundColor: ArenaColors.neutral.dark,
    iconColor: ArenaColors.neutral.light,
    pressedBackgroundColor: ArenaColors.neutral.medium,
  },
};

const POSITION_CONFIGS: Record<string, FabPositionConfig> = {
  'bottom-right': {
    bottom: ArenaSpacing['4xl'],
    right: ArenaSpacing.lg,
  },
  'bottom-left': {
    bottom: ArenaSpacing['4xl'],
    left: ArenaSpacing.lg,
  },
  'bottom-center': {
    bottom: ArenaSpacing['4xl'],
    alignSelf: 'center',
  },
};

export const useFab = ({
  size,
  variant,
  position,
  bottom: customBottom,
  right: customRight,
  left: customLeft,
  disabled,
}: UseFabParams): UseFabReturn => {
  const sizeConfig = useMemo(() => SIZE_CONFIGS[size], [size]);
  const variantConfig = useMemo(() => VARIANT_CONFIGS[variant], [variant]);
  const positionConfig = useMemo(() => {
    const baseConfig = POSITION_CONFIGS[position];
    return {
      ...baseConfig,
      bottom: customBottom ?? baseConfig.bottom,
      right: customRight ?? baseConfig.right,
      left: customLeft ?? baseConfig.left,
    };
  }, [position, customBottom, customRight, customLeft]);

  const containerStyle = useMemo(
    () => ({
      width: sizeConfig.width,
      height: sizeConfig.height,
      borderRadius: sizeConfig.width / 2,
      backgroundColor: variantConfig.backgroundColor,
      ...positionConfig,
    }),
    [sizeConfig, variantConfig, positionConfig]
  );

  const opacity = disabled ? ArenaOpacity.medium : ArenaOpacity.opaque;

  return {
    sizeConfig,
    variantConfig,
    positionConfig,
    containerStyle,
    opacity,
  };
};
