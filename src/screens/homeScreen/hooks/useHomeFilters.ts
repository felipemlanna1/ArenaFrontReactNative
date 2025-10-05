import { useState, useCallback, useMemo } from 'react';
import { FILTER_DEFAULTS } from '@/constants/filterDefaults';
import { EventsFilter } from '@/services/events/typesEvents';

interface ActiveFilters {
  sportIds?: string[];
  hasAvailableSpots?: boolean;
  city?: string;
  state?: string;
  priceMin?: number;
  priceMax?: number;
  isFree?: boolean;
  startDateFrom?: string;
  startDateTo?: string;
}

interface UseHomeFiltersReturn {
  activeFilters: ActiveFilters;
  sortBy: 'date' | 'distance' | 'price' | 'name';
  sortOrder: 'asc' | 'desc';
  searchTerm: string;
  activeFiltersCount: number;
  setActiveFilters: (filters: ActiveFilters) => void;
  setSortBy: (sort: 'date' | 'distance' | 'price' | 'name') => void;
  setSortOrder: (order: 'asc' | 'desc') => void;
  setSearchTerm: (term: string) => void;
  clearFilters: () => void;
  buildApiFilters: () => EventsFilter;
}

export const useHomeFilters = (): UseHomeFiltersReturn => {
  // ⭐ REGRA: Inicialização padrão - TODOS os eventos com vagas disponíveis
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    hasAvailableSpots: FILTER_DEFAULTS.FILTERS.HAS_AVAILABLE_SPOTS,
  });

  const [sortBy, setSortBy] = useState<'date' | 'distance' | 'price' | 'name'>(
    'date'
  );
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(
    FILTER_DEFAULTS.SORT.DEFAULT_SORT_ORDER
  );
  const [searchTerm, setSearchTerm] = useState('');

  // Contar filtros ativos (exceto hasAvailableSpots que é padrão)
  const activeFiltersCount = useMemo(() => {
    let count = 0;

    if (activeFilters.sportIds && activeFilters.sportIds.length > 0) count++;
    if (activeFilters.city || activeFilters.state) count++;
    if (
      activeFilters.priceMin !== undefined ||
      activeFilters.priceMax !== undefined ||
      activeFilters.isFree
    ) {
      count++;
    }
    if (activeFilters.startDateFrom || activeFilters.startDateTo) count++;

    return count;
  }, [activeFilters]);

  // Limpar todos os filtros (volta ao estado inicial)
  const clearFilters = useCallback(() => {
    setActiveFilters({
      hasAvailableSpots: FILTER_DEFAULTS.FILTERS.HAS_AVAILABLE_SPOTS,
    });
    setSortBy('date');
    setSortOrder(FILTER_DEFAULTS.SORT.DEFAULT_SORT_ORDER);
    setSearchTerm('');
  }, []);

  // ⭐ REGRA: Construir filtros para API com defaults obrigatórios
  const buildApiFilters = useCallback((): EventsFilter => {
    const nowISOString = new Date().toISOString();

    return {
      search: searchTerm || undefined,
      sportIds: activeFilters.sportIds,
      startDateFrom: activeFilters.startDateFrom || nowISOString,
      startDateTo: activeFilters.startDateTo,
      status: ['PUBLISHED'] as const,
      priceMin: activeFilters.priceMin,
      priceMax: activeFilters.priceMax,
      isFree: activeFilters.isFree,
      hasAvailableSpots: activeFilters.hasAvailableSpots,
      city: activeFilters.city,
      state: activeFilters.state,
      limit: FILTER_DEFAULTS.PAGINATION.DEFAULT_LIMIT,
      sortBy: (sortBy === 'date' ? 'startDate' : sortBy) as EventsFilter['sortBy'],
      sortOrder,
    };
  }, [searchTerm, activeFilters, sortBy, sortOrder]);

  return {
    activeFilters,
    sortBy,
    sortOrder,
    searchTerm,
    activeFiltersCount,
    setActiveFilters,
    setSortBy,
    setSortOrder,
    setSearchTerm,
    clearFilters,
    buildApiFilters,
  };
};
