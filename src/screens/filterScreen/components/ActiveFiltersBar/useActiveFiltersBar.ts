import { useMemo } from 'react';
import {
  UseActiveFiltersBarProps,
  UseActiveFiltersBarReturn,
  ActiveFilterChip,
} from './typesActiveFiltersBar';

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

const EVENT_FILTER_LABELS: Record<string, string> = {
  all: 'Todos os eventos',
  organizing: 'Eventos que organizo',
  participating: 'Eventos que participo',
  invited: 'Eventos que fui convidado',
};

export const useActiveFiltersBar = ({
  filters,
}: UseActiveFiltersBarProps): UseActiveFiltersBarReturn => {
  const activeFilters = useMemo((): ActiveFilterChip[] => {
    const chips: ActiveFilterChip[] = [];

    if (filters.sportIds && filters.sportIds.length > 0) {
      chips.push({
        id: 'sports',
        label: `${filters.sportIds.length} esporte${filters.sportIds.length > 1 ? 's' : ''}`,
        key: 'sportIds',
      });
    }

    if (filters.eventFilter && filters.eventFilter !== 'all') {
      chips.push({
        id: 'event-filter',
        label: EVENT_FILTER_LABELS[filters.eventFilter],
        key: 'eventFilter',
      });
    }

    if (filters.priceMin !== undefined && filters.priceMin !== null) {
      chips.push({
        id: 'price-min',
        label: `Mín: R$ ${filters.priceMin}`,
        key: 'priceMin',
      });
    }

    if (filters.priceMax !== undefined && filters.priceMax !== null) {
      chips.push({
        id: 'price-max',
        label: `Máx: R$ ${filters.priceMax}`,
        key: 'priceMax',
      });
    }

    if (filters.isFree) {
      chips.push({
        id: 'is-free',
        label: 'Gratuito',
        key: 'isFree',
      });
    }

    if (filters.hasAvailableSpots) {
      chips.push({
        id: 'has-spots',
        label: 'Com vagas',
        key: 'hasAvailableSpots',
      });
    }

    if (filters.startDateFrom) {
      chips.push({
        id: 'date-from',
        label: `De: ${formatDate(filters.startDateFrom)}`,
        key: 'startDateFrom',
      });
    }

    if (filters.startDateTo) {
      chips.push({
        id: 'date-to',
        label: `Até: ${formatDate(filters.startDateTo)}`,
        key: 'startDateTo',
      });
    }

    if (filters.city && filters.city.trim()) {
      chips.push({
        id: 'city',
        label: `Cidade: ${filters.city}`,
        key: 'city',
      });
    }

    return chips;
  }, [filters]);

  const hasActiveFilters = activeFilters.length > 0;

  return {
    activeFilters,
    hasActiveFilters,
  };
};
