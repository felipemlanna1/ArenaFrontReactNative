import { useMemo } from 'react';
import { LogoSize, LogoVariant } from './typesLogo';
import { logoSizes } from './stylesLogo';

const logoFiles = {
  variant1: require('@/assets/images/logos/L1.svg'),
  variant2: require('@/assets/images/logos/L2.svg'),
  variant3: require('@/assets/images/logos/L3.svg'),
  variant4: require('@/assets/images/logos/L4.svg'),
  black: require('@/assets/images/logos/L5_Preto.svg'),
  white: require('@/assets/images/logos/L6_Branco.svg'),
};

export const useLogo = (
  size: LogoSize = 'md',
  variant: LogoVariant = 'variant1'
) => {
  const dimensions = useMemo(() => logoSizes[size], [size]);

  const logoSource = useMemo(() => logoFiles[variant], [variant]);

  return {
    dimensions,
    logoSource,
  };
};
