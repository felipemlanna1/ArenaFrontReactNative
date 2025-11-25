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
    activeTab,
    updateFilter,
    toggleSportId,
    setEventFilter,
    clearFilters,
    activeFiltersCount,
  } = useHomeFilters();

  // Tab-specific filters visibility
  const showEventTypeFilter = activeTab === 'events';
  const showPriceFilter = activeTab === 'events';
  const showDateFilter = activeTab === 'events';
  const showAvailabilityFilter = activeTab === 'events';
  const showSportsFilter = true; // All tabs
  const showLocationFilter = true; // All tabs

  const handleRemoveFilter = useCallback(
    (key: string, value?: string) => {
      if (value) {
        toggleSportId(value);
      } else {
        switch (key) {
          case 'sportIds':
            updateFilter('sportIds' as never, [] as never);
            break;
          case 'priceMin':
          case 'priceMax':
            updateFilter(key as never, undefined as never);
            break;
          case 'startDateFrom':
          case 'startDateTo':
            updateFilter(key as never, undefined as never);
            break;
          case 'state':
            updateFilter('state' as never, undefined as never);
            updateFilter('city' as never, undefined as never);
            break;
          case 'city':
            updateFilter('city' as never, undefined as never);
            break;
          case 'isFree':
          case 'hasAvailableSpots':
            updateFilter(key as never, false as never);
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
          {showEventTypeFilter && (
            <View style={styles.section}>
              <FilterSection
                title="Tipo de Evento"
                count={
                  'eventFilter' in activeFilters &&
                  activeFilters.eventFilter !== 'all'
                    ? 1
                    : 0
                }
                testID="filter-event-type"
              >
                <EventFilterSection
                  value={
                    'eventFilter' in activeFilters
                      ? activeFilters.eventFilter || 'all'
                      : 'all'
                  }
                  onChange={setEventFilter}
                />
              </FilterSection>
            </View>
          )}

          {showSportsFilter && (
            <View style={styles.section}>
              <FilterSection
                title="Esportes"
                count={activeFilters.sportIds?.length || 0}
                defaultExpanded
                testID="filter-sports"
              >
                <SportsFilter
                  selectedSportIds={activeFilters.sportIds || []}
                  onSportsChange={value =>
                    updateFilter('sportIds' as never, value as never)
                  }
                />
              </FilterSection>
            </View>
          )}

          {showPriceFilter && (
            <View style={styles.section}>
              <FilterSection
                title="Preço"
                count={
                  ('priceMin' in activeFilters &&
                    activeFilters.priceMin !== undefined) ||
                  ('priceMax' in activeFilters &&
                    activeFilters.priceMax !== undefined) ||
                  ('isFree' in activeFilters && activeFilters.isFree)
                    ? 1
                    : 0
                }
                testID="filter-price"
              >
                <PriceRangeFilter
                  priceMin={
                    'priceMin' in activeFilters
                      ? activeFilters.priceMin ?? null
                      : null
                  }
                  priceMax={
                    'priceMax' in activeFilters
                      ? activeFilters.priceMax ?? null
                      : null
                  }
                  isFree={
                    'isFree' in activeFilters ? activeFilters.isFree ?? false : false
                  }
                  onPriceMinChange={value =>
                    updateFilter('priceMin' as never, (value ?? undefined) as never)
                  }
                  onPriceMaxChange={value =>
                    updateFilter('priceMax' as never, (value ?? undefined) as never)
                  }
                  onIsFreeChange={value =>
                    updateFilter('isFree' as never, value as never)
                  }
                />
              </FilterSection>
            </View>
          )}

          {showDateFilter && (
            <View style={styles.section}>
              <FilterSection
                title="Data"
                count={
                  ('startDateFrom' in activeFilters &&
                    activeFilters.startDateFrom) ||
                  ('startDateTo' in activeFilters && activeFilters.startDateTo)
                    ? 1
                    : 0
                }
                testID="filter-date"
              >
                <DateRangeFilter
                  startDateFrom={
                    'startDateFrom' in activeFilters &&
                    activeFilters.startDateFrom
                      ? new Date(activeFilters.startDateFrom)
                      : null
                  }
                  startDateTo={
                    'startDateTo' in activeFilters && activeFilters.startDateTo
                      ? new Date(activeFilters.startDateTo)
                      : null
                  }
                  onStartDateFromChange={value =>
                    updateFilter(
                      'startDateFrom' as never,
                      (value?.toISOString() ?? undefined) as never
                    )
                  }
                  onStartDateToChange={value =>
                    updateFilter(
                      'startDateTo' as never,
                      (value?.toISOString() ?? undefined) as never
                    )
                  }
                />
              </FilterSection>
            </View>
          )}

          {showLocationFilter && (
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
                      updateFilter('state' as never, (value || undefined) as never);
                      if (
                        activeFilters.state &&
                        activeFilters.state !== value
                      ) {
                        updateFilter('city' as never, undefined as never);
                      }
                    }}
                    label="Estado"
                    testID="filter-state-dropdown"
                  />

                  {activeFilters.state && (
                    <CityDropdown
                      value={activeFilters.city ?? ''}
                      onChange={value =>
                        updateFilter('city' as never, (value || undefined) as never)
                      }
                      stateUF={activeFilters.state}
                      label="Cidade"
                      testID="filter-city-dropdown"
                    />
                  )}
                </View>
              </FilterSection>
            </View>
          )}

          {showAvailabilityFilter && (
            <View style={styles.section}>
              <FilterSection
                title="Disponibilidade"
                count={
                  'hasAvailableSpots' in activeFilters &&
                  activeFilters.hasAvailableSpots
                    ? 1
                    : 0
                }
                testID="filter-availability"
              >
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    checked={
                      'hasAvailableSpots' in activeFilters
                        ? activeFilters.hasAvailableSpots || false
                        : false
                    }
                    onPress={() =>
                      updateFilter(
                        'hasAvailableSpots' as never,
                        ('hasAvailableSpots' in activeFilters
                          ? !activeFilters.hasAvailableSpots
                          : true) as never
                      )
                    }
                    label="Apenas eventos com vagas disponíveis"
                    testID="filter-has-spots-checkbox"
                  />
                </View>
              </FilterSection>
            </View>
          )}
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
