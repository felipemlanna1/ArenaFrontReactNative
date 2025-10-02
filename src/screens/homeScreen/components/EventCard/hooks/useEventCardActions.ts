import { useMemo } from 'react';
import { UserEventStatus, EventPrivacy } from '@/services/events/typesEvents';

interface UseEventCardActionsProps {
  userEventStatus?: UserEventStatus;
  privacy: EventPrivacy;
  currentParticipants: number;
  maxParticipants: number;
}

export interface ActionButton {
  key: 'view' | 'action' | 'secondary';
  label: string;
  variant: 'primary' | 'secondary' | 'outline' | 'danger';
  type:
    | 'view'
    | 'manage'
    | 'cancel'
    | 'accept'
    | 'reject'
    | 'undo'
    | 'join'
    | 'request';
  testID: string;
}

interface UseEventCardActionsReturn {
  viewButton: ActionButton;
  actionButton: ActionButton | null;
  secondaryActionButton: ActionButton | null;
}

export const useEventCardActions = ({
  userEventStatus,
  privacy,
  currentParticipants,
  maxParticipants,
}: UseEventCardActionsProps): UseEventCardActionsReturn => {
  const isEventFull = useMemo(
    () => currentParticipants >= maxParticipants,
    [currentParticipants, maxParticipants]
  );

  const viewButton: ActionButton = useMemo(
    () => ({
      key: 'view',
      label: 'VER',
      variant: 'primary',
      type: 'view',
      testID: 'event-card-view-button',
    }),
    []
  );

  const actionButton = useMemo((): ActionButton | null => {
    // ORGANIZER ou ADMIN = Gerenciar
    if (userEventStatus === 'ORGANIZER' || userEventStatus === 'ADMIN') {
      return {
        key: 'action',
        label: 'GERENCIAR',
        variant: 'secondary',
        type: 'manage',
        testID: 'event-card-manage-button',
      };
    }

    // PARTICIPANT = Cancelar Participação
    if (userEventStatus === 'PARTICIPANT') {
      return {
        key: 'action',
        label: 'CANCELAR',
        variant: 'danger',
        type: 'cancel',
        testID: 'event-card-cancel-button',
      };
    }

    // INVITED = Aceitar Convite (botão principal)
    if (userEventStatus === 'INVITED') {
      return {
        key: 'action',
        label: 'ACEITAR',
        variant: 'secondary',
        type: 'accept',
        testID: 'event-card-accept-button',
      };
    }

    // REQUESTED = Desfazer Solicitação
    if (userEventStatus === 'REQUESTED') {
      return {
        key: 'action',
        label: 'DESFAZER',
        variant: 'outline',
        type: 'undo',
        testID: 'event-card-undo-button',
      };
    }

    // NONE ou sem status
    if (!userEventStatus) {
      // Se evento lotado, não mostra botão de ação
      if (isEventFull) return null;

      // PUBLIC = Participar direto
      if (privacy === 'PUBLIC') {
        return {
          key: 'action',
          label: 'PARTICIPAR',
          variant: 'secondary',
          type: 'join',
          testID: 'event-card-join-button',
        };
      }

      // PRIVATE ou FRIENDS_ONLY não permite participação direta
      return null;
    }

    return null;
  }, [userEventStatus, privacy, isEventFull]);

  const secondaryActionButton = useMemo((): ActionButton | null => {
    // Apenas INVITED tem botão secundário (Recusar)
    if (userEventStatus === 'INVITED') {
      return {
        key: 'secondary',
        label: 'RECUSAR',
        variant: 'outline',
        type: 'reject',
        testID: 'event-card-reject-button',
      };
    }

    return null;
  }, [userEventStatus]);

  return {
    viewButton,
    actionButton,
    secondaryActionButton,
  };
};
