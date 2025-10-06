import { useState, useCallback } from 'react';
import { eventsService } from '@/services/events/eventsService';

export interface UseEventJoinActionsReturn {
  isJoinLoading: boolean;
  currentJoinEventId: string | null;
  handleJoinEvent: (eventId: string) => Promise<void>;
  handleRequestJoin: (eventId: string) => Promise<void>;
}

export const useEventJoinActions = (
  onRefreshEvents?: () => void
): UseEventJoinActionsReturn => {
  const [isJoinLoading, setIsJoinLoading] = useState(false);
  const [currentJoinEventId, setCurrentJoinEventId] = useState<string | null>(
    null
  );

  const handleJoinEvent = useCallback(
    async (eventId: string) => {
      setIsJoinLoading(true);
      setCurrentJoinEventId(eventId);

      try {
        await eventsService.joinEvent(eventId);
        onRefreshEvents?.();
      } finally {
        setIsJoinLoading(false);
        setCurrentJoinEventId(null);
      }
    },
    [onRefreshEvents]
  );

  const handleRequestJoin = useCallback(
    async (eventId: string) => {
      setIsJoinLoading(true);
      setCurrentJoinEventId(eventId);

      try {
        await eventsService.requestJoin(eventId);
        onRefreshEvents?.();
      } finally {
        setIsJoinLoading(false);
        setCurrentJoinEventId(null);
      }
    },
    [onRefreshEvents]
  );

  return {
    isJoinLoading,
    currentJoinEventId,
    handleJoinEvent,
    handleRequestJoin,
  };
};
