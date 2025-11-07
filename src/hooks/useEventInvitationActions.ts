import { useState, useCallback } from 'react';
import { eventsService } from '@/services/events/eventsService';
import { useAlert } from '@/contexts/AlertContext';
import {
  getInvitationAcceptErrorMessage,
  getInvitationRejectErrorMessage,
} from '@/utils/inviteErrors';

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
  const { showConfirm, showError, showSuccess } = useAlert();
  const [isInvitationLoading, setIsInvitationLoading] = useState(false);
  const [currentInvitationEventId, setCurrentInvitationEventId] = useState<
    string | null
  >(null);

  const handleAcceptInvitation = useCallback(
    async (eventId: string, invitationId?: string) => {
      setIsInvitationLoading(true);
      setCurrentInvitationEventId(eventId);

      try {
        if (invitationId) {
          await eventsService.acceptInvitation(eventId, invitationId);
        } else {
          await eventsService.acceptInvitationByEventId(eventId);
        }
        showSuccess('Convite aceito com sucesso!');
        onRefreshEvents?.();
      } catch (error) {
        const errorMessage = getInvitationAcceptErrorMessage(error);
        showError(errorMessage);
      } finally {
        setIsInvitationLoading(false);
        setCurrentInvitationEventId(null);
      }
    },
    [onRefreshEvents, showSuccess, showError]
  );

  const handleRejectInvitation = useCallback(
    async (eventId: string, invitationId?: string) => {
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
            if (invitationId) {
              await eventsService.rejectInvitation(eventId, invitationId);
            } else {
              await eventsService.rejectInvitationByEventId(eventId);
            }
            showSuccess('Convite recusado.');
            onRefreshEvents?.();
          } catch (error) {
            const errorMessage = getInvitationRejectErrorMessage(error);
            showError(errorMessage);
          } finally {
            setIsInvitationLoading(false);
            setCurrentInvitationEventId(null);
          }
        },
        onCancel: () => {},
      });
    },
    [onRefreshEvents, showConfirm, showSuccess, showError]
  );

  return {
    isInvitationLoading,
    currentInvitationEventId,
    handleAcceptInvitation,
    handleRejectInvitation,
  };
};
