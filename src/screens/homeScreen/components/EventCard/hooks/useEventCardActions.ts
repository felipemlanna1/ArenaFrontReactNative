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

const isOrganizerOrAdmin = (status?: UserEventStatus): boolean => {
  return status === 'ORGANIZER' || status === 'ADMIN';
};

const isParticipant = (status?: UserEventStatus): boolean => {
  return status === 'PARTICIPANT';
};

const isInvited = (status?: UserEventStatus): boolean => {
  return status === 'INVITED';
};

const isRequested = (status?: UserEventStatus): boolean => {
  return status === 'REQUESTED';
};

const hasNoStatus = (status?: UserEventStatus): boolean => {
  return !status || status === 'NONE';
};

const createManageButton = (): ActionButton => ({
  key: 'action',
  label: 'GERENCIAR',
  variant: 'secondary',
  type: 'manage',
  testID: 'event-card-manage-button',
});

const createCancelButton = (): ActionButton => ({
  key: 'action',
  label: 'CANCELAR',
  variant: 'danger',
  type: 'cancel',
  testID: 'event-card-cancel-button',
});

const createAcceptButton = (): ActionButton => ({
  key: 'action',
  label: 'ACEITAR',
  variant: 'secondary',
  type: 'accept',
  testID: 'event-card-accept-button',
});

const createUndoButton = (): ActionButton => ({
  key: 'action',
  label: 'DESFAZER',
  variant: 'outline',
  type: 'undo',
  testID: 'event-card-undo-button',
});

const createJoinButton = (): ActionButton => ({
  key: 'action',
  label: 'PARTICIPAR',
  variant: 'primary',
  type: 'join',
  testID: 'event-card-join-button',
});

const createRequestButton = (): ActionButton => ({
  key: 'action',
  label: 'SOLICITAR',
  variant: 'secondary',
  type: 'request',
  testID: 'event-card-request-button',
});

const createRejectButton = (): ActionButton => ({
  key: 'secondary',
  label: 'RECUSAR',
  variant: 'outline',
  type: 'reject',
  testID: 'event-card-reject-button',
});

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
      variant: 'secondary',
      type: 'view',
      testID: 'event-card-view-button',
    }),
    []
  );

  const actionButton = useMemo((): ActionButton | null => {
    if (isOrganizerOrAdmin(userEventStatus)) {
      return createManageButton();
    }

    if (isParticipant(userEventStatus)) {
      return createCancelButton();
    }

    if (isInvited(userEventStatus)) {
      return createAcceptButton();
    }

    if (isRequested(userEventStatus)) {
      return createUndoButton();
    }

    if (hasNoStatus(userEventStatus)) {
      if (isEventFull) return null;

      if (privacy === 'PUBLIC') {
        return createJoinButton();
      }

      return createRequestButton();
    }

    return null;
  }, [userEventStatus, privacy, isEventFull]);

  const secondaryActionButton = useMemo((): ActionButton | null => {
    if (isInvited(userEventStatus)) {
      return createRejectButton();
    }

    return null;
  }, [userEventStatus]);

  return {
    viewButton,
    actionButton,
    secondaryActionButton,
  };
};
