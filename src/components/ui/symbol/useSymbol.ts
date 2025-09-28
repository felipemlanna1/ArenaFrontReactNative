import { useMemo } from 'react';
import { SymbolSize, SymbolVariant } from './typesSymbol';
import { symbolSizes } from './stylesSymbol';
const symbolFiles = {
  variant1: require('@/assets/images/symbols/SIMBOLO1.svg'),
  variant2: require('@/assets/images/symbols/SIMBOLO2.svg'),
  variant3: require('@/assets/images/symbols/SIMBOLO3.svg'),
  variant4: require('@/assets/images/symbols/SIMBOLO4.svg'),
  black: require('@/assets/images/symbols/SIMBOLO5_Preto.svg'),
  white: require('@/assets/images/symbols/SIMBOLO6_Branco.svg'),
};
export const useSymbol = (
  size: SymbolSize = 'md',
  variant: SymbolVariant = 'variant1'
) => {
  const dimensions = useMemo(() => symbolSizes[size], [size]);
  const symbolSource = useMemo(() => symbolFiles[variant], [variant]);
  return {
    dimensions,
    symbolSource,
  };
};
