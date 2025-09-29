import { InputProps } from '../input/typesInput';

export interface SearchInputProps
  extends Omit<InputProps, 'leftIcon' | 'rightIcon'> {
  onSearch?: (query: string) => void;
  onClear?: () => void;
  debounceMs?: number;
  showSearchIcon?: boolean;
  showClearButton?: boolean;
  searchIconPosition?: 'left' | 'right';
  autoSearch?: boolean;
  minSearchLength?: number;
  searchTestID?: string;
  clearTestID?: string;
}

export interface UseSearchInputParams {
  value: string;
  onSearch?: (query: string) => void;
  onClear?: () => void;
  debounceMs: number;
  autoSearch: boolean;
  minSearchLength: number;
  onChangeText: (text: string) => void;
}

export interface UseSearchInputReturn {
  handleChangeText: (text: string) => void;
  handleClear: () => void;
  handleSearch: () => void;
  isSearching: boolean;
  canSearch: boolean;
  shouldShowClear: boolean;
}

export interface SearchIconProps {
  size: number;
  color: string;
  isSearching?: boolean;
  disabled?: boolean;
}

export interface ClearIconProps {
  size: number;
  color: string;
  disabled?: boolean;
}
