import { useCallback, useState } from 'react';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import { useToast } from '@/contexts/ToastContext';
import type { EventLocation } from '@/services/events/typesEvents';

interface UseAddressCopyReturn {
  copyAddress: (location: EventLocation) => Promise<void>;
  isCopied: boolean;
  isLoading: boolean;
}

export const useAddressCopy = (): UseAddressCopyReturn => {
  const { showToast } = useToast();
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formatAddress = useCallback((location: EventLocation): string => {
    if (location.formattedAddress) {
      return location.formattedAddress;
    }

    const parts: string[] = [];

    if (location.street) {
      const streetLine = location.number
        ? `${location.street}, ${location.number}`
        : location.street;
      parts.push(streetLine);
    }

    if (location.complement) {
      parts.push(location.complement);
    }

    if (location.district) {
      parts.push(location.district);
    }

    const cityState = `${location.city}, ${location.state}`;
    parts.push(cityState);

    if (location.zipCode) {
      parts.push(location.zipCode);
    }

    if (
      location.country &&
      location.country !== 'Brasil' &&
      location.country !== 'Brazil'
    ) {
      parts.push(location.country);
    }

    if (parts.length === 0 && location.address) {
      return location.address;
    }

    if (parts.length === 0) {
      return `${location.city}, ${location.state}`;
    }

    return parts.join('\n');
  }, []);

  const copyAddress = useCallback(
    async (location: EventLocation) => {
      try {
        setIsLoading(true);

        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

        const formattedAddress = formatAddress(location);

        await Clipboard.setStringAsync(formattedAddress);

        showToast('Endereço copiado!', 'success');

        await Haptics.notificationAsync(
          Haptics.NotificationFeedbackType.Success
        );

        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      } catch {
        showToast('Erro ao copiar endereço', 'error');
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      } finally {
        setIsLoading(false);
      }
    },
    [formatAddress, showToast]
  );

  return {
    copyAddress,
    isCopied,
    isLoading,
  };
};
