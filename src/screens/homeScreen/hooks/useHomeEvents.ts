import { useState, useCallback, useEffect, useRef } from 'react';
import { Event, EventsFilter } from '@/services/events/typesEvents';
import { eventsService } from '@/services/events/eventsService';

interface UseHomeEventsParams {
  searchTerm: string;
}

interface UseHomeEventsReturn {
  events: Event[];
  isLoading: boolean;
  isRefreshing: boolean;
  isLoadingMore: boolean;
  error: Error | null;
  hasMore: boolean;
  loadEvents: () => Promise<void>;
  refreshEvents: () => Promise<void>;
  loadMoreEvents: () => Promise<void>;
  handleShare: (eventId: string) => void;
}

const ITEMS_PER_PAGE = 10;

export const useHomeEvents = ({
  searchTerm,
}: UseHomeEventsParams): UseHomeEventsReturn => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const isLoadingRef = useRef(false);
  const searchTermRef = useRef(searchTerm);

  searchTermRef.current = searchTerm;

  const buildFilters = useCallback((): EventsFilter => {
    const nowISOString = new Date().toISOString();

    return {
      search: searchTermRef.current || undefined,
      startDateFrom: nowISOString,
      status: ['PUBLISHED'],
      hasAvailableSpots: true,
      limit: ITEMS_PER_PAGE,
      sortBy: 'date',
      sortOrder: 'asc',
    };
  }, []);

  const loadEvents = useCallback(async () => {
    if (isLoadingRef.current) return;

    try {
      isLoadingRef.current = true;
      setIsLoading(true);
      setError(null);

      const filters = buildFilters();
      const response = await eventsService.getFeedEvents(1, filters);

      const currentDate = new Date();
      const futureEvents = response.data.filter(event => {
        const eventStartDate = new Date(event.startDate);
        return eventStartDate > currentDate && event.status === 'PUBLISHED';
      });

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
  }, [buildFilters]);

  const loadMoreEvents = useCallback(async () => {
    if (isLoadingMore || !hasMore || isLoadingRef.current) return;

    try {
      setIsLoadingMore(true);
      const nextPage = currentPage + 1;
      const filters = buildFilters();

      const response = await eventsService.getFeedEvents(nextPage, filters);

      const currentDate = new Date();
      const futureEvents = response.data.filter(event => {
        const eventStartDate = new Date(event.startDate);
        return eventStartDate > currentDate && event.status === 'PUBLISHED';
      });

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
  }, [currentPage, hasMore, isLoadingMore, buildFilters]);

  const refreshEvents = useCallback(async () => {
    if (isLoadingRef.current) return;

    try {
      isLoadingRef.current = true;
      setIsRefreshing(true);
      setError(null);

      const filters = buildFilters();
      const response = await eventsService.getFeedEvents(1, filters);

      const currentDate = new Date();
      const futureEvents = response.data.filter(event => {
        const eventStartDate = new Date(event.startDate);
        return eventStartDate > currentDate && event.status === 'PUBLISHED';
      });

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
  }, [buildFilters]);

  const handleShare = useCallback((eventId: string) => {
    void eventId;
  }, []);

  useEffect(() => {
    loadEvents();
  }, [searchTerm, loadEvents]);

  return {
    events,
    isLoading,
    isRefreshing,
    isLoadingMore,
    error,
    hasMore,
    loadEvents,
    refreshEvents,
    loadMoreEvents,
    handleShare,
  };
};
