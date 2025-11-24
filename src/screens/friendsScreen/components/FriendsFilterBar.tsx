import React from 'react';
import { FilterBar } from '@/components/filterBar';

interface FriendsFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCity: string;
  onCityChange: (city: string) => void;
  selectedState: string;
  onStateChange: (state: string) => void;
  selectedSportId: string | undefined;
  onSportChange: (sportId: string | undefined) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export const FriendsFilterBar: React.FC<FriendsFilterBarProps> = props => {
  return (
    <FilterBar {...props} searchPlaceholder="Buscar por nome ou esporte" />
  );
};
