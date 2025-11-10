import React, { useCallback } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/typesNavigation';
import { useHomeFilters } from '@/contexts/HomeFiltersContext';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { StateDropdown } from '@/components/ui/stateDropdown';
import { CityDropdown } from '@/components/ui/cityDropdown';
import { FilterSection } from './components/FilterSection';
import { EventFilterSection } from './components/EventFilterSection';
import { SportsFilter } from './components/SportsFilter';
import { PriceRangeFilter } from './components/PriceRangeFilter';
import { DateRangeFilter } from './components/DateRangeFilter';
import { ActiveFiltersBar } from './components/ActiveFiltersBar';
import { styles } from './stylesFilterScreen';

type FilterScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'FilterScreen'
>;

export const FilterScreen: React.FC<FilterScreenProps> = ({ navigation }) => {
  const {
    activeFilters,
    updateFilter,
    toggleSportId,
    setEventFilter,
    clearFilters,
    activeFiltersCount,
  } = useHomeFilters();

  const handleRemoveFilter = useCallback(
    (key: keyof typeof activeFilters, value?: string) => {
      if (value) {
        toggleSportId(value);
      } else {
        switch (key) {
          case 'sportIds':
            updateFilter(key, []);
            break;
          case 'priceMin':
          case 'priceMax':
            updateFilter(key, undefined);
            break;
          case 'startDateFrom':
          case 'startDateTo':
            updateFilter(key, undefined);
            break;
          case 'state':
            updateFilter('state', undefined);
            updateFilter('city', undefined);
            break;
          case 'city':
            updateFilter(key, undefined);
            break;
          case 'isFree':
          case 'hasAvailableSpots':
            updateFilter(key, false);
            break;
          case 'eventFilter':
            setEventFilter('all');
            break;
          default:
            break;
        }
      }
    },
    [updateFilter, toggleSportId, setEventFilter]
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ActiveFiltersBar
        filters={activeFilters}
        filterCount={activeFiltersCount}
        onClearAll={clearFilters}
        onRemoveFilter={handleRemoveFilter}
      />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.section}>
            <FilterSection
              title="Tipo de Evento"
              count={activeFilters.eventFilter !== 'all' ? 1 : 0}
              testID="filter-event-type"
            >
              <EventFilterSection
                value={activeFilters.eventFilter || 'all'}
                onChange={setEventFilter}
              />
            </FilterSection>
          </View>

          <View style={styles.section}>
            <FilterSection
              title="Esportes"
              count={activeFilters.sportIds?.length || 0}
              defaultExpanded
              testID="filter-sports"
            >
              <SportsFilter
                selectedSportIds={activeFilters.sportIds || []}
                onSportsChange={value => updateFilter('sportIds', value)}
              />
            </FilterSection>
          </View>

          <View style={styles.section}>
            <FilterSection
              title="Preço"
              count={
                activeFilters.priceMin !== undefined ||
                activeFilters.priceMax !== undefined ||
                activeFilters.isFree
                  ? 1
                  : 0
              }
              testID="filter-price"
            >
              <PriceRangeFilter
                priceMin={activeFilters.priceMin ?? null}
                priceMax={activeFilters.priceMax ?? null}
                isFree={activeFilters.isFree ?? false}
                onPriceMinChange={value =>
                  updateFilter('priceMin', value ?? undefined)
                }
                onPriceMaxChange={value =>
                  updateFilter('priceMax', value ?? undefined)
                }
                onIsFreeChange={value => updateFilter('isFree', value)}
              />
            </FilterSection>
          </View>

          <View style={styles.section}>
            <FilterSection
              title="Data"
              count={
                activeFilters.startDateFrom || activeFilters.startDateTo ? 1 : 0
              }
              testID="filter-date"
            >
              <DateRangeFilter
                startDateFrom={
                  activeFilters.startDateFrom
                    ? new Date(activeFilters.startDateFrom)
                    : null
                }
                startDateTo={
                  activeFilters.startDateTo
                    ? new Date(activeFilters.startDateTo)
                    : null
                }
                onStartDateFromChange={value =>
                  updateFilter(
                    'startDateFrom',
                    value?.toISOString() ?? undefined
                  )
                }
                onStartDateToChange={value =>
                  updateFilter('startDateTo', value?.toISOString() ?? undefined)
                }
              />
            </FilterSection>
          </View>

          <View style={styles.section}>
            <FilterSection
              title="Localização"
              count={activeFilters.state || activeFilters.city ? 1 : 0}
              testID="filter-location"
            >
              <View style={styles.locationInputs}>
                <StateDropdown
                  value={activeFilters.state ?? ''}
                  onChange={value => {
                    updateFilter('state', value || undefined);
                    if (activeFilters.state && activeFilters.state !== value) {
                      updateFilter('city', undefined);
                    }
                  }}
                  label="Estado"
                  testID="filter-state-dropdown"
                />

                {activeFilters.state && (
                  <CityDropdown
                    value={activeFilters.city ?? ''}
                    onChange={value => updateFilter('city', value || undefined)}
                    stateUF={activeFilters.state}
                    label="Cidade"
                    testID="filter-city-dropdown"
                  />
                )}
              </View>
            </FilterSection>
          </View>

          <View style={styles.section}>
            <FilterSection
              title="Disponibilidade"
              count={activeFilters.hasAvailableSpots ? 1 : 0}
              testID="filter-availability"
            >
              <View style={styles.checkboxContainer}>
                <Checkbox
                  checked={activeFilters.hasAvailableSpots || false}
                  onPress={() =>
                    updateFilter(
                      'hasAvailableSpots',
                      !activeFilters.hasAvailableSpots
                    )
                  }
                  label="Apenas eventos com vagas disponíveis"
                  testID="filter-has-spots-checkbox"
                />
              </View>
            </FilterSection>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.footer}>
        <Button
          variant="primary"
          onPress={() => navigation.goBack()}
          testID="filter-apply-button"
        >
          Aplicar Filtros
        </Button>
      </View>
    </SafeAreaView>
  );
};
