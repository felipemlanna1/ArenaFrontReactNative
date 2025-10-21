import { useMemo } from 'react';
import { Event, UserEventStatus } from '@/services/events/typesEvents';
import { UseEventDetailsStatusReturn } from '../typesEventDetailsScreen';

interface UseEventDetailsStatusParams {
  event: Event | null;
  currentUserId?: string;
}

export const useEventDetailsStatus = ({
  event,
  currentUserId,
}: UseEventDetailsStatusParams): UseEventDetailsStatusReturn => {
  const status = useMemo(() => {
    if (!event) {
      return {
        userEventStatus: 'NONE' as UserEventStatus,
        canJoin: false,
        isFull: false,
        isOwner: false,
        isOrganizer: false,
        isParticipant: false,
        isPending: false,
        isInvited: false,
        hasStarted: false,
        hasEnded: false,
        showCheckIn: false,
        availableSpots: 0,
        spotsProgress: 0,
      };
    }

    const userEventStatus =
      event.userEventStatus || ('NONE' as UserEventStatus);

    const isOwner =
      userEventStatus === 'ORGANIZER' ||
      userEventStatus === 'ADMIN' ||
      (currentUserId !== undefined && currentUserId === event.organizerId);
    const isOrganizer = isOwner;
    const isParticipant = userEventStatus === 'PARTICIPANT';
    const isPending = userEventStatus === 'PENDING_REQUEST';
    const isInvited = userEventStatus === 'INVITED';

    const availableSpots =
      event.availableSpots !== undefined && event.availableSpots !== null
        ? event.availableSpots
        : event.maxParticipants - (event.currentParticipants || 0);
    const isFull = availableSpots <= 0;
    const canJoin =
      !isParticipant &&
      !isPending &&
      !isInvited &&
      !isFull &&
      event.privacy === 'PUBLIC';

    const now = new Date();
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);
    const hasStarted = now >= startDate;
    const hasEnded = now >= endDate;

    const showCheckIn =
      isParticipant && hasStarted && !hasEnded && !event.hasCheckedIn;

    const spotsProgress =
      event.maxParticipants > 0
        ? Math.round(
            ((event.currentParticipants || 0) / event.maxParticipants) * 100
          )
        : 0;

    return {
      userEventStatus,
      canJoin,
      isFull,
      isOwner,
      isOrganizer,
      isParticipant,
      isPending,
      isInvited,
      hasStarted,
      hasEnded,
      showCheckIn,
      availableSpots,
      spotsProgress,
    };
  }, [event, currentUserId]);

  return status;
};
