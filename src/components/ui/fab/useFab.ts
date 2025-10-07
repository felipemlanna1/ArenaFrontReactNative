import { useMemo } from 'react';
import { ArenaColors, ArenaSpacing } from '@/constants';
import {
  UseFabParams,
  UseFabReturn,
  FabSizeConfig,
  FabVariantConfig,
  FabPositionConfig,
} from './typesFab';

const SIZE_CONFIGS: Record<string, FabSizeConfig> = {
  sm: {
    width: 48,
    height: 48,
    iconSize: 20,
  },
  md: {
    width: 56,
    height: 56,
    iconSize: 24,
  },
  lg: {
    width: 64,
    height: 64,
    iconSize: 28,
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

  const opacity = disabled ? 0.5 : 1;

  return {
    sizeConfig,
    variantConfig,
    positionConfig,
    containerStyle,
    opacity,
  };
};
