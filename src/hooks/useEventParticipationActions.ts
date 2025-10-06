import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { eventsService } from '@/services/events/eventsService';

export interface UseEventParticipationActionsReturn {
  isParticipationLoading: boolean;
  currentParticipationEventId: string | null;
  handleCancelParticipation: (eventId: string) => Promise<void>;
  handleUndoRequest: (eventId: string) => Promise<void>;
}

export const useEventParticipationActions = (
  onRefreshEvents?: () => void
): UseEventParticipationActionsReturn => {
  const [isParticipationLoading, setIsParticipationLoading] = useState(false);
  const [currentParticipationEventId, setCurrentParticipationEventId] =
    useState<string | null>(null);

  const handleCancelParticipation = useCallback(
    async (eventId: string) => {
      Alert.alert(
        'Cancelar Participação',
        'Tem certeza que deseja cancelar sua participação neste evento?',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Confirmar',
            style: 'destructive',
            onPress: async () => {
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
          },
        ]
      );
    },
    [onRefreshEvents]
  );

  const handleUndoRequest = useCallback(
    async (eventId: string) => {
      Alert.alert(
        'Desfazer Solicitação',
        'Tem certeza que deseja desfazer sua solicitação de entrada neste evento?',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Confirmar',
            style: 'destructive',
            onPress: async () => {
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
          },
        ]
      );
    },
    [onRefreshEvents]
  );

  return {
    isParticipationLoading,
    currentParticipationEventId,
    handleCancelParticipation,
    handleUndoRequest,
  };
};
