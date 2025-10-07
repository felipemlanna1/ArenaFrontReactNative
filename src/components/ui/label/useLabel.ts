import { useMemo } from 'react';
import { ArenaColors, ArenaTypography } from '@/constants';
import { UseLabelParams, UseLabelReturn } from './typesLabel';
import { VARIANT_CONFIG } from './stylesLabel';

export const useLabel = ({
  variant,
  size,
  disabled,
}: UseLabelParams): UseLabelReturn => {
  const labelStyle = useMemo(() => {
    const config = VARIANT_CONFIG[variant];
    const finalSize = size || config.size;

    return {
      fontSize: ArenaTypography.size[finalSize],
      fontWeight: config.fontWeight as
        | 'normal'
        | 'bold'
        | '100'
        | '200'
        | '300'
        | '400'
        | '500'
        | '600'
        | '700'
        | '800'
        | '900',
      color: disabled ? ArenaColors.disabled.text : config.color,
      marginBottom: config.marginBottom,
    };
  }, [variant, size, disabled]);

  const requiredStyle = useMemo(
    () => ({
      color: ArenaColors.semantic.error,
    }),
    []
  );

  return {
    labelStyle,
    requiredStyle,
  };
};
