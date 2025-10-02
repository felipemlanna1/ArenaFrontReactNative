import { useMemo } from 'react';
import { UserEventStatus, EventPrivacy } from '@/services/events/typesEvents';

interface UseEventCardActionsProps {
  userEventStatus?: UserEventStatus;
  privacy: EventPrivacy;
  currentParticipants: number;
  maxParticipants: number;
}

export interface ActionButton {
  key: 'view' | 'action';
  label: string;
  variant: 'primary' | 'secondary';
  testID: string;
}

interface UseEventCardActionsReturn {
  viewButton: ActionButton;
  actionButton: ActionButton | null;
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
      testID: 'event-card-view-button',
    }),
    []
  );

  const actionButton = useMemo((): ActionButton | null => {
    if (!userEventStatus || userEventStatus === 'REQUESTED') {
      if (isEventFull) return null;

      if (privacy === 'PUBLIC') {
        return {
          key: 'action',
          label: 'PARTICIPAR',
          variant: 'secondary',
          testID: 'event-card-join-button',
        };
      }

      return null;
    }

    switch (userEventStatus) {
      case 'ORGANIZER':
      case 'ADMIN':
        return {
          key: 'action',
          label: 'GERENCIAR',
          variant: 'secondary',
          testID: 'event-card-manage-button',
        };

      case 'PARTICIPANT':
        return {
          key: 'action',
          label: 'PARTICIPAR',
          variant: 'secondary',
          testID: 'event-card-participate-button',
        };

      case 'INVITED':
        return {
          key: 'action',
          label: 'ACEITAR',
          variant: 'secondary',
          testID: 'event-card-accept-button',
        };

      default:
        return null;
    }
  }, [userEventStatus, privacy, isEventFull]);

  return {
    viewButton,
    actionButton,
  };
};
