import { useMemo } from 'react';
import { UserEventStatus, EventPrivacy } from '@/services/events/typesEvents';

interface UseEventCardActionsProps {
  userEventStatus?: UserEventStatus;
  privacy: EventPrivacy;
  currentParticipants: number;
  maxParticipants: number;
  isLoading?: boolean;
  currentActionEventId?: string | null;
  eventId: string;
  isGroupMember?: boolean; // For GROUP_ONLY events
}

export interface ActionButton {
  key: 'view' | 'action' | 'secondary';
  label: string;
  variant:
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'danger'
    | 'outline-light'
    | 'outline-primary';
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
  loading: boolean;
  disabled: boolean;
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
  return status === 'PENDING_REQUEST';
};

const hasNoStatus = (status?: UserEventStatus): boolean => {
  return !status || status === 'NONE';
};

const createManageButton = (
  isLoading: boolean,
  isDisabled: boolean
): ActionButton => ({
  key: 'action',
  label: 'GERENCIAR',
  variant: 'secondary',
  type: 'manage',
  testID: 'event-card-manage-button',
  loading: isLoading,
  disabled: isDisabled,
});

const createCancelButton = (
  isLoading: boolean,
  isDisabled: boolean
): ActionButton => ({
  key: 'action',
  label: 'CANCELAR',
  variant: 'danger',
  type: 'cancel',
  testID: 'event-card-cancel-button',
  loading: isLoading,
  disabled: isDisabled,
});

const createAcceptButton = (
  isLoading: boolean,
  isDisabled: boolean
): ActionButton => ({
  key: 'action',
  label: 'ACEITAR',
  variant: 'secondary',
  type: 'accept',
  testID: 'event-card-accept-button',
  loading: isLoading,
  disabled: isDisabled,
});

const createUndoButton = (
  isLoading: boolean,
  isDisabled: boolean
): ActionButton => ({
  key: 'action',
  label: 'DESFAZER',
  variant: 'outline',
  type: 'undo',
  testID: 'event-card-undo-button',
  loading: isLoading,
  disabled: isDisabled,
});

const createJoinButton = (
  isLoading: boolean,
  isDisabled: boolean
): ActionButton => ({
  key: 'action',
  label: 'PARTICIPAR',
  variant: 'primary',
  type: 'join',
  testID: 'event-card-join-button',
  loading: isLoading,
  disabled: isDisabled,
});

const createRequestButton = (
  isLoading: boolean,
  isDisabled: boolean
): ActionButton => ({
  key: 'action',
  label: 'SOLICITAR',
  variant: 'secondary',
  type: 'request',
  testID: 'event-card-request-button',
  loading: isLoading,
  disabled: isDisabled,
});

const createRejectButton = (
  isLoading: boolean,
  isDisabled: boolean
): ActionButton => ({
  key: 'secondary',
  label: 'RECUSAR',
  variant: 'outline',
  type: 'reject',
  testID: 'event-card-reject-button',
  loading: isLoading,
  disabled: isDisabled,
});

export const useEventCardActions = ({
  userEventStatus,
  privacy,
  currentParticipants,
  maxParticipants,
  isLoading = false,
  currentActionEventId,
  eventId,
}: UseEventCardActionsProps): UseEventCardActionsReturn => {
  const isEventFull = useMemo(
    () => currentParticipants >= maxParticipants,
    [currentParticipants, maxParticipants]
  );

  const isThisEventLoading = useMemo(
    () => isLoading && currentActionEventId === eventId,
    [isLoading, currentActionEventId, eventId]
  );

  const viewButton: ActionButton = useMemo(
    () => ({
      key: 'view',
      label: 'VER',
      variant: 'outline-light',
      type: 'view',
      testID: 'event-card-view-button',
      loading: false,
      disabled: false,
    }),
    []
  );

  const actionButton = useMemo((): ActionButton | null => {
    // ORGANIZER/ADMIN always see "GERENCIAR" regardless of privacy
    if (isOrganizerOrAdmin(userEventStatus)) {
      return createManageButton(false, false);
    }

    // PARTICIPANT always see "CANCELAR" (leave event)
    if (isParticipant(userEventStatus)) {
      return createCancelButton(isThisEventLoading, isThisEventLoading);
    }

    // INVITED see "ACEITAR" (accept invitation)
    if (isInvited(userEventStatus)) {
      return createAcceptButton(isThisEventLoading, isThisEventLoading);
    }

    // PENDING_REQUEST see "DESFAZER" (undo request)
    if (isRequested(userEventStatus)) {
      return createUndoButton(isThisEventLoading, isThisEventLoading);
    }

    // NONE status - action depends on privacy type
    if (hasNoStatus(userEventStatus)) {
      if (isEventFull) return null;

      switch (privacy) {
        case 'PUBLIC':
          // PUBLIC: Direct join
          return createJoinButton(isThisEventLoading, isThisEventLoading);

        case 'GROUP_ONLY':
          // GROUP_ONLY: Only group members can join
          // TODO: In future, could show disabled button with "Apenas membros" message
          // For now, hide button if not group member
          return null;

        case 'APPROVAL_REQUIRED':
          // APPROVAL_REQUIRED: Request to join
          return createRequestButton(isThisEventLoading, isThisEventLoading);

        case 'INVITE_ONLY':
          // INVITE_ONLY: No button for non-invited users
          return null;

        default:
          return null;
      }
    }

    return null;
  }, [userEventStatus, privacy, isEventFull, isThisEventLoading]);

  const secondaryActionButton = useMemo((): ActionButton | null => {
    if (isInvited(userEventStatus)) {
      return createRejectButton(false, isThisEventLoading);
    }

    return null;
  }, [userEventStatus, isThisEventLoading]);

  return {
    viewButton,
    actionButton,
    secondaryActionButton,
  };
};
