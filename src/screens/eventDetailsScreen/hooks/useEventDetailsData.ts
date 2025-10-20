import { useState, useCallback, useEffect } from 'react';
import { eventsService } from '@/services/events/eventsService';
import { Event } from '@/services/events/typesEvents';
import { UseEventDetailsDataReturn } from '../typesEventDetailsScreen';

interface UseEventDetailsDataParams {
  eventId: string;
}

export const useEventDetailsData = ({
  eventId,
}: UseEventDetailsDataParams): UseEventDetailsDataReturn => {
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchEventDetails = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const eventData = await eventsService.getEventDetails(eventId);
      setEvent(eventData);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err : new Error('Failed to fetch event details');
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [eventId]);

  const refresh = useCallback(async () => {
    await fetchEventDetails();
  }, [fetchEventDetails]);

  useEffect(() => {
    if (eventId) {
      fetchEventDetails();
    }
  }, [eventId, fetchEventDetails]);

  return {
    event,
    isLoading,
    error,
    refresh,
  };
};
