import { useState, useEffect, useCallback } from 'react';
import { getUserLocation, LocationCoordinates } from '@/services/location';
import { useAlert } from '@/contexts/AlertContext';

interface UseHomeLocationReturn {
  userLocation: LocationCoordinates | null;
  userCity: string | null;
  userState: string | null;
  isLoadingLocation: boolean;
  requestLocation: () => Promise<void>;
}

export const useHomeLocation = (): UseHomeLocationReturn => {
  const { showError } = useAlert();
  const [userLocation, setUserLocation] = useState<LocationCoordinates | null>(
    null
  );
  const [userCity, setUserCity] = useState<string | null>(null);
  const [userState, setUserState] = useState<string | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const requestLocation = useCallback(async () => {
    try {
      setIsLoadingLocation(true);

      const location = await getUserLocation();

      if (!location) {
        showError(
          'Não foi possível obter sua localização. Verifique as permissões do aplicativo.'
        );
        return;
      }

      setUserLocation(location.coordinates);
      setUserCity(location.address.city);
      setUserState(location.address.city);
    } finally {
      setIsLoadingLocation(false);
    }
  }, [showError]);

  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  return {
    userLocation,
    userCity,
    userState,
    isLoadingLocation,
    requestLocation,
  };
};
