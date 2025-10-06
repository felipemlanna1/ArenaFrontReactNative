import { useState, useCallback, useRef } from 'react';
import { Event, EventsFilter } from '@/services/events/typesEvents';
import { eventsService } from '@/services/events/eventsService';

interface UseHomeEventsParams {
  apiFilters: EventsFilter | null;
}

interface UseHomeEventsReturn {
  events: Event[];
  isLoading: boolean;
  isRefreshing: boolean;
  isLoadingMore: boolean;
  error: Error | null;
  hasMore: boolean;
  currentPage: number;
  loadEvents: () => Promise<void>;
  refreshEvents: () => Promise<void>;
  loadMoreEvents: () => Promise<void>;
  handleShare: (eventId: string) => void;
}

export const useHomeEvents = ({
  apiFilters,
}: UseHomeEventsParams): UseHomeEventsReturn => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const isLoadingRef = useRef(false);
  const apiFiltersRef = useRef(apiFilters);

  apiFiltersRef.current = apiFilters;

  const filterFutureEvents = useCallback((eventsList: Event[]): Event[] => {
    const currentDate = new Date();
    return eventsList.filter(event => {
      const eventStartDate = new Date(event.startDate);
      return eventStartDate > currentDate && event.status === 'PUBLISHED';
    });
  }, []);

  const loadEvents = useCallback(async () => {
    if (isLoadingRef.current) {
      return;
    }

    const filters = apiFiltersRef.current;

    if (!filters) {
      return;
    }

    try {
      isLoadingRef.current = true;
      setIsLoading(true);
      setError(null);

      let response;
      const currentFilters = filters as EventsFilter & { eventFilter?: string };

      if (currentFilters.eventFilter === 'participating') {
        response = await eventsService.getFeedEvents(1, {
          ...filters,
          userEventStatus: ['PARTICIPANT'],
        });
      } else if (currentFilters.eventFilter === 'invited') {
        response = await eventsService.getFeedEvents(1, {
          ...filters,
          userEventStatus: ['INVITED'],
        });
      } else if (currentFilters.eventFilter === 'organizing') {
        response = await eventsService.getFeedEvents(1, {
          ...filters,
          userEventStatus: ['ORGANIZER', 'ADMIN'],
        });
      } else {
        response = await eventsService.getFeedEvents(1, filters);
      }

      const futureEvents = filterFutureEvents(response.data);

      setEvents(futureEvents);
      setCurrentPage(1);
      setHasMore(response.pagination.hasMore);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Erro ao carregar eventos')
      );
    } finally {
      setIsLoading(false);
      isLoadingRef.current = false;
    }
  }, [filterFutureEvents]);

  const loadMoreEvents = useCallback(async () => {
    if (isLoadingMore || !hasMore || isLoadingRef.current) return;

    const filters = apiFiltersRef.current;

    if (!filters) {
      return;
    }

    try {
      setIsLoadingMore(true);
      const nextPage = currentPage + 1;

      let response;
      const currentFilters = filters as EventsFilter & { eventFilter?: string };

      if (currentFilters.eventFilter === 'participating') {
        response = await eventsService.getFeedEvents(nextPage, {
          ...filters,
          userEventStatus: ['PARTICIPANT'],
        });
      } else if (currentFilters.eventFilter === 'invited') {
        response = await eventsService.getFeedEvents(nextPage, {
          ...filters,
          userEventStatus: ['INVITED'],
        });
      } else if (currentFilters.eventFilter === 'organizing') {
        response = await eventsService.getFeedEvents(nextPage, {
          ...filters,
          userEventStatus: ['ORGANIZER', 'ADMIN'],
        });
      } else {
        response = await eventsService.getFeedEvents(nextPage, filters);
      }

      const futureEvents = filterFutureEvents(response.data);

      setEvents(prev => [...prev, ...futureEvents]);
      setCurrentPage(nextPage);
      setHasMore(response.pagination.hasMore);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Erro ao carregar mais eventos')
      );
    } finally {
      setIsLoadingMore(false);
    }
  }, [currentPage, hasMore, isLoadingMore, filterFutureEvents]);

  const refreshEvents = useCallback(async () => {
    if (isLoadingRef.current) return;

    const filters = apiFiltersRef.current;

    if (!filters) {
      return;
    }

    try {
      isLoadingRef.current = true;
      setIsRefreshing(true);
      setError(null);

      let response;
      const currentFilters = filters as EventsFilter & { eventFilter?: string };

      if (currentFilters.eventFilter === 'participating') {
        response = await eventsService.getFeedEvents(1, {
          ...filters,
          userEventStatus: ['PARTICIPANT'],
        });
      } else if (currentFilters.eventFilter === 'invited') {
        response = await eventsService.getFeedEvents(1, {
          ...filters,
          userEventStatus: ['INVITED'],
        });
      } else if (currentFilters.eventFilter === 'organizing') {
        response = await eventsService.getFeedEvents(1, {
          ...filters,
          userEventStatus: ['ORGANIZER', 'ADMIN'],
        });
      } else {
        response = await eventsService.getFeedEvents(1, filters);
      }

      const futureEvents = filterFutureEvents(response.data);

      setEvents(futureEvents);
      setCurrentPage(1);
      setHasMore(response.pagination.hasMore);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Erro ao atualizar eventos')
      );
    } finally {
      setIsRefreshing(false);
      isLoadingRef.current = false;
    }
  }, [filterFutureEvents]);

  const handleShare = useCallback((eventId: string) => {
    void eventId;
  }, []);

  return {
    events,
    isLoading,
    isRefreshing,
    isLoadingMore,
    error,
    hasMore,
    currentPage,
    loadEvents,
    refreshEvents,
    loadMoreEvents,
    handleShare,
  };
};
