import * as Location from 'expo-location';

export interface LocationCoordinates {
  latitude: number;
  longitude: number;
}

export interface LocationAddress {
  city: string | null;
  state: string | null;
  country: string | null;
  postalCode: string | null;
  street: string | null;
  region: string | null;
}

export interface UserLocation {
  coordinates: LocationCoordinates;
  address: LocationAddress;
}

export const requestLocationPermission = async (): Promise<boolean> => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === 'granted';
  } catch {
    return false;
  }
};

export const checkLocationPermission = async (): Promise<boolean> => {
  try {
    const { status } = await Location.getForegroundPermissionsAsync();
    return status === 'granted';
  } catch {
    return false;
  }
};

export const getCurrentLocation =
  async (): Promise<LocationCoordinates | null> => {
    try {
      const hasPermission = await checkLocationPermission();

      if (!hasPermission) {
        const granted = await requestLocationPermission();
        if (!granted) {
          return null;
        }
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    } catch {
      return null;
    }
  };

export const getAddressFromCoordinates = async (
  coordinates: LocationCoordinates
): Promise<LocationAddress | null> => {
  try {
    const addresses = await Location.reverseGeocodeAsync(coordinates);

    if (addresses.length === 0) {
      return null;
    }

    const address = addresses[0];

    return {
      city: address.city || address.subregion || null,
      state: address.region || null,
      country: address.country || null,
      postalCode: address.postalCode || null,
      street: address.street || null,
      region: address.region || null,
    };
  } catch {
    return null;
  }
};

export const getUserLocation = async (): Promise<UserLocation | null> => {
  try {
    const coordinates = await getCurrentLocation();

    if (!coordinates) {
      return null;
    }

    const address = await getAddressFromCoordinates(coordinates);

    if (!address) {
      return {
        coordinates,
        address: {
          city: null,
          state: null,
          country: null,
          postalCode: null,
          street: null,
          region: null,
        },
      };
    }

    return {
      coordinates,
      address,
    };
  } catch {
    return null;
  }
};

export const calculateDistance = (
  coord1: LocationCoordinates,
  coord2: LocationCoordinates
): number => {
  const R = 6371;
  const dLat = toRad(coord2.latitude - coord1.latitude);
  const dLon = toRad(coord2.longitude - coord1.longitude);
  const lat1 = toRad(coord1.latitude);
  const lat2 = toRad(coord2.latitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance * 10) / 10;
};

const toRad = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};
