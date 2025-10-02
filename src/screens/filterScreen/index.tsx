import React, { useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/typesNavigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { FilterSection } from './components/FilterSection';
import { PriceRangeFilter } from './components/PriceRangeFilter';
import { DateRangeFilter } from './components/DateRangeFilter';
import { ActiveFiltersBar } from './components/ActiveFiltersBar';
import { useFilterScreen } from './hooks/useFilterScreen';
import { styles } from './stylesFilterScreen';

type FilterScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'FilterScreen'
>;

export const FilterScreen: React.FC<FilterScreenProps> = ({
  route,
  navigation,
}) => {
  const { currentFilters, onApplyFilters } = route.params;
  const {
    filters,
    updateFilter,
    toggleArrayFilter,
    clearFilters,
    applyFilters,
    filterCount,
    isApplying,
  } = useFilterScreen({
    currentFilters,
    onApplyFilters,
  });

  const handleRemoveFilter = useCallback(
    (key: keyof typeof filters, value?: string) => {
      if (value) {
        toggleArrayFilter(key, value);
      } else {
        switch (key) {
          case 'priceMin':
          case 'priceMax':
            updateFilter(key, null);
            break;
          case 'startDateFrom':
          case 'startDateTo':
            updateFilter(key, null);
            break;
          case 'city':
          case 'state':
            updateFilter(key, '');
            break;
          case 'isFree':
          case 'hasAvailableSpots':
            updateFilter(key, false);
            break;
          default:
            break;
        }
      }
    },
    [updateFilter, toggleArrayFilter]
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ActiveFiltersBar
        filters={filters}
        filterCount={filterCount.total}
        onClearAll={clearFilters}
        onRemoveFilter={handleRemoveFilter}
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <FilterSection
            title="Preço"
            count={filterCount.byCategory.price}
            testID="filter-price"
          >
            <PriceRangeFilter
              priceMin={filters.priceMin}
              priceMax={filters.priceMax}
              isFree={filters.isFree}
              onPriceMinChange={value => updateFilter('priceMin', value)}
              onPriceMaxChange={value => updateFilter('priceMax', value)}
              onIsFreeChange={value => updateFilter('isFree', value)}
            />
          </FilterSection>
        </View>

        <View style={styles.section}>
          <FilterSection
            title="Data"
            count={filterCount.byCategory.date}
            testID="filter-date"
          >
            <DateRangeFilter
              startDateFrom={filters.startDateFrom}
              startDateTo={filters.startDateTo}
              onStartDateFromChange={value =>
                updateFilter('startDateFrom', value)
              }
              onStartDateToChange={value => updateFilter('startDateTo', value)}
            />
          </FilterSection>
        </View>

        <View style={styles.section}>
          <FilterSection
            title="Localização"
            count={filterCount.byCategory.location}
            testID="filter-location"
          >
            <View style={styles.locationInputs}>
              <Input
                label="Cidade"
                value={filters.city}
                onChangeText={value => updateFilter('city', value)}
                placeholder="Digite a cidade"
                testID="filter-city-input"
              />
              <Input
                label="Estado"
                value={filters.state}
                onChangeText={value => updateFilter('state', value)}
                placeholder="Digite o estado"
                testID="filter-state-input"
              />
            </View>
          </FilterSection>
        </View>

        <View style={styles.section}>
          <FilterSection
            title="Disponibilidade"
            count={filters.hasAvailableSpots ? 1 : 0}
            testID="filter-availability"
          >
            <View style={styles.checkboxContainer}>
              <Checkbox
                checked={filters.hasAvailableSpots}
                onPress={() =>
                  updateFilter('hasAvailableSpots', !filters.hasAvailableSpots)
                }
                label="Apenas eventos com vagas disponíveis"
                testID="filter-has-spots-checkbox"
              />
            </View>
          </FilterSection>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerRow}>
          <View style={styles.footerButton}>
            <Button
              variant="subtle"
              onPress={clearFilters}
              disabled={isApplying || filterCount.total === 0}
              testID="filter-clear-button"
            >
              Limpar Filtros
            </Button>
          </View>
          <View style={styles.footerButton}>
            <Button
              variant="primary"
              onPress={async () => {
                await applyFilters();
                navigation.goBack();
              }}
              disabled={isApplying}
              testID="filter-apply-button"
            >
              {isApplying ? 'Aplicando...' : 'Aplicar Filtros'}
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
