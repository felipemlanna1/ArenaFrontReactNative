import { useEventJoinActions } from './useEventJoinActions';
import { useEventInvitationActions } from './useEventInvitationActions';
import { useEventParticipationActions } from './useEventParticipationActions';

export interface UseEventActionsReturn {
  isActionLoading: boolean;
  currentActionEventId: string | null;
  handleJoinEvent: (eventId: string) => Promise<void>;
  handleRequestJoin: (eventId: string) => Promise<void>;
  handleAcceptInvitation: (
    eventId: string,
    invitationId?: string
  ) => Promise<void>;
  handleRejectInvitation: (
    eventId: string,
    invitationId?: string
  ) => Promise<void>;
  handleCancelParticipation: (eventId: string) => Promise<void>;
  handleUndoRequest: (eventId: string) => Promise<void>;
}

export const useEventActions = (
  onRefreshEvents?: () => void
): UseEventActionsReturn => {
  const joinActions = useEventJoinActions(onRefreshEvents);
  const invitationActions = useEventInvitationActions(onRefreshEvents);
  const participationActions = useEventParticipationActions(onRefreshEvents);

  const isActionLoading =
    joinActions.isJoinLoading ||
    invitationActions.isInvitationLoading ||
    participationActions.isParticipationLoading;

  const currentActionEventId =
    joinActions.currentJoinEventId ||
    invitationActions.currentInvitationEventId ||
    participationActions.currentParticipationEventId;

  return {
    isActionLoading,
    currentActionEventId,
    handleJoinEvent: joinActions.handleJoinEvent,
    handleRequestJoin: joinActions.handleRequestJoin,
    handleAcceptInvitation: invitationActions.handleAcceptInvitation,
    handleRejectInvitation: invitationActions.handleRejectInvitation,
    handleCancelParticipation: participationActions.handleCancelParticipation,
    handleUndoRequest: participationActions.handleUndoRequest,
  };
};
