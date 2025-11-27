import { useCallback, useState } from 'react';
import { Linking, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useAlert } from '@/contexts/AlertContext';
import type { EventLocation } from '@/services/events/typesEvents';

export type MapApp = 'google' | 'waze' | 'apple' | 'uber';

interface MapOption {
  id: MapApp;
  name: string;
  icon: string;
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

export const useAddressMaps = (
  location: EventLocation
): UseAddressMapsReturn => {
  const { showError } = useAlert();
  const [isLoading, setIsLoading] = useState(false);
  const [canOpenMaps] = useState(true);

  const getGoogleMapsUrl = useCallback((): string => {
    const { latitude, longitude } = location;
    return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  }, [location]);

  const getWazeUrl = useCallback((): string => {
    const { latitude, longitude } = location;
    return `https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes`;
  }, [location]);

  const getAppleMapsUrl = useCallback((): string => {
    const { latitude, longitude, address, city, state } = location;
    const query = encodeURIComponent(address || `${city}, ${state}`);
    return `maps://maps.apple.com/?q=${query}&ll=${latitude},${longitude}`;
  }, [location]);

  const getUberUrl = useCallback((): string => {
    const { latitude, longitude } = location;
    return `https://m.uber.com/?action=setPickup&pickup[latitude]=${latitude}&pickup[longitude]=${longitude}`;
  }, [location]);

  const openUrl = useCallback(
    async (url: string, appName: string): Promise<void> => {
      try {
        setIsLoading(true);

        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

        const canOpen = await Linking.canOpenURL(url);

        if (canOpen) {
          await Linking.openURL(url);

          await Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Success
          );
        } else {
          if (appName === 'Google Maps') {
            await Linking.openURL(url);
          } else {
            showError(
              `Instale o app ${appName} para usar esta opção, ou use Google Maps.`
            );
            await Haptics.notificationAsync(
              Haptics.NotificationFeedbackType.Warning
            );
          }
        }
      } catch {
        showError(`Não foi possível abrir ${appName}`);
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      } finally {
        setIsLoading(false);
      }
    },
    [showError]
  );

  const openInGoogleMaps = useCallback(async (): Promise<void> => {
    const url = getGoogleMapsUrl();
    await openUrl(url, 'Google Maps');
  }, [getGoogleMapsUrl, openUrl]);

  const openInWaze = useCallback(async (): Promise<void> => {
    const url = getWazeUrl();
    await openUrl(url, 'Waze');
  }, [getWazeUrl, openUrl]);

  const openInAppleMaps = useCallback(async (): Promise<void> => {
    if (Platform.OS !== 'ios') {
      showError('Apple Maps disponível apenas no iOS');
      return;
    }

    const url = getAppleMapsUrl();
    await openUrl(url, 'Apple Maps');
  }, [getAppleMapsUrl, openUrl, showError]);

  const openInUber = useCallback(async (): Promise<void> => {
    const url = getUberUrl();
    await openUrl(url, 'Uber');
  }, [getUberUrl, openUrl]);

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

  const getAvailableApps = useCallback(async (): Promise<MapOption[]> => {
    const apps: MapOption[] = [
      {
        id: 'google',
        name: 'Google Maps',
        icon: 'map',
        available: true,
      },
      {
        id: 'waze',
        name: 'Waze',
        icon: 'navigate',
        available: await Linking.canOpenURL(getWazeUrl()),
      },
    ];

    if (Platform.OS === 'ios') {
      apps.push({
        id: 'apple',
        name: 'Apple Maps',
        icon: 'map-outline',
        available: await Linking.canOpenURL(getAppleMapsUrl()),
      });
    }

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
