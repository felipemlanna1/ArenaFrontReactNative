import { useState, useEffect, useCallback } from 'react';
import {
  getUserLocation,
  checkLocationPermission,
  requestLocationPermission,
  UserLocation,
} from '@/services/location';

interface UseUserLocationReturn {
  location: UserLocation | null;
  city: string;
  state: string;
  isLoading: boolean;
  error: Error | null;
  hasPermission: boolean;
  requestPermission: () => Promise<boolean>;
  refreshLocation: () => Promise<void>;
}

/**
 * Hook para obter e gerenciar a localização do usuário
 * Detecta automaticamente a cidade ao montar o componente
 */
export const useUserLocation = (): UseUserLocationReturn => {
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [hasPermission, setHasPermission] = useState(false);

  const checkPermission = useCallback(async () => {
    try {
      const permission = await checkLocationPermission();
      setHasPermission(permission);
      return permission;
    } catch (err) {
      console.error('Error checking location permission:', err);
      return false;
    }
  }, []);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    try {
      const granted = await requestLocationPermission();
      setHasPermission(granted);
      return granted;
    } catch (err) {
      console.error('Error requesting location permission:', err);
      setError(
        err instanceof Error ? err : new Error('Failed to request permission')
      );
      return false;
    }
  }, []);

  const fetchLocation = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const permission = await checkPermission();

      if (!permission) {
        const granted = await requestPermission();
        if (!granted) {
          setIsLoading(false);
          return;
        }
      }

      const userLocation = await getUserLocation();

      if (userLocation) {
        setLocation(userLocation);
      } else {
        setError(new Error('Unable to get location'));
      }
    } catch (err) {
      console.error('Error fetching location:', err);
      setError(
        err instanceof Error ? err : new Error('Failed to fetch location')
      );
    } finally {
      setIsLoading(false);
    }
  }, [checkPermission, requestPermission]);

  const refreshLocation = useCallback(async () => {
    await fetchLocation();
  }, [fetchLocation]);

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  const city = location?.address.city || '';
  const state = location?.address.state || '';

  return {
    location,
    city,
    state,
    isLoading,
    error,
    hasPermission,
    requestPermission,
    refreshLocation,
  };
};
