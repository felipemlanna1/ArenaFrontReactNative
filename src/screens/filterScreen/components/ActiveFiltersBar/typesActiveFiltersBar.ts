export interface ActiveFilters {
  sportIds?: string[];
  hasAvailableSpots?: boolean;
  city?: string;
  priceMin?: number;
  priceMax?: number;
  isFree?: boolean;
  startDateFrom?: string;
  startDateTo?: string;
  eventFilter?: 'all' | 'organizing' | 'participating' | 'invited';
}

export interface ActiveFiltersBarProps {
  filters: ActiveFilters;
  filterCount: number;
  onClearAll: () => void;
  onRemoveFilter: (key: keyof ActiveFilters, value?: string) => void;
  testID?: string;
}

export interface ActiveFilterChip {
  id: string;
  label: string;
  key: keyof ActiveFilters;
  value?: string;
}

export interface UseActiveFiltersBarProps {
  filters: ActiveFilters;
}

export interface UseActiveFiltersBarReturn {
  activeFilters: ActiveFilterChip[];
  hasActiveFilters: boolean;
}
