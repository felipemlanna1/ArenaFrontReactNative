import { useMemo } from 'react';
import { useEventDetailsData } from './hooks/useEventDetailsData';
import { useEventDetailsStatus } from './hooks/useEventDetailsStatus';
import { useEventDetailsActions } from './hooks/useEventDetailsActions';
import {
  UseEventDetailsScreenReturn,
  EventActionButtonState,
  EventDetailsScreenProps,
} from './typesEventDetailsScreen';

interface UseEventDetailsScreenParams {
  eventId: string;
  navigation: EventDetailsScreenProps['navigation'];
  currentUserId?: string;
}

export const useEventDetailsScreen = ({
  eventId,
  navigation,
  currentUserId,
}: UseEventDetailsScreenParams): UseEventDetailsScreenReturn => {
  const { event, isLoading, error, refresh } = useEventDetailsData({
    eventId,
  });

  const status = useEventDetailsStatus({
    event,
    currentUserId,
  });

  const { userActions, managementActions, shareActions, isPerformingAction } =
    useEventDetailsActions({
      event,
      status,
      onRefresh: refresh,
      navigation,
    });

  const actionButtonState: EventActionButtonState = useMemo(() => {
    if (status.hasEnded) {
      return {
        type: 'ended',
        label: 'Evento Encerrado',
        variant: 'subtle',
        disabled: true,
        loading: false,
        onPress: () => {},
      };
    }

    if (status.showCheckIn) {
      return {
        type: 'check-in',
        label: 'Fazer Check-in',
        variant: 'success',
        disabled: false,
        loading: isPerformingAction,
        onPress: userActions.onCheckIn,
      };
    }

    if (status.isParticipant) {
      return {
        type: 'leave',
        label: 'Sair do Evento',
        variant: 'destructive',
        disabled: false,
        loading: isPerformingAction,
        onPress: userActions.onLeave,
      };
    }

    if (status.isPending) {
      return {
        type: 'cancel-request',
        label: 'Cancelar Solicitação',
        variant: 'secondary',
        disabled: false,
        loading: isPerformingAction,
        onPress: userActions.onCancelRequest,
      };
    }

    if (status.isInvited) {
      return {
        type: 'accept-invite',
        label: 'Aceitar Convite',
        variant: 'success',
        disabled: false,
        loading: isPerformingAction,
        onPress: userActions.onAcceptInvite,
      };
    }

    if (status.isFull) {
      return {
        type: 'full',
        label: 'Evento Lotado',
        variant: 'subtle',
        disabled: true,
        loading: false,
        onPress: () => {},
      };
    }

    if (status.canJoin) {
      return {
        type: 'join',
        label: 'Participar',
        variant: 'primary',
        disabled: false,
        loading: isPerformingAction,
        onPress: userActions.onJoin,
      };
    }

    if (!status.isParticipant && !status.isFull) {
      return {
        type: 'request',
        label: 'Solicitar Participação',
        variant: 'primary',
        disabled: false,
        loading: isPerformingAction,
        onPress: userActions.onRequestJoin,
      };
    }

    return {
      type: 'join',
      label: 'Participar',
      variant: 'primary',
      disabled: true,
      loading: false,
      onPress: () => {},
    };
  }, [status, isPerformingAction, userActions]);

  return {
    event,
    isLoading,
    error,
    status,
    userActions,
    managementActions,
    shareActions,
    actionButtonState,
    refresh,
    isPerformingAction,
  };
};
