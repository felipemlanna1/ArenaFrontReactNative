import { useState, useCallback, useMemo } from 'react';
import {
  UsePriceRangeFilterProps,
  UsePriceRangeFilterReturn,
} from './typesPriceRangeFilter';
import { PRICE_LIMITS } from '@/constants/filterDefaults';

export const usePriceRangeFilter = ({
  priceMin,
  priceMax,
  onPriceMinChange,
  onPriceMaxChange,
}: UsePriceRangeFilterProps): UsePriceRangeFilterReturn => {
  const [localMin, setLocalMin] = useState(priceMin?.toString() ?? '');
  const [localMax, setLocalMax] = useState(priceMax?.toString() ?? '');

  const formattedMin = useMemo(() => {
    return localMin;
  }, [localMin]);

  const formattedMax = useMemo(() => {
    return localMax;
  }, [localMax]);

  const handleMinChange = useCallback(
    (text: string) => {
      const cleaned = text.replace(/[^0-9]/g, '');
      setLocalMin(cleaned);

      if (cleaned === '') {
        onPriceMinChange(null);
      } else {
        const value = parseInt(cleaned, 10);
        if (value >= PRICE_LIMITS.MIN && value <= PRICE_LIMITS.MAX) {
          onPriceMinChange(value);
        }
      }
    },
    [onPriceMinChange]
  );

  const handleMaxChange = useCallback(
    (text: string) => {
      const cleaned = text.replace(/[^0-9]/g, '');
      setLocalMax(cleaned);

      if (cleaned === '') {
        onPriceMaxChange(null);
      } else {
        const value = parseInt(cleaned, 10);
        if (value >= PRICE_LIMITS.MIN && value <= PRICE_LIMITS.MAX) {
          onPriceMaxChange(value);
        }
      }
    },
    [onPriceMaxChange]
  );

  const hasError = useMemo(() => {
    if (priceMin !== null && priceMax !== null) {
      return priceMin > priceMax;
    }
    return false;
  }, [priceMin, priceMax]);

  const errorMessage = useMemo(() => {
    if (hasError) {
      return 'Preço mínimo deve ser menor que o máximo';
    }
    return '';
  }, [hasError]);

  return {
    formattedMin,
    formattedMax,
    handleMinChange,
    handleMaxChange,
    hasError,
    errorMessage,
  };
};
