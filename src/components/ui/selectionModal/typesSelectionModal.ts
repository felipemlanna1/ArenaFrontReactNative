import { ReactElement } from 'react';

export interface SelectionModalProps<T = unknown> {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  items: T[];
  renderItem: (item: T) => ReactElement;
  keyExtractor: (item: T) => string;
  emptyMessage?: string;
  errorMessage?: string | null;
  isLoading?: boolean;
  testID?: string;
  showSearch?: boolean;
}
