import { useMemo, useCallback } from 'react';
import { BadgeVariant, BadgeSize } from './typesBadge';
import { variantConfigs, sizeConfigs } from './stylesBadge';
import { ArenaTypography } from '@/constants';

interface UseBadgeParams {
  variant: BadgeVariant;
  size: BadgeSize;
  removable: boolean;
  onRemove?: () => void;
}

export const useBadge = ({
  variant,
  size,
  removable,
  onRemove,
}: UseBadgeParams) => {
  const variantConfig = useMemo(() => variantConfigs[variant], [variant]);
  const sizeConfig = useMemo(() => sizeConfigs[size], [size]);

  const containerStyle = useMemo(
    () => ({
      backgroundColor: variantConfig.backgroundColor,
      borderColor: variantConfig.borderColor,
      borderWidth: variantConfig.borderWidth,
      paddingVertical: sizeConfig.paddingVertical,
      paddingHorizontal: sizeConfig.paddingHorizontal,
      borderRadius: sizeConfig.borderRadius,
    }),
    [variantConfig, sizeConfig]
  );

  const textStyle = useMemo(
    () => ({
      color: variantConfig.textColor,
      fontSize: sizeConfig.fontSize,
    }),
    [variantConfig, sizeConfig]
  );

  const removeIconStyle = useMemo(
    () => ({
      color: variantConfig.removeIconColor,
    }),
    [variantConfig]
  );

  const removeIconSize = useMemo(() => {
    const iconSizeMap: Record<BadgeSize, number> = {
      sm: ArenaTypography.size.sm,
      md: ArenaTypography.size.md,
      lg: ArenaTypography.size.lg,
    };
    return iconSizeMap[size];
  }, [size]);

  const handleRemove = useCallback(() => {
    if (removable && onRemove) {
      onRemove();
    }
  }, [removable, onRemove]);

  return {
    containerStyle,
    textStyle,
    removeIconStyle,
    removeIconSize,
    handleRemove,
    canRemove: removable && !!onRemove,
  };
};
