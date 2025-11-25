import { useCallback, useState } from 'react';
import { Share, Platform } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import { useToast } from '@/contexts/ToastContext';
import { deepLinksService } from '@/services/deepLinks/deepLinksService';
import type { Event, EventParticipant } from '@/services/events/typesEvents';

/**
 * Hook para compartilhar lista de participantes de um evento
 *
 * Funcionalidades:
 * - Formata lista de participantes (confirmados, pendentes, convidados)
 * - Compartilha via Share API nativa
 * - Fallback para clipboard na web
 * - Feedback háptico e visual (Toast)
 * - Inclui deep link do evento
 *
 * @example
 * const { shareParticipants, isSharing } = useShareParticipants(event);
 *
 * <Button onPress={shareParticipants} disabled={isSharing}>
 *   Compartilhar Lista
 * </Button>
 */

interface UseShareParticipantsReturn {
  shareParticipants: () => Promise<void>;
  isSharing: boolean;
}

export const useShareParticipants = (event: Event): UseShareParticipantsReturn => {
  const { showToast } = useToast();
  const [isSharing, setIsSharing] = useState(false);

  /**
   * Formata nome completo do participante
   */
  const formatParticipantName = useCallback((participant: EventParticipant): string => {
    const { user } = participant;
    const fullName = `${user.firstName} ${user.lastName}`.trim();
    const username = user.username ? `@${user.username}` : '';

    return username ? `${fullName} (${username})` : fullName;
  }, []);

  /**
   * Formata lista de participantes por status
   */
  const formatParticipantsList = useCallback(
    (participants: EventParticipant[], status: string): string => {
      const filtered = participants.filter((p) => p.status === status);

      if (filtered.length === 0) {
        return '';
      }

      const list = filtered
        .map((participant, index) => `${index + 1}. ${formatParticipantName(participant)}`)
        .join('\n');

      return list;
    },
    [formatParticipantName]
  );

  /**
   * Gera mensagem formatada para compartilhamento
   */
  const generateShareMessage = useCallback((): string => {
    const { title, sport, participants = [], startDate } = event;

    // Filtrar participantes por status
    const confirmed = participants.filter((p) => p.status === 'CONFIRMED');
    const pending = participants.filter((p) => p.status === 'PENDING');
    const invited = participants.filter((p) => p.status === 'INVITED');

    // Header
    const header = `👥 PARTICIPANTES - ${title}`;
    const sportIcon = sport.icon || '⚽';
    const sportLine = `${sportIcon} ${sport.name}`;

    // Data do evento
    const eventDate = new Date(startDate);
    const formattedDate = eventDate.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    const dateLine = `📅 ${formattedDate}`;

    // Seções de participantes
    const sections: string[] = [];

    // Confirmados
    if (confirmed.length > 0) {
      const confirmedList = formatParticipantsList(participants, 'CONFIRMED');
      sections.push(`✅ CONFIRMADOS (${confirmed.length}):\n${confirmedList}`);
    }

    // Pendentes
    if (pending.length > 0) {
      const pendingList = formatParticipantsList(participants, 'PENDING');
      sections.push(`⏳ PENDENTES (${pending.length}):\n${pendingList}`);
    }

    // Convidados
    if (invited.length > 0) {
      const invitedList = formatParticipantsList(participants, 'INVITED');
      sections.push(`📨 CONVIDADOS (${invited.length}):\n${invitedList}`);
    }

    // Se não há participantes
    if (sections.length === 0) {
      sections.push('Ainda não há participantes confirmados.');
    }

    // Deep link do evento
    const eventLink = deepLinksService.generateEventLink(event.id);

    // Montagem final
    const message = `${header}
${sportLine}
${dateLine}

${sections.join('\n\n')}

🔗 Participe você também:
${eventLink}

Baixe o app Arena! 🔥`;

    return message;
  }, [event, formatParticipantsList]);

  /**
   * Compartilha lista de participantes
   */
  const shareParticipants = useCallback(async (): Promise<void> => {
    try {
      setIsSharing(true);

      // Haptic feedback inicial
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      // Gerar mensagem
      const message = generateShareMessage();

      // Web: Fallback para clipboard
      if (Platform.OS === 'web') {
        // Tentar usar navigator.share se disponível
        if (typeof navigator !== 'undefined' && navigator.share) {
          try {
            await navigator.share({
              title: `Participantes - ${event.title}`,
              text: message,
            });

            // Feedback de sucesso
            showToast('Lista compartilhada!', 'success');
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            return;
          } catch (shareError) {
            // Usuário cancelou ou erro - continuar para clipboard
            if (
              shareError instanceof Error &&
              shareError.name !== 'AbortError' &&
              shareError.message !== 'Share cancelled'
            ) {
              // Erro real, não cancelamento
              throw shareError;
            }
            return; // Usuário cancelou, não fazer nada
          }
        }

        // Fallback: copiar para clipboard
        await Clipboard.setStringAsync(message);
        showToast('Lista copiada para área de transferência!', 'success');
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        return;
      }

      // iOS/Android: Share nativa
      const result = await Share.share({
        message,
        title: `Participantes - ${event.title}`,
      });

      // Feedback de sucesso (apenas se compartilhado)
      if (result.action === Share.sharedAction) {
        showToast('Lista compartilhada!', 'success');
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
      // Se dismissedAction, usuário cancelou - não fazer nada
    } catch (error) {
      // Erro ao compartilhar
      if (error instanceof Error && error.message !== 'Share cancelled') {
        showToast('Erro ao compartilhar lista', 'error');
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
    } finally {
      setIsSharing(false);
    }
  }, [event, generateShareMessage, showToast]);

  return {
    shareParticipants,
    isSharing,
  };
};
