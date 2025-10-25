export interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchPlaceholder?: string;
  selectedCity: string;
  onCityChange: (city: string) => void;
  selectedState: string;
  onStateChange: (state: string) => void;
  selectedSportId: string | undefined;
  onSportChange: (sportId: string | undefined) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}
