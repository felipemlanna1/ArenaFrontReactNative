import { useCallback, useState } from 'react';
import { Share, Platform } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import { useToast } from '@/contexts/ToastContext';
import { deepLinksService } from '@/services/deepLinks/deepLinksService';
import type { Event, EventParticipant } from '@/services/events/typesEvents';

interface UseShareParticipantsReturn {
  shareParticipants: () => Promise<void>;
  isSharing: boolean;
}

export const useShareParticipants = (
  event: Event
): UseShareParticipantsReturn => {
  const { showToast } = useToast();
  const [isSharing, setIsSharing] = useState(false);

  const formatParticipantName = useCallback(
    (participant: EventParticipant): string => {
      const { user } = participant;
      const fullName = `${user.firstName} ${user.lastName}`.trim();
      const username = user.username ? `@${user.username}` : '';

      return username ? `${fullName} (${username})` : fullName;
    },
    []
  );

  const formatParticipantsList = useCallback(
    (participants: EventParticipant[], status: string): string => {
      const filtered = participants.filter(p => p.status === status);

      if (filtered.length === 0) {
        return '';
      }

      const list = filtered
        .map(
          (participant, index) =>
            `${index + 1}. ${formatParticipantName(participant)}`
        )
        .join('\n');

      return list;
    },
    [formatParticipantName]
  );

  const generateShareMessage = useCallback((): string => {
    const { title, sport, participants = [], startDate } = event;

    const confirmed = participants.filter(p => p.status === 'CONFIRMED');
    const pending = participants.filter(p => p.status === 'PENDING');
    const invited = participants.filter(p => p.status === 'INVITED');

    const header = `👥 PARTICIPANTES - ${title}`;
    const sportIcon = sport.icon || '⚽';
    const sportLine = `${sportIcon} ${sport.name}`;

    const eventDate = new Date(startDate);
    const formattedDate = eventDate.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    const dateLine = `📅 ${formattedDate}`;

    const sections: string[] = [];

    if (confirmed.length > 0) {
      const confirmedList = formatParticipantsList(participants, 'CONFIRMED');
      sections.push(`✅ CONFIRMADOS (${confirmed.length}):\n${confirmedList}`);
    }

    if (pending.length > 0) {
      const pendingList = formatParticipantsList(participants, 'PENDING');
      sections.push(`⏳ PENDENTES (${pending.length}):\n${pendingList}`);
    }

    if (invited.length > 0) {
      const invitedList = formatParticipantsList(participants, 'INVITED');
      sections.push(`📨 CONVIDADOS (${invited.length}):\n${invitedList}`);
    }

    if (sections.length === 0) {
      sections.push('Ainda não há participantes confirmados.');
    }

    const eventLink = deepLinksService.generateEventLink(event.id);

    const message = `${header}
${sportLine}
${dateLine}

${sections.join('\n\n')}

🔗 Participe você também:
${eventLink}

Baixe o app Arena! 🔥`;

    return message;
  }, [event, formatParticipantsList]);

  const shareParticipants = useCallback(async (): Promise<void> => {
    try {
      setIsSharing(true);

      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      const message = generateShareMessage();

      if (Platform.OS === 'web') {
        if (typeof navigator !== 'undefined' && navigator.share) {
          try {
            await navigator.share({
              title: `Participantes - ${event.title}`,
              text: message,
            });

            showToast('Lista compartilhada!', 'success');
            await Haptics.notificationAsync(
              Haptics.NotificationFeedbackType.Success
            );
            return;
          } catch (shareError) {
            if (
              shareError instanceof Error &&
              shareError.name !== 'AbortError' &&
              shareError.message !== 'Share cancelled'
            ) {
              throw shareError;
            }
            return;
          }
        }

        await Clipboard.setStringAsync(message);
        showToast('Lista copiada para área de transferência!', 'success');
        await Haptics.notificationAsync(
          Haptics.NotificationFeedbackType.Success
        );
        return;
      }

      const result = await Share.share({
        message,
        title: `Participantes - ${event.title}`,
      });

      if (result.action === Share.sharedAction) {
        showToast('Lista compartilhada!', 'success');
        await Haptics.notificationAsync(
          Haptics.NotificationFeedbackType.Success
        );
      }
    } catch (error) {
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
