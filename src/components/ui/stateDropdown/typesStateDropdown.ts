import { ViewStyle } from 'react-native';

export interface BrazilianState {
  uf: string;
  name: string;
}

export interface StateDropdownProps {
  value?: string;
  onChange: (uf: string) => void;
  label?: string;
  error?: string | boolean;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  testID?: string;
  containerStyle?: ViewStyle;
}

export interface UseStateDropdownProps {
  value?: string;
  onChange: (uf: string) => void;
  disabled?: boolean;
}

export interface UseStateDropdownReturn {
  isOpen: boolean;
  selectedState: BrazilianState | undefined;
  states: BrazilianState[];
  filteredStates: BrazilianState[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  openModal: () => void;
  closeModal: () => void;
  selectState: (uf: string) => void;
}
