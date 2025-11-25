export interface SortModalProps {
  visible: boolean;
  currentSort: {
    sortBy: 'date' | 'distance' | 'price' | 'name';
    sortOrder: 'asc' | 'desc';
  };
  onClose: () => void;
  onApply: (
    sortBy: 'date' | 'distance' | 'price' | 'name',
    sortOrder: 'asc' | 'desc'
  ) => void;
  testID?: string;
}

export interface SortOption {
  id: 'date' | 'distance' | 'price' | 'name';
  label: string;
}
