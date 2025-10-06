import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { eventsService } from '@/services/events/eventsService';

export interface UseEventInvitationActionsReturn {
  isInvitationLoading: boolean;
  currentInvitationEventId: string | null;
  handleAcceptInvitation: (
    eventId: string,
    invitationId?: string
  ) => Promise<void>;
  handleRejectInvitation: (
    eventId: string,
    invitationId?: string
  ) => Promise<void>;
}

export const useEventInvitationActions = (
  onRefreshEvents?: () => void
): UseEventInvitationActionsReturn => {
  const [isInvitationLoading, setIsInvitationLoading] = useState(false);
  const [currentInvitationEventId, setCurrentInvitationEventId] = useState<
    string | null
  >(null);

  const handleAcceptInvitation = useCallback(
    async (eventId: string, invitationId?: string) => {
      if (!invitationId) {
        return;
      }

      setIsInvitationLoading(true);
      setCurrentInvitationEventId(eventId);

      try {
        await eventsService.acceptInvitation(eventId, invitationId);
        onRefreshEvents?.();
      } finally {
        setIsInvitationLoading(false);
        setCurrentInvitationEventId(null);
      }
    },
    [onRefreshEvents]
  );

  const handleRejectInvitation = useCallback(
    async (eventId: string, invitationId?: string) => {
      if (!invitationId) {
        return;
      }

      Alert.alert(
        'Recusar Convite',
        'Tem certeza que deseja recusar este convite?',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Recusar',
            style: 'destructive',
            onPress: async () => {
              setIsInvitationLoading(true);
              setCurrentInvitationEventId(eventId);

              try {
                await eventsService.rejectInvitation(eventId, invitationId);
                onRefreshEvents?.();
              } finally {
                setIsInvitationLoading(false);
                setCurrentInvitationEventId(null);
              }
            },
          },
        ]
      );
    },
    [onRefreshEvents]
  );

  return {
    isInvitationLoading,
    currentInvitationEventId,
    handleAcceptInvitation,
    handleRejectInvitation,
  };
};
