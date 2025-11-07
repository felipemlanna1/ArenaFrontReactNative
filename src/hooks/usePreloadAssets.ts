import { useState, useCallback } from 'react';
import { Image } from 'expo-image';
import * as Font from 'expo-font';

interface UsePreloadAssetsReturn {
  isLoading: boolean;
  error: Error | null;
  preloadAssets: () => Promise<void>;
}

const SPORT_ICONS = [
  require('../assets/iconSports/ball.webp'),
  require('../assets/iconSports/basketball-outline.webp'),
  require('../assets/iconSports/basquete.webp'),
  require('../assets/iconSports/beachtenis.webp'),
  require('../assets/iconSports/bicycle.webp'),
  require('../assets/iconSports/bicicleta.webp'),
  require('../assets/iconSports/boxe.webp'),
  require('../assets/iconSports/boxing-glove.webp'),
  require('../assets/iconSports/climbing.webp'),
  require('../assets/iconSports/corrida.webp'),
  require('../assets/iconSports/dumbbell.webp'),
  require('../assets/iconSports/escalada.webp'),
  require('../assets/iconSports/futbol.webp'),
  require('../assets/iconSports/futebol.webp'),
  require('../assets/iconSports/handebol.webp'),
  require('../assets/iconSports/jiujitsu.webp'),
  require('../assets/iconSports/karate-do.webp'),
  require('../assets/iconSports/kettlebell.webp'),
  require('../assets/iconSports/racquetball.webp'),
  require('../assets/iconSports/roller-skate.webp'),
  require('../assets/iconSports/running.webp'),
  require('../assets/iconSports/shuttlecock.webp'),
  require('../assets/iconSports/skateboard.webp'),
  require('../assets/iconSports/soccer.webp'),
  require('../assets/iconSports/sports-handball.webp'),
  require('../assets/iconSports/surfing-outline.webp'),
  require('../assets/iconSports/swim-outline.webp'),
  require('../assets/iconSports/tennis.webp'),
  require('../assets/iconSports/tenis.webp'),
  require('../assets/iconSports/volleyball.webp'),
  require('../assets/iconSports/voleibol.webp'),
];

const PLAYER_IMAGES = [
  require('../assets/players/backgroud_group.png'),
  require('../assets/players/background_friends.png'),
  require('../assets/players/corredores.webp'),
  require('../assets/players/futebolCarrinho.webp'),
  require('../assets/players/jogadorDeTenis.webp'),
  require('../assets/players/voleibol.webp'),
];

const FONTS = {
  'BebasNeue-Regular': require('../../assets/fonts/BebasNeue-Regular.ttf'),
  'Inter-Regular': require('../../assets/fonts/Inter-Regular.ttf'),
  'Inter-Medium': require('../../assets/fonts/Inter-Medium.ttf'),
  'Inter-SemiBold': require('../../assets/fonts/Inter-SemiBold.ttf'),
  'Inter-Bold': require('../../assets/fonts/Inter-Bold.ttf'),
};

export const usePreloadAssets = (): UsePreloadAssetsReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const preloadAssets = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      await Promise.all([
        Font.loadAsync(FONTS),
        Image.prefetch([...SPORT_ICONS, ...PLAYER_IMAGES]),
      ]);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err : new Error('Failed to preload assets');
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    preloadAssets,
  };
};
