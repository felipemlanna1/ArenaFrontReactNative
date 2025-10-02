import { useMemo } from 'react';
import {
  UseActiveFiltersBarProps,
  UseActiveFiltersBarReturn,
  ActiveFilterChip,
} from './typesActiveFiltersBar';
import {
  SKILL_LEVEL_OPTIONS,
  PRIVACY_OPTIONS,
  EVENT_STATUS_OPTIONS,
  EVENT_TYPE_OPTIONS,
  SORT_OPTIONS,
} from '@/screens/filterScreen/utils/filterConstants';

const findOptionLabel = (
  options: { id: string; label: string }[],
  value: string
): string => {
  return options.find(opt => opt.id === value)?.label || value;
};

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

export const useActiveFiltersBar = ({
  filters,
}: UseActiveFiltersBarProps): UseActiveFiltersBarReturn => {
  const activeFilters = useMemo((): ActiveFilterChip[] => {
    const chips: ActiveFilterChip[] = [];

    if (filters.skillLevels.length > 0) {
      filters.skillLevels.forEach(level => {
        chips.push({
          id: `skill-${level}`,
          label: findOptionLabel(SKILL_LEVEL_OPTIONS, level),
          key: 'skillLevels',
          value: level,
        });
      });
    }

    if (filters.privacy.length > 0) {
      filters.privacy.forEach(privacy => {
        chips.push({
          id: `privacy-${privacy}`,
          label: findOptionLabel(PRIVACY_OPTIONS, privacy),
          key: 'privacy',
          value: privacy,
        });
      });
    }

    if (filters.status.length > 0) {
      filters.status.forEach(status => {
        chips.push({
          id: `status-${status}`,
          label: findOptionLabel(EVENT_STATUS_OPTIONS, status),
          key: 'status',
          value: status,
        });
      });
    }

    if (filters.eventTypes.length > 0) {
      filters.eventTypes.forEach(type => {
        chips.push({
          id: `type-${type}`,
          label: findOptionLabel(EVENT_TYPE_OPTIONS, type),
          key: 'eventTypes',
          value: type,
        });
      });
    }

    if (filters.priceMin !== null) {
      chips.push({
        id: 'price-min',
        label: `Mín: R$ ${filters.priceMin}`,
        key: 'priceMin',
      });
    }

    if (filters.priceMax !== null) {
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

    if (filters.city.trim()) {
      chips.push({
        id: 'city',
        label: `Cidade: ${filters.city}`,
        key: 'city',
      });
    }

    if (filters.state.trim()) {
      chips.push({
        id: 'state',
        label: `Estado: ${filters.state}`,
        key: 'state',
      });
    }

    if (filters.sortBy !== 'date') {
      chips.push({
        id: 'sort',
        label: `Ordenar: ${findOptionLabel(SORT_OPTIONS, filters.sortBy)}`,
        key: 'sortBy',
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
