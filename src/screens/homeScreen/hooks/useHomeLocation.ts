import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { getUserLocation, LocationCoordinates } from '@/services/location';

interface UseHomeLocationReturn {
  userLocation: LocationCoordinates | null;
  userCity: string | null;
  userState: string | null;
  isLoadingLocation: boolean;
  requestLocation: () => Promise<void>;
}

export const useHomeLocation = (): UseHomeLocationReturn => {
  const [userLocation, setUserLocation] =
    useState<LocationCoordinates | null>(null);
  const [userCity, setUserCity] = useState<string | null>(null);
  const [userState, setUserState] = useState<string | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  // ⭐ REGRA: Solicitar localização na inicialização
  const requestLocation = useCallback(async () => {
    try {
      setIsLoadingLocation(true);

      const location = await getUserLocation();

      if (!location) {
        Alert.alert(
          'Localização não disponível',
          'Não foi possível obter sua localização. Verifique as permissões do aplicativo.',
          [{ text: 'OK' }]
        );
        return;
      }

      setUserLocation(location.coordinates);
      setUserCity(location.address.city);
      setUserState(location.address.state);
    } catch (error) {
      console.error('Error requesting location:', error);
    } finally {
      setIsLoadingLocation(false);
    }
  }, []);

  // Solicitar localização automaticamente no mount
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
