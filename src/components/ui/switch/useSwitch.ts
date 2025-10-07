import { useMemo } from 'react';
import { UseSwitchParams, UseSwitchReturn } from './typesSwitch';
import { variantConfigs, sizeConfigs } from './stylesSwitch';

export const useSwitch = ({
  variant,
  size,
  value,
  disabled,
}: UseSwitchParams): UseSwitchReturn => {
  const variantConfig = useMemo(() => variantConfigs[variant], [variant]);
  const sizeConfig = useMemo(() => sizeConfigs[size], [size]);

  const trackColor = useMemo(
    () => ({
      false: variantConfig.trackColorFalse,
      true: variantConfig.trackColorTrue,
    }),
    [variantConfig]
  );

  const thumbColor = useMemo(
    () => (value ? variantConfig.thumbColorTrue : variantConfig.thumbColorFalse),
    [value, variantConfig]
  );

  const containerStyle = useMemo(
    () => ({
      gap: sizeConfig.gap,
      opacity: disabled ? variantConfig.disabledOpacity : 1,
    }),
    [sizeConfig, disabled, variantConfig]
  );

  const labelStyle = useMemo(
    () => ({
      fontSize: sizeConfig.labelFontSize,
    }),
    [sizeConfig]
  );

  return {
    variantConfig,
    sizeConfig,
    trackColor,
    thumbColor,
    containerStyle,
    labelStyle,
  };
};
