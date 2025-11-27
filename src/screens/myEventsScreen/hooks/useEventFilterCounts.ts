import { useState, useEffect, useCallback } from 'react';
import { eventsService } from '@/services/events/eventsService';
import { FilterCounts, EventFilterType } from '../typesMyEventsScreen';
import { buildMyEventsFilters } from '../utils/buildMyEventsFilters';

interface UseEventFilterCountsReturn {
  filterCounts: FilterCounts;
  isLoading: boolean;
  refetch: () => Promise<void>;
}

export const useEventFilterCounts = (): UseEventFilterCountsReturn => {
  const [filterCounts, setFilterCounts] = useState<FilterCounts>({
    all: 0,
    organizing: 0,
    participating: 0,
    invited: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const loadCounts = useCallback(async () => {
    try {
      setIsLoading(true);

      const filters: EventFilterType[] = [
        'all',
        'organizing',
        'participating',
        'invited',
      ];

      const countPromises = filters.map(async filter => {
        const builtFilters = buildMyEventsFilters(filter);
        const response = await eventsService.getFeedEvents(1, builtFilters);
        return {
          filter,
          count: response.pagination.totalItems || response.data.length,
        };
      });

      const results = await Promise.all(countPromises);

      const counts: FilterCounts = {
        all: 0,
        organizing: 0,
        participating: 0,
        invited: 0,
      };

      results.forEach(result => {
        counts[result.filter as keyof FilterCounts] = result.count;
      });

      setFilterCounts(counts);
    } catch {
      return;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCounts();
  }, [loadCounts]);

  return {
    filterCounts,
    isLoading,
    refetch: loadCounts,
  };
};
