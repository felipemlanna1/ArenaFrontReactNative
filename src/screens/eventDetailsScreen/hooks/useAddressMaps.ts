import { useCallback, useState } from 'react';
import { Linking, Platform, Alert } from 'react-native';
import * as Haptics from 'expo-haptics';
import type { EventLocation } from '@/services/events/typesEvents';

/**
 * Hook para abrir localização em apps de mapas (Google Maps, Waze, Apple Maps, Uber)
 *
 * Funcionalidades:
 * - Deep links para apps de mapas populares
 * - Detecção de app instalado (canOpenURL)
 * - Fallback para navegador se app não instalado
 * - Feedback háptico em todas as interações
 * - Tratamento de erros
 *
 * @example
 * const { openInGoogleMaps, openInWaze, openInAppleMaps, canOpenMaps } = useAddressMaps(location);
 *
 * <Button onPress={openInGoogleMaps}>Google Maps</Button>
 * <Button onPress={openInWaze}>Waze</Button>
 */

export type MapApp = 'google' | 'waze' | 'apple' | 'uber';

interface MapOption {
  id: MapApp;
  name: string;
  icon: string; // Ionicons name
  available: boolean;
}

interface UseAddressMapsReturn {
  openInGoogleMaps: () => Promise<void>;
  openInWaze: () => Promise<void>;
  openInAppleMaps: () => Promise<void>;
  openInUber: () => Promise<void>;
  openMapApp: (app: MapApp) => Promise<void>;
  getAvailableApps: () => Promise<MapOption[]>;
  canOpenMaps: boolean;
  isLoading: boolean;
}

export const useAddressMaps = (location: EventLocation): UseAddressMapsReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [canOpenMaps] = useState(true); // Sempre true, pois Google Maps funciona via browser

  /**
   * Gera URL para Google Maps
   * Formato: https://www.google.com/maps/search/?api=1&query=lat,lng
   */
  const getGoogleMapsUrl = useCallback((): string => {
    const { latitude, longitude } = location;
    return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  }, [location]);

  /**
   * Gera URL para Waze
   * Formato: https://waze.com/ul?ll=lat,lng&navigate=yes
   */
  const getWazeUrl = useCallback((): string => {
    const { latitude, longitude } = location;
    return `https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes`;
  }, [location]);

  /**
   * Gera URL para Apple Maps (iOS apenas)
   * Formato: maps://maps.apple.com/?q=address&ll=lat,lng
   */
  const getAppleMapsUrl = useCallback((): string => {
    const { latitude, longitude, address, city, state } = location;
    const query = encodeURIComponent(address || `${city}, ${state}`);
    return `maps://maps.apple.com/?q=${query}&ll=${latitude},${longitude}`;
  }, [location]);

  /**
   * Gera URL para Uber
   * Formato: https://m.uber.com/?action=setPickup&pickup[latitude]=lat&pickup[longitude]=lng
   */
  const getUberUrl = useCallback((): string => {
    const { latitude, longitude } = location;
    return `https://m.uber.com/?action=setPickup&pickup[latitude]=${latitude}&pickup[longitude]=${longitude}`;
  }, [location]);

  /**
   * Abre URL em app externo com tratamento de erro
   */
  const openUrl = useCallback(async (url: string, appName: string): Promise<void> => {
    try {
      setIsLoading(true);

      // Haptic feedback antes de abrir
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      const canOpen = await Linking.canOpenURL(url);

      if (canOpen) {
        await Linking.openURL(url);
        // Haptic feedback de sucesso
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } else {
        // Se não conseguir abrir, tentar abrir no navegador (fallback para Google Maps)
        if (appName === 'Google Maps') {
          await Linking.openURL(url);
        } else {
          Alert.alert(
            `${appName} não disponível`,
            `Instale o app ${appName} para usar esta opção, ou use Google Maps.`
          );
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        }
      }
    } catch (error) {
      Alert.alert('Erro', `Não foi possível abrir ${appName}`);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Abre Google Maps
   */
  const openInGoogleMaps = useCallback(async (): Promise<void> => {
    const url = getGoogleMapsUrl();
    await openUrl(url, 'Google Maps');
  }, [getGoogleMapsUrl, openUrl]);

  /**
   * Abre Waze
   */
  const openInWaze = useCallback(async (): Promise<void> => {
    const url = getWazeUrl();
    await openUrl(url, 'Waze');
  }, [getWazeUrl, openUrl]);

  /**
   * Abre Apple Maps (iOS apenas)
   */
  const openInAppleMaps = useCallback(async (): Promise<void> => {
    if (Platform.OS !== 'ios') {
      Alert.alert('Apple Maps disponível apenas no iOS');
      return;
    }

    const url = getAppleMapsUrl();
    await openUrl(url, 'Apple Maps');
  }, [getAppleMapsUrl, openUrl]);

  /**
   * Abre Uber
   */
  const openInUber = useCallback(async (): Promise<void> => {
    const url = getUberUrl();
    await openUrl(url, 'Uber');
  }, [getUberUrl, openUrl]);

  /**
   * Abre app de mapas específico
   */
  const openMapApp = useCallback(
    async (app: MapApp): Promise<void> => {
      switch (app) {
        case 'google':
          await openInGoogleMaps();
          break;
        case 'waze':
          await openInWaze();
          break;
        case 'apple':
          await openInAppleMaps();
          break;
        case 'uber':
          await openInUber();
          break;
        default:
          await openInGoogleMaps();
      }
    },
    [openInGoogleMaps, openInWaze, openInAppleMaps, openInUber]
  );

  /**
   * Retorna lista de apps de mapas disponíveis
   */
  const getAvailableApps = useCallback(async (): Promise<MapOption[]> => {
    const apps: MapOption[] = [
      {
        id: 'google',
        name: 'Google Maps',
        icon: 'map',
        available: true, // Sempre disponível (via browser)
      },
      {
        id: 'waze',
        name: 'Waze',
        icon: 'navigate',
        available: await Linking.canOpenURL(getWazeUrl()),
      },
    ];

    // Apple Maps apenas no iOS
    if (Platform.OS === 'ios') {
      apps.push({
        id: 'apple',
        name: 'Apple Maps',
        icon: 'map-outline',
        available: await Linking.canOpenURL(getAppleMapsUrl()),
      });
    }

    // Uber sempre no final
    apps.push({
      id: 'uber',
      name: 'Uber',
      icon: 'car',
      available: await Linking.canOpenURL(getUberUrl()),
    });

    return apps;
  }, [getWazeUrl, getAppleMapsUrl, getUberUrl]);

  return {
    openInGoogleMaps,
    openInWaze,
    openInAppleMaps,
    openInUber,
    openMapApp,
    getAvailableApps,
    canOpenMaps,
    isLoading,
  };
};
