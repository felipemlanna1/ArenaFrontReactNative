import { useState, useCallback } from 'react';
import { eventsService } from '@/services/events/eventsService';
import { useAlert } from '@/contexts/AlertContext';

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
  const { showConfirm } = useAlert();
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

      showConfirm({
        title: 'Recusar Convite',
        message: 'Tem certeza que deseja recusar este convite?',
        confirmText: 'Recusar',
        cancelText: 'Cancelar',
        variant: 'warning',
        destructive: true,
        onConfirm: async () => {
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
        onCancel: () => {},
      });
    },
    [onRefreshEvents, showConfirm]
  );

  return {
    isInvitationLoading,
    currentInvitationEventId,
    handleAcceptInvitation,
    handleRejectInvitation,
  };
};
