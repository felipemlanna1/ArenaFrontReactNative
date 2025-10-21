import { useState, useCallback, useRef } from 'react';
import { Share } from 'react-native';
import { Event, EventsFilter } from '@/services/events/typesEvents';
import { eventsService } from '@/services/events/eventsService';
import { EventFilterType } from '../typesMyEventsScreen';

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

  const buildApiFilters = useCallback(
    (filter: EventFilterType): EventsFilter => {
      const baseFilters: EventsFilter = {};

      if (filter === 'participating') {
        baseFilters.userEventStatus = ['PARTICIPANT'];
      } else if (filter === 'invited') {
        baseFilters.userEventStatus = ['INVITED'];
      } else if (filter === 'organizing') {
        baseFilters.userEventStatus = ['ORGANIZER', 'ADMIN'];
      } else {
        baseFilters.userEventStatus = [
          'ORGANIZER',
          'ADMIN',
          'PARTICIPANT',
          'INVITED',
        ];
      }

      return baseFilters;
    },
    []
  );

  const loadEvents = useCallback(async () => {
    if (isLoadingRef.current) {
      return;
    }

    try {
      isLoadingRef.current = true;
      setIsLoading(true);
      setError(null);

      const filters = buildApiFilters(eventFilterRef.current);
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
  }, [buildApiFilters]);

  const loadMoreEvents = useCallback(async () => {
    if (isLoadingMore || !hasMore || isLoadingRef.current) return;

    try {
      setIsLoadingMore(true);
      const nextPage = currentPage + 1;

      const filters = buildApiFilters(eventFilterRef.current);
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
  }, [currentPage, hasMore, isLoadingMore, buildApiFilters]);

  const refreshEvents = useCallback(async () => {
    if (isLoadingRef.current) return;

    try {
      isLoadingRef.current = true;
      setIsRefreshing(true);
      setError(null);

      const filters = buildApiFilters(eventFilterRef.current);
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
  }, [buildApiFilters]);

  const handleShare = useCallback(
    async (eventId: string) => {
      const event = events.find(e => e.id === eventId);
      if (!event) return;

      try {
        const eventDate = new Date(event.startDate);
        const day = eventDate.getDate().toString().padStart(2, '0');
        const month = eventDate.getMonth() + 1;
        const monthNames = [
          'janeiro',
          'fevereiro',
          'março',
          'abril',
          'maio',
          'junho',
          'julho',
          'agosto',
          'setembro',
          'outubro',
          'novembro',
          'dezembro',
        ];
        const hours = eventDate.getHours().toString().padStart(2, '0');
        const minutes = eventDate.getMinutes().toString().padStart(2, '0');
        const formattedDate = `${day} de ${monthNames[month - 1]} às ${hours}:${minutes}`;

        const price = event.isFree
          ? 'Gratuito'
          : `R$ ${
              typeof event.price === 'number'
                ? event.price.toFixed(2)
                : event.price
            }`;

        const location = `${event.location.city}, ${event.location.state}`;

        const message = `🏃 ${event.sport.name}: ${event.title}

📅 ${formattedDate}
📍 ${location}
💰 ${price}
👥 ${event.currentParticipants}/${event.maxParticipants} participantes

${event.description ? `\n${event.description}\n` : ''}
Participe pelo app Arena! 🔥`;

        await Share.share({
          message,
          title: `Arena - ${event.title}`,
        });
      } catch (error) {
        if (__DEV__) {
          throw error;
        }
      }
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
