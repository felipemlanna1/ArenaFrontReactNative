import { useCallback } from 'react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const useEventCard = () => {
  const formatDate = useCallback((dateString: string): string => {
    const date = parseISO(dateString);
    return format(date, "EEE, dd MMM", { locale: ptBR });
  }, []);

  const formatTime = useCallback((dateString: string): string => {
    const date = parseISO(dateString);
    return format(date, 'HH:mm', { locale: ptBR });
  }, []);

  const formatPrice = useCallback((price: number, isFree: boolean): string => {
    if (isFree) return 'Gratuito';
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
  }, []);

  const formatDistance = useCallback((distance?: number): string => {
    if (!distance) return '';
    if (distance < 1) return `${Math.round(distance * 1000)}m`;
    return `${distance.toFixed(1)}km`;
  }, []);

  return {
    formatDate,
    formatTime,
    formatPrice,
    formatDistance,
  };
};
