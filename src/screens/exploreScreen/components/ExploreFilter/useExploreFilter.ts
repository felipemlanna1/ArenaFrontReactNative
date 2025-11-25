import { useCallback } from 'react';
import {
  UseExploreFilterProps,
  UseExploreFilterReturn,
  ExploreFilterType,
} from './typesExploreFilter';

export const useExploreFilter = ({
  onChange,
}: UseExploreFilterProps): UseExploreFilterReturn => {
  const handlePress = useCallback(
    (value: ExploreFilterType) => {
      onChange(value);
    },
    [onChange]
  );

  return {
    handlePress,
  };
};
