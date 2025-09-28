import { useMemo } from 'react';
import { AppIconSize } from './typesAppIcon';
import { appIconSizes } from './stylesAppIcon';

export const useAppIcon = (size: AppIconSize = 'md') => {
  const dimensions = useMemo(() => {
    const iconSize = appIconSizes[size];
    return {
      width: iconSize.size,
      height: iconSize.size,
      symbolSize: Math.round(iconSize.size * 0.6), // Symbol é 60% do tamanho do ícone
    };
  }, [size]);

  return {
    dimensions,
  };
};
