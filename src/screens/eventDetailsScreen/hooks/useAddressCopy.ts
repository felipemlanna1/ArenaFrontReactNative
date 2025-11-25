import { useCallback, useState } from 'react';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import { useToast } from '@/contexts/ToastContext';
import type { EventLocation } from '@/services/events/typesEvents';

/**
 * Hook para copiar endereço para clipboard com feedback visual e háptico
 *
 * Funcionalidades:
 * - Formata endereço completo a partir de EventLocation
 * - Copia para clipboard usando expo-clipboard
 * - Feedback háptico (Light → Success)
 * - Toast notification
 * - Estado temporário "Copiado!" (2s)
 *
 * @example
 * const { copyAddress, isCopied, isLoading } = useAddressCopy();
 *
 * <Button onPress={() => copyAddress(event.location)}>
 *   {isCopied ? 'Copiado!' : 'Copiar Endereço'}
 * </Button>
 */

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
    // Prioridade 1: formattedAddress (já formatado pelo backend/Google Places)
    if (location.formattedAddress) {
      return location.formattedAddress;
    }

    // Prioridade 2: Montar endereço estruturado
    const parts: string[] = [];

    // Linha 1: Rua + Número
    if (location.street) {
      const streetLine = location.number
        ? `${location.street}, ${location.number}`
        : location.street;
      parts.push(streetLine);
    }

    // Linha 2: Complemento (se houver)
    if (location.complement) {
      parts.push(location.complement);
    }

    // Linha 3: Bairro
    if (location.district) {
      parts.push(location.district);
    }

    // Linha 4: Cidade - Estado
    const cityState = `${location.city}, ${location.state}`;
    parts.push(cityState);

    // Linha 5: CEP
    if (location.zipCode) {
      parts.push(location.zipCode);
    }

    // Linha 6: País (se não for Brasil)
    if (location.country && location.country !== 'Brasil' && location.country !== 'Brazil') {
      parts.push(location.country);
    }

    // Prioridade 3: Fallback para address genérico
    if (parts.length === 0 && location.address) {
      return location.address;
    }

    // Prioridade 4: Fallback mínimo
    if (parts.length === 0) {
      return `${location.city}, ${location.state}`;
    }

    return parts.join('\n');
  }, []);

  const copyAddress = useCallback(
    async (location: EventLocation) => {
      try {
        setIsLoading(true);

        // 1. Haptic feedback inicial (Light)
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

        // 2. Formatar endereço
        const formattedAddress = formatAddress(location);

        // 3. Copiar para clipboard
        await Clipboard.setStringAsync(formattedAddress);

        // 4. Feedback visual (Toast)
        showToast('Endereço copiado!', 'success');

        // 5. Haptic feedback de sucesso
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

        // 6. Estado temporário "Copiado!"
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      } catch (error) {
        // Feedback de erro
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
