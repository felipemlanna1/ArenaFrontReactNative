import React, { useState } from 'react';
import { View, TouchableOpacity, TextStyle } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { ArenaColors, ArenaSpacing } from '@/constants';
import { StyleSheet } from 'react-native';
import { useUserSports } from '@/hooks/useUserSports';
import { Sport } from '@/types/sport';
import { SportsFilterModal } from './SportsFilterModal';
import { CityFilterModal } from './CityFilterModal';

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

export const FriendsFilterBar: React.FC<FriendsFilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCity,
  onCityChange,
  selectedState,
  onStateChange,
  selectedSportId,
  onSportChange,
  onClearFilters,
  hasActiveFilters,
}) => {
  const { availableSports } = useUserSports();
  const [showSportsModal, setShowSportsModal] = useState(false);
  const [showCityModal, setShowCityModal] = useState(false);

  const selectedSport = availableSports.find(
    (s: Sport) => s.id === selectedSportId
  );
  const hasCityFilter = selectedCity !== '' || selectedState !== '';

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <Input
        value={searchQuery}
        onChangeText={onSearchChange}
        placeholder="Buscar amigos..."
      />

      {/* Filter Buttons Row */}
      <View style={styles.filtersRow}>
        {/* Sport Filter Button */}
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

        {/* City Filter Button */}
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

        {/* Clear All Filters Button */}
        {hasActiveFilters && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={onClearFilters}
          >
            <Text variant="bodySecondary" style={styles.clearButtonText}>
              Limpar
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Modals */}
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

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.md,
    gap: ArenaSpacing.md,
    backgroundColor: ArenaColors.neutral.darkest,
  },
  filtersRow: {
    flexDirection: 'row',
    gap: ArenaSpacing.sm,
    flexWrap: 'wrap',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.xs,
    paddingVertical: ArenaSpacing.sm,
    paddingHorizontal: ArenaSpacing.md,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: ArenaColors.neutral.darkSubtleBorder,
    backgroundColor: ArenaColors.neutral.dark,
  },
  filterButtonActive: {
    borderColor: ArenaColors.brand.primary,
    backgroundColor: ArenaColors.brand.primarySubtle,
  },
  filterButtonText: {
    color: ArenaColors.neutral.medium,
  } as TextStyle,
  filterButtonTextActive: {
    color: ArenaColors.brand.primary,
  } as TextStyle,
  clearButton: {
    paddingVertical: ArenaSpacing.sm,
    paddingHorizontal: ArenaSpacing.md,
    borderRadius: 20,
    backgroundColor: ArenaColors.semantic.errorSubtle,
  },
  clearButtonText: {
    color: ArenaColors.semantic.error,
  } as TextStyle,
});
