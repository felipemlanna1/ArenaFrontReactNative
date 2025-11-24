import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { ArenaColors } from '@/constants';
import { useSports } from '@/contexts/SportsContext';
import { Sport } from '@/types/sport';
import { SportsFilterModal } from './SportsFilterModal';
import { CityFilterModal } from './CityFilterModal';
import { FilterBarProps } from './typesFilterBar';
import { styles } from './stylesFilterBar';

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  searchPlaceholder = 'Buscar...',
  selectedCity,
  onCityChange,
  selectedState,
  onStateChange,
  selectedSportId,
  onSportChange,
  onClearFilters,
  hasActiveFilters,
}) => {
  const { sports: availableSports } = useSports();
  const [showSportsModal, setShowSportsModal] = useState(false);
  const [showCityModal, setShowCityModal] = useState(false);

  const selectedSport = availableSports.find(
    (s: Sport) => s.id === selectedSportId
  );
  const hasCityFilter = selectedCity !== '' || selectedState !== '';

  return (
    <View style={styles.container}>
      <Input
        value={searchQuery}
        onChangeText={onSearchChange}
        placeholder={searchPlaceholder}
        type="search"
        clearable={true}
      />

      <View style={styles.filtersRow}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedSportId && styles.filterButtonActive,
          ]}
          onPress={() => setShowSportsModal(true)}
        >
          <Ionicons
            name="football-outline"
            size={18}
            color={
              selectedSportId
                ? ArenaColors.brand.primary
                : ArenaColors.neutral.medium
            }
          />
          <Text
            variant="bodySecondary"
            style={
              selectedSportId
                ? styles.filterButtonTextActive
                : styles.filterButtonText
            }
          >
            {selectedSport ? selectedSport.name : 'Esporte'}
          </Text>
          {selectedSportId && (
            <TouchableOpacity
              onPress={e => {
                e.stopPropagation();
                onSportChange(undefined);
              }}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons
                name="close-circle"
                size={16}
                color={ArenaColors.brand.primary}
              />
            </TouchableOpacity>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            hasCityFilter && styles.filterButtonActive,
          ]}
          onPress={() => setShowCityModal(true)}
        >
          <Ionicons
            name="location-outline"
            size={18}
            color={
              hasCityFilter
                ? ArenaColors.brand.primary
                : ArenaColors.neutral.medium
            }
          />
          <Text
            variant="bodySecondary"
            style={
              hasCityFilter
                ? styles.filterButtonTextActive
                : styles.filterButtonText
            }
          >
            {selectedCity || 'Cidade'}
          </Text>
          {hasCityFilter && (
            <TouchableOpacity
              onPress={e => {
                e.stopPropagation();
                onCityChange('');
                onStateChange('');
              }}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons
                name="close-circle"
                size={16}
                color={ArenaColors.brand.primary}
              />
            </TouchableOpacity>
          )}
        </TouchableOpacity>

        {hasActiveFilters && (
          <TouchableOpacity style={styles.clearButton} onPress={onClearFilters}>
            <Text variant="bodySecondary" style={styles.clearButtonText}>
              Limpar
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <SportsFilterModal
        visible={showSportsModal}
        onClose={() => setShowSportsModal(false)}
        selectedSportId={selectedSportId}
        onSelectSport={onSportChange}
        sports={availableSports}
      />

      <CityFilterModal
        visible={showCityModal}
        onClose={() => setShowCityModal(false)}
        selectedCity={selectedCity}
        selectedState={selectedState}
        onCityChange={onCityChange}
        onStateChange={onStateChange}
      />
    </View>
  );
};

export type { FilterBarProps } from './typesFilterBar';
