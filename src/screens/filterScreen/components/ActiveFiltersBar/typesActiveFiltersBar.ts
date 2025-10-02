import { FilterScreenState } from '@/screens/filterScreen/typesFilterScreen';

export interface ActiveFiltersBarProps {
  filters: FilterScreenState;
  filterCount: number;
  onClearAll: () => void;
  onRemoveFilter: (key: keyof FilterScreenState, value?: string) => void;
  testID?: string;
}

export interface ActiveFilterChip {
  id: string;
  label: string;
  key: keyof FilterScreenState;
  value?: string;
}

export interface UseActiveFiltersBarProps {
  filters: FilterScreenState;
}

export interface UseActiveFiltersBarReturn {
  activeFilters: ActiveFilterChip[];
  hasActiveFilters: boolean;
}
