import { useCallback } from 'react';
import { Share, Platform } from 'react-native';
import * as Clipboard from 'expo-clipboard';

interface UseFriendsShareReturn {
  shareInvite: () => Promise<void>;
}

export const useFriendsShare = (): UseFriendsShareReturn => {
  const ARENA_WEBSITE_URL = 'https://www.arenaapp.com.br/';

  const buildInviteMessage = useCallback((): string => {
    return `🏃 Junte-se ao Arena!

Encontre parceiros de treino, descubra eventos esportivos incríveis e conecte-se com atletas da sua região.

Estou usando o Arena e quero você junto nessa jornada esportiva! 🔥

🔗 Baixe o app: ${ARENA_WEBSITE_URL}

Participe pelo app Arena! 🏆`;
  }, []);

  const shareInvite = useCallback(async () => {
    const message = buildInviteMessage();

    if (Platform.OS === 'web') {
      if (navigator.share) {
        await navigator.share({
          title: 'Arena - Rede Social Esportiva',
          text: message,
        });
      } else {
        await Clipboard.setStringAsync(message);
        if (typeof window !== 'undefined' && window.alert) {
          window.alert(
            'Link copiado para a área de transferência!\n\nCole e compartilhe onde quiser.'
          );
        }
      }
    } else {
      await Share.share({
        message,
        title: 'Arena - Rede Social Esportiva',
      });
    }
  }, [buildInviteMessage]);

  return {
    shareInvite,
  };
};
