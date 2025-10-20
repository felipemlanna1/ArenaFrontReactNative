import { useState, useCallback } from 'react';
import { Share } from 'react-native';
import * as Haptics from 'expo-haptics';
import { eventsService } from '@/services/events/eventsService';
import { Event } from '@/services/events/typesEvents';
import { useAlert } from '@/contexts/AlertContext';
import {
  UseEventDetailsActionsReturn,
  EventDetailsStatus,
} from '../typesEventDetailsScreen';

interface UseEventDetailsActionsParams {
  event: Event | null;
  status: EventDetailsStatus;
  onRefresh: () => Promise<void>;
  navigation: {
    navigate: (screen: string, params?: Record<string, unknown>) => void;
    goBack: () => void;
  };
}

export const useEventDetailsActions = ({
  event,
  status,
  onRefresh,
  navigation,
}: UseEventDetailsActionsParams): UseEventDetailsActionsReturn => {
  const [isPerformingAction, setIsPerformingAction] = useState(false);
  const { showSuccess, showError, showConfirm } = useAlert();

  const onJoin = useCallback(async () => {
    if (!event) return;

    try {
      setIsPerformingAction(true);
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      await eventsService.joinEvent(event.id);

      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      showSuccess('Você agora está participando do evento.');

      await onRefresh();
    } catch (error) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      showError(
        error instanceof Error
          ? error.message
          : 'Não foi possível participar do evento.'
      );
    } finally {
      setIsPerformingAction(false);
    }
  }, [event, onRefresh, showSuccess, showError]);

  const onLeave = useCallback(async () => {
    if (!event) return;

    showConfirm({
      title: 'Sair do evento',
      message: 'Tem certeza que deseja sair deste evento?',
      variant: 'warning',
      confirmText: 'Sair',
      cancelText: 'Cancelar',
      onConfirm: async () => {
        try {
          setIsPerformingAction(true);
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

          await eventsService.leaveEvent(event.id);

          await Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Success
          );
          showSuccess('Você saiu do evento.');

          await onRefresh();
        } catch (error) {
          await Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Error
          );
          showError(
            error instanceof Error
              ? error.message
              : 'Não foi possível sair do evento.'
          );
        } finally {
          setIsPerformingAction(false);
        }
      },
    });
  }, [event, onRefresh, showConfirm, showSuccess, showError]);

  const onRequestJoin = useCallback(async () => {
    if (!event) return;

    try {
      setIsPerformingAction(true);
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      await eventsService.requestJoin(event.id);

      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      showSuccess('O organizador receberá sua solicitação para participar.');

      await onRefresh();
    } catch (error) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      showError(
        error instanceof Error
          ? error.message
          : 'Não foi possível enviar a solicitação.'
      );
    } finally {
      setIsPerformingAction(false);
    }
  }, [event, onRefresh, showSuccess, showError]);

  const onCancelRequest = useCallback(async () => {
    if (!event) return;

    try {
      setIsPerformingAction(true);
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      await eventsService.cancelRequest(event.id);

      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      showSuccess('Sua solicitação foi cancelada.');

      await onRefresh();
    } catch (error) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      showError(
        error instanceof Error
          ? error.message
          : 'Não foi possível cancelar a solicitação.'
      );
    } finally {
      setIsPerformingAction(false);
    }
  }, [event, onRefresh, showSuccess, showError]);

  const onAcceptInvite = useCallback(async () => {
    if (!event || !event.invitationId) return;

    try {
      setIsPerformingAction(true);
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      await eventsService.acceptInvitation(event.id, event.invitationId);

      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      showSuccess('Você agora está participando do evento.');

      await onRefresh();
    } catch (error) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      showError(
        error instanceof Error
          ? error.message
          : 'Não foi possível aceitar o convite.'
      );
    } finally {
      setIsPerformingAction(false);
    }
  }, [event, onRefresh, showSuccess, showError]);

  const onRejectInvite = useCallback(async () => {
    if (!event || !event.invitationId) return;

    try {
      setIsPerformingAction(true);
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      await eventsService.rejectInvitation(event.id, event.invitationId);

      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      showSuccess('O convite foi recusado.');

      await onRefresh();
    } catch (error) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      showError(
        error instanceof Error
          ? error.message
          : 'Não foi possível recusar o convite.'
      );
    } finally {
      setIsPerformingAction(false);
    }
  }, [event, onRefresh, showSuccess, showError]);

  const onCheckIn = useCallback(async () => {
    if (!event) return;

    showConfirm({
      title: 'Check-in',
      message: 'Confirmar presença no evento?',
      variant: 'info',
      confirmText: 'Confirmar',
      cancelText: 'Cancelar',
      onConfirm: async () => {
        try {
          setIsPerformingAction(true);
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

          await Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Success
          );
          showSuccess('Sua presença foi confirmada.');

          await onRefresh();
        } catch (error) {
          await Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Error
          );
          showError(
            error instanceof Error
              ? error.message
              : 'Não foi possível realizar o check-in.'
          );
        } finally {
          setIsPerformingAction(false);
        }
      },
    });
  }, [event, onRefresh, showConfirm, showSuccess, showError]);

  const managementActions = status.isOwner
    ? {
        onEdit: () => {
          if (event) {
            navigation.navigate('CreateEvent', { eventId: event.id });
          }
        },
        onManage: () => {
          showSuccess('Tela de gerenciamento em breve!');
        },
        onCancel: async () => {
          showConfirm({
            title: 'Cancelar evento',
            message: 'Tem certeza? Esta ação não pode ser desfeita.',
            variant: 'error',
            confirmText: 'Cancelar Evento',
            cancelText: 'Voltar',
            onConfirm: async () => {
              try {
                setIsPerformingAction(true);
                showSuccess('Evento cancelado');
                navigation.goBack();
              } catch {
                showError('Não foi possível cancelar o evento.');
              } finally {
                setIsPerformingAction(false);
              }
            },
          });
        },
        onDelete: async () => {
          showConfirm({
            title: 'Excluir evento',
            message: 'ATENÇÃO: Esta ação é irreversível!',
            variant: 'error',
            confirmText: 'Excluir',
            cancelText: 'Voltar',
            onConfirm: async () => {
              try {
                setIsPerformingAction(true);
                showSuccess('Evento excluído');
                navigation.goBack();
              } catch {
                showError('Não foi possível excluir o evento.');
              } finally {
                setIsPerformingAction(false);
              }
            },
          });
        },
      }
    : undefined;

  const shareActions = {
    onShare: async () => {
      if (!event) return;

      try {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

        const eventDate = new Date(event.startDate);
        const day = eventDate.getDate().toString().padStart(2, '0');
        const month = eventDate.getMonth() + 1;
        const monthNames = [
          'janeiro',
          'fevereiro',
          'março',
          'abril',
          'maio',
          'junho',
          'julho',
          'agosto',
          'setembro',
          'outubro',
          'novembro',
          'dezembro',
        ];
        const hours = eventDate.getHours().toString().padStart(2, '0');
        const minutes = eventDate.getMinutes().toString().padStart(2, '0');
        const formattedDate = `${day} de ${monthNames[month - 1]} às ${hours}:${minutes}`;

        const price = event.isFree
          ? 'Gratuito'
          : `R$ ${
              typeof event.price === 'number'
                ? event.price.toFixed(2)
                : event.price
            }`;

        const location = `${event.location.city}, ${event.location.state}`;

        const message = `🏃 ${event.sport.name}: ${event.title}

📅 ${formattedDate}
📍 ${location}
💰 ${price}
👥 ${event.currentParticipants}/${event.maxParticipants} participantes

${event.description ? `\n${event.description}\n` : ''}
Participe pelo app Arena! 🔥`;

        const result = await Share.share({
          message,
          title: `Arena - ${event.title}`,
        });

        if (
          result.action === Share.sharedAction ||
          result.action === undefined
        ) {
          await Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Success
          );
        }
      } catch (error) {
        if (__DEV__) {
          console.log('Share cancelled or error:', error);
        }
      }
    },
  };

  return {
    userActions: {
      onJoin,
      onLeave,
      onRequestJoin,
      onCancelRequest,
      onAcceptInvite,
      onRejectInvite,
      onCheckIn,
    },
    managementActions,
    shareActions,
    isPerformingAction,
  };
};
