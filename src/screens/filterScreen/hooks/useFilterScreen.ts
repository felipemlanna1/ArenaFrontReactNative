import { useState, useCallback, useMemo, useEffect } from 'react';
import { UseFilterScreenReturn } from '../typesFilterScreen';
import { useFilterState } from './useFilterState';
import { useUserLocation } from './useUserLocation';
import {
  transformToAPIFilters,
  transformFromAPIFilters,
} from '../utils/filterTransformers';
import { EventsFilter } from '@/services/events/typesEvents';

interface UseFilterScreenProps {
  currentFilters?: Partial<EventsFilter>;
  onApplyFilters: (filters: EventsFilter) => void;
}

export const useFilterScreen = ({
  currentFilters,
  onApplyFilters,
}: UseFilterScreenProps): UseFilterScreenReturn => {
  const [isApplying, setIsApplying] = useState(false);

  const { city, state } = useUserLocation();

  const initialStateFilters = useMemo(
    () => transformFromAPIFilters(currentFilters),
    [currentFilters]
  );

  const {
    filters,
    updateFilter,
    toggleArrayFilter,
    clearFilters,
    filterCount,
  } = useFilterState({ initialFilters: initialStateFilters });

  useEffect(() => {
    if (city && !filters.city) {
      updateFilter('city', city);
    }
    if (state && !filters.state) {
      updateFilter('state', state);
    }
  }, [city, state, filters.city, filters.state, updateFilter]);

  const applyFilters = useCallback(async () => {
    try {
      setIsApplying(true);
      const apiFilters = transformToAPIFilters(filters);
      await onApplyFilters(apiFilters);
    } finally {
      setIsApplying(false);
    }
  }, [filters, onApplyFilters]);

  return {
    filters,
    updateFilter,
    toggleArrayFilter,
    clearFilters,
    applyFilters,
    filterCount,
    isApplying,
  };
};
