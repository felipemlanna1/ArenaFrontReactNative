import { useState, useCallback, useRef } from 'react';
import { Event } from '@/services/events/typesEvents';
import { eventsService } from '@/services/events/eventsService';
import { EventFilterType } from '../typesMyEventsScreen';
import { buildMyEventsFilters } from '../utils/buildMyEventsFilters';
import { shareEvent } from '../utils/eventShare';

interface UseMyEventsParams {
  eventFilter: EventFilterType;
}

interface UseMyEventsReturn {
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

export const useMyEvents = ({
  eventFilter,
}: UseMyEventsParams): UseMyEventsReturn => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const isLoadingRef = useRef(false);
  const eventFilterRef = useRef(eventFilter);

  eventFilterRef.current = eventFilter;

  const loadEvents = useCallback(async () => {
    if (isLoadingRef.current) {
      return;
    }

    try {
      isLoadingRef.current = true;
      setIsLoading(true);
      setError(null);

      const filters = buildMyEventsFilters(eventFilterRef.current);
      const response = await eventsService.getFeedEvents(1, filters);

      setEvents(response.data);
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
  }, []);

  const loadMoreEvents = useCallback(async () => {
    if (isLoadingMore || !hasMore || isLoadingRef.current) return;

    try {
      setIsLoadingMore(true);
      const nextPage = currentPage + 1;

      const filters = buildMyEventsFilters(eventFilterRef.current);
      const response = await eventsService.getFeedEvents(nextPage, filters);

      setEvents(prev => [...prev, ...response.data]);
      setCurrentPage(nextPage);
      setHasMore(response.pagination.hasMore);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Erro ao carregar mais eventos')
      );
    } finally {
      setIsLoadingMore(false);
    }
  }, [currentPage, hasMore, isLoadingMore]);

  const refreshEvents = useCallback(async () => {
    if (isLoadingRef.current) return;

    try {
      isLoadingRef.current = true;
      setIsRefreshing(true);
      setError(null);

      const filters = buildMyEventsFilters(eventFilterRef.current);
      const response = await eventsService.getFeedEvents(1, filters);

      setEvents(response.data);
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
  }, []);

  const handleShare = useCallback(
    async (eventId: string) => {
      const event = events.find(e => e.id === eventId);
      if (!event) return;

      await shareEvent(event);
    },
    [events]
  );

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
