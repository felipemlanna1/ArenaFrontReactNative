import { useState, useCallback } from 'react';
import { UseExploreScreenReturn } from './typesExploreScreen';
import { ExploreFilterType, FilterCount } from './components/ExploreFilter/typesExploreFilter';

export const useExploreScreen = (): UseExploreScreenReturn => {
  const [isLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState<ExploreFilterType>('events');

  // Placeholder filter counts - to be replaced with actual data
  const filterCounts: FilterCount = {
    friends: 0,
    groups: 0,
    events: 0,
  };

  const handleFilterChange = useCallback((filter: ExploreFilterType) => {
    setActiveFilter(filter);
  }, []);

  return {
    isLoading,
    activeFilter,
    filterCounts,
    handleFilterChange,
  };
};
