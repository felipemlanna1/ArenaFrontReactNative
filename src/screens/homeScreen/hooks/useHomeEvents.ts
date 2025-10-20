import { useState, useCallback, useRef } from 'react';
import { Share } from 'react-native';
import { Event, EventsFilter } from '@/services/events/typesEvents';
import { eventsService } from '@/services/events/eventsService';
import { useAlert } from '@/contexts/AlertContext';
import { useHomeFilters } from '@/contexts/HomeFiltersContext';

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
  const hasShownNoCityEventsAlertRef = useRef(false);
  const lastCheckedCityRef = useRef<string | undefined>(undefined);
  const isHandlingNoCityEventsRef = useRef(false);
  const { showConfirm } = useAlert();
  const { clearCityFilter } = useHomeFilters();

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

    if (filters.city !== lastCheckedCityRef.current) {
      hasShownNoCityEventsAlertRef.current = false;
      lastCheckedCityRef.current = filters.city;
      isHandlingNoCityEventsRef.current = false;
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

      if (
        futureEvents.length === 0 &&
        filters.city &&
        !hasShownNoCityEventsAlertRef.current &&
        !isHandlingNoCityEventsRef.current
      ) {
        hasShownNoCityEventsAlertRef.current = true;
        isHandlingNoCityEventsRef.current = true;
        setEvents([]);
        setCurrentPage(1);
        setHasMore(false);

        showConfirm({
          title: 'Nenhum evento encontrado',
          message: `Não encontramos eventos em ${filters.city}. Deseja buscar em outras cidades?`,
          confirmText: 'Buscar em Todas',
          cancelText: 'Manter Filtro',
          onConfirm: async () => {
            try {
              clearCityFilter();
              hasShownNoCityEventsAlertRef.current = false;
              isHandlingNoCityEventsRef.current = false;
            } catch (error) {
              isHandlingNoCityEventsRef.current = false;
              setError(
                error instanceof Error
                  ? error
                  : new Error('Erro ao buscar eventos')
              );
            }
          },
          onCancel: () => {
            isHandlingNoCityEventsRef.current = false;
            setEvents([]);
            setCurrentPage(1);
            setHasMore(false);
          },
        });
      } else {
        setEvents(futureEvents);
        setCurrentPage(1);
        setHasMore(response.pagination.hasMore);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Erro ao carregar eventos')
      );
    } finally {
      setIsLoading(false);
      isLoadingRef.current = false;
    }
  }, [filterFutureEvents, showConfirm, clearCityFilter]);

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
          console.log('Share cancelled or error:', error);
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
