import { useState, useCallback } from 'react';
import { eventsService } from '@/services/events/eventsService';
import { useAlert } from '@/contexts/AlertContext';

export interface UseEventParticipationActionsReturn {
  isParticipationLoading: boolean;
  currentParticipationEventId: string | null;
  handleCancelParticipation: (eventId: string) => Promise<void>;
  handleUndoRequest: (eventId: string) => Promise<void>;
}

export const useEventParticipationActions = (
  onRefreshEvents?: () => void
): UseEventParticipationActionsReturn => {
  const { showConfirm } = useAlert();
  const [isParticipationLoading, setIsParticipationLoading] = useState(false);
  const [currentParticipationEventId, setCurrentParticipationEventId] =
    useState<string | null>(null);

  const handleCancelParticipation = useCallback(
    async (eventId: string) => {
      showConfirm({
        title: 'Cancelar Participação',
        message:
          'Tem certeza que deseja cancelar sua participação neste evento?',
        confirmText: 'Confirmar',
        cancelText: 'Cancelar',
        variant: 'warning',
        destructive: true,
        onConfirm: async () => {
          setIsParticipationLoading(true);
          setCurrentParticipationEventId(eventId);

          try {
            await eventsService.leaveEvent(eventId);
            onRefreshEvents?.();
          } finally {
            setIsParticipationLoading(false);
            setCurrentParticipationEventId(null);
          }
        },
        onCancel: () => {},
      });
    },
    [onRefreshEvents, showConfirm]
  );

  const handleUndoRequest = useCallback(
    async (eventId: string) => {
      showConfirm({
        title: 'Desfazer Solicitação',
        message:
          'Tem certeza que deseja desfazer sua solicitação de entrada neste evento?',
        confirmText: 'Confirmar',
        cancelText: 'Cancelar',
        variant: 'warning',
        destructive: true,
        onConfirm: async () => {
          setIsParticipationLoading(true);
          setCurrentParticipationEventId(eventId);

          try {
            await eventsService.cancelRequest(eventId);
            onRefreshEvents?.();
          } finally {
            setIsParticipationLoading(false);
            setCurrentParticipationEventId(null);
          }
        },
        onCancel: () => {},
      });
    },
    [onRefreshEvents, showConfirm]
  );

  return {
    isParticipationLoading,
    currentParticipationEventId,
    handleCancelParticipation,
    handleUndoRequest,
  };
};
