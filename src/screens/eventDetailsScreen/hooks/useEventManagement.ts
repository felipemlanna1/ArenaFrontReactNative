import { useState, useCallback } from 'react';
import { eventsService } from '@/services/events/eventsService';
import { useToast } from '@/contexts/ToastContext';

interface UseEventManagementProps {
  eventId: string;
  onSuccess?: () => void;
}

interface UseEventManagementReturn {
  isManaging: boolean;
  managementError: Error | null;
  handleApprove: (participantId: string) => Promise<void>;
  handleReject: (participantId: string) => Promise<void>;
  handleRemove: (participantId: string) => Promise<void>;
  handleAddOwner: (userId: string) => Promise<void>;
  handleRemoveOwner: (ownerId: string) => Promise<void>;
  handleSendInvitations: (userIds: string[], message?: string) => Promise<void>;
  handleUpdateEvent: (
    data: Parameters<typeof eventsService.updateEvent>[1]
  ) => Promise<void>;
  handleDeleteEvent: () => Promise<void>;
}

export const useEventManagement = ({
  eventId,
  onSuccess,
}: UseEventManagementProps): UseEventManagementReturn => {
  const [isManaging, setIsManaging] = useState(false);
  const [managementError, setManagementError] = useState<Error | null>(null);
  const { showToast } = useToast();

  const handleManagementAction = useCallback(
    async (
      action: () => Promise<void>,
      successMessage: string,
      errorMessage: string
    ) => {
      setIsManaging(true);
      setManagementError(null);

      try {
        await action();
        showToast(successMessage, 'success');
        onSuccess?.();
      } catch (error) {
        const err = error instanceof Error ? error : new Error(errorMessage);
        setManagementError(err);
        showToast(err.message || errorMessage, 'error');
      } finally {
        setIsManaging(false);
      }
    },
    [onSuccess, showToast]
  );

  const handleApprove = useCallback(
    async (participantId: string) => {
      await handleManagementAction(
        () => eventsService.approveParticipant(eventId, participantId),
        'Participante aprovado com sucesso',
        'Erro ao aprovar participante'
      );
    },
    [eventId, handleManagementAction]
  );

  const handleReject = useCallback(
    async (participantId: string) => {
      await handleManagementAction(
        () => eventsService.rejectParticipant(eventId, participantId),
        'Solicitação rejeitada',
        'Erro ao rejeitar solicitação'
      );
    },
    [eventId, handleManagementAction]
  );

  const handleRemove = useCallback(
    async (participantId: string) => {
      await handleManagementAction(
        () => eventsService.removeParticipant(eventId, participantId),
        'Participante removido',
        'Erro ao remover participante'
      );
    },
    [eventId, handleManagementAction]
  );

  const handleAddOwner = useCallback(
    async (userId: string) => {
      await handleManagementAction(
        () => eventsService.addOwner(eventId, userId),
        'Administrador adicionado',
        'Erro ao adicionar administrador'
      );
    },
    [eventId, handleManagementAction]
  );

  const handleRemoveOwner = useCallback(
    async (ownerId: string) => {
      await handleManagementAction(
        () => eventsService.removeOwner(eventId, ownerId),
        'Administrador removido',
        'Erro ao remover administrador'
      );
    },
    [eventId, handleManagementAction]
  );

  const handleSendInvitations = useCallback(
    async (userIds: string[], message?: string) => {
      await handleManagementAction(
        () => eventsService.inviteParticipants(eventId, userIds, message),
        'Convites enviados',
        'Erro ao enviar convites'
      );
    },
    [eventId, handleManagementAction]
  );

  const handleUpdateEvent = useCallback(
    async (data: Parameters<typeof eventsService.updateEvent>[1]) => {
      await handleManagementAction(
        async () => {
          await eventsService.updateEvent(eventId, data);
        },
        'Evento atualizado',
        'Erro ao atualizar evento'
      );
    },
    [eventId, handleManagementAction]
  );

  const handleDeleteEvent = useCallback(async () => {
    await handleManagementAction(
      () => eventsService.deleteEvent(eventId),
      'Evento excluído',
      'Erro ao excluir evento'
    );
  }, [eventId, handleManagementAction]);

  return {
    isManaging,
    managementError,
    handleApprove,
    handleReject,
    handleRemove,
    handleAddOwner,
    handleRemoveOwner,
    handleSendInvitations,
    handleUpdateEvent,
    handleDeleteEvent,
  };
};
