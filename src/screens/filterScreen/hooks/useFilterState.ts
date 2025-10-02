import { useState, useCallback, useMemo } from 'react';
import { FilterScreenState, FilterCount } from '../typesFilterScreen';
import { DEFAULT_FILTER_STATE } from '../utils/filterConstants';
import { calculateFilterCount } from '../utils/filterTransformers';

interface UseFilterStateProps {
  initialFilters?: Partial<FilterScreenState>;
}

interface UseFilterStateReturn {
  filters: FilterScreenState;
  updateFilter: <K extends keyof FilterScreenState>(
    key: K,
    value: FilterScreenState[K]
  ) => void;
  toggleArrayFilter: <K extends keyof FilterScreenState>(
    key: K,
    value: string
  ) => void;
  clearFilters: () => void;
  filterCount: FilterCount;
}

export const useFilterState = ({
  initialFilters,
}: UseFilterStateProps = {}): UseFilterStateReturn => {
  const [filters, setFilters] = useState<FilterScreenState>({
    ...DEFAULT_FILTER_STATE,
    ...initialFilters,
  });

  const updateFilter = useCallback(
    <K extends keyof FilterScreenState>(
      key: K,
      value: FilterScreenState[K]
    ) => {
      setFilters(prev => ({ ...prev, [key]: value }));
    },
    []
  );

  const toggleArrayFilter = useCallback(
    <K extends keyof FilterScreenState>(key: K, value: string) => {
      setFilters(prev => {
        const currentArray = prev[key] as unknown as string[];
        const newArray = currentArray.includes(value)
          ? currentArray.filter(v => v !== value)
          : [...currentArray, value];
        return { ...prev, [key]: newArray };
      });
    },
    []
  );

  const clearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTER_STATE);
  }, []);

  const filterCount = useMemo(() => calculateFilterCount(filters), [filters]);

  return {
    filters,
    updateFilter,
    toggleArrayFilter,
    clearFilters,
    filterCount,
  };
};
