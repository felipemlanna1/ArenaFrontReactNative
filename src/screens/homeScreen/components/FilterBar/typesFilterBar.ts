export type SortOrder = 'asc' | 'desc';
export type SortField = 'date' | 'name' | 'relevance';

export interface FilterBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSortPress: () => void;
  onFilterPress: () => void;
  sortOrder?: SortOrder;
  sortField?: SortField;
  filterCount?: number;
  placeholder?: string;
  testID?: string;
}

export interface UseFilterBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSortPress: () => void;
  onFilterPress: () => void;
}

export interface UseFilterBarReturn {
  handleSearchClear: () => void;
  handleSearchFocus: () => void;
  handleSearchBlur: () => void;
  isFocused: boolean;
}
