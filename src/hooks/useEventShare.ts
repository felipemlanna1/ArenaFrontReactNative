import { useCallback } from 'react';
import { Share, Platform } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Event } from '@/services/events/typesEvents';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface UseEventShareParams {
  event: Event | null;
  onSuccess?: () => void;
}

interface UseEventShareReturn {
  shareEvent: () => Promise<void>;
  canShare: boolean;
}

export const useEventShare = ({
  event,
  onSuccess,
}: UseEventShareParams): UseEventShareReturn => {
  const canShare = !!event;

  const buildShareMessage = useCallback((eventData: Event): string => {
    const formattedDate = format(
      new Date(eventData.startDate),
      "dd 'de' MMMM 'às' HH:mm",
      { locale: ptBR }
    );

    const price = eventData.isFree
      ? 'Gratuito'
      : `R$ ${
          typeof eventData.price === 'number'
            ? eventData.price.toFixed(2)
            : eventData.price
        }`;

    const location = `${eventData.location.city}, ${eventData.location.state}`;

    return `🏃 ${eventData.sport.name}: ${eventData.title}

📅 ${formattedDate}
📍 ${location}
💰 ${price}
👥 ${eventData.currentParticipants}/${eventData.maxParticipants} participantes

${eventData.description ? `\n${eventData.description}\n` : ''}
Participe pelo app Arena! 🔥`;
  }, []);

  const shareEvent = useCallback(async () => {
    if (!event) return;

    try {
      const message = buildShareMessage(event);

      if (Platform.OS === 'web') {
        if (navigator.share) {
          await navigator.share({
            title: `Arena - ${event.title}`,
            text: message,
          });
          onSuccess?.();
        } else {
          await Clipboard.setStringAsync(message);
          if (typeof window !== 'undefined' && window.alert) {
            window.alert(
              'Link copiado para a área de transferência!\n\nCole e compartilhe onde quiser.'
            );
          }
          onSuccess?.();
        }
      } else {
        const result = await Share.share({
          message,
          title: `Arena - ${event.title}`,
        });

        if (
          result.action === Share.sharedAction ||
          result.action === undefined
        ) {
          onSuccess?.();
        }
      }
    } catch (error) {
      if (__DEV__) {
        throw error;
      }
    }
  }, [event, buildShareMessage, onSuccess]);

  return {
    shareEvent,
    canShare,
  };
};
