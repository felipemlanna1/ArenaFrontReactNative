import { ViewStyle } from 'react-native';

export interface IBGECity {
  id: number;
  nome: string;
}

export interface CityDropdownProps {
  stateUF?: string;
  value?: string;
  onChange: (city: string) => void;
  label?: string;
  error?: string | boolean;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  testID?: string;
  containerStyle?: ViewStyle;
}

export interface UseCityDropdownProps {
  stateUF?: string;
  value?: string;
  onChange: (city: string) => void;
  disabled?: boolean;
}

export interface UseCityDropdownReturn {
  isOpen: boolean;
  cities: string[];
  isLoading: boolean;
  loadError: string | null;
  openModal: () => void;
  closeModal: () => void;
  selectCity: (city: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredCities: string[];
}
