import React, { useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/typesNavigation';
import { useHomeFilters } from '@/contexts/HomeFiltersContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
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
          case 'priceMin':
          case 'priceMax':
            updateFilter(key, undefined);
            break;
          case 'startDateFrom':
          case 'startDateTo':
            updateFilter(key, undefined);
            break;
          case 'city':
            updateFilter(key, '');
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
                updateFilter('startDateFrom', value?.toISOString() ?? undefined)
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
            count={activeFilters.city ? 1 : 0}
            testID="filter-location"
          >
            <View style={styles.locationInputs}>
              <Input
                label="Cidade"
                value={activeFilters.city ?? ''}
                onChangeText={value => updateFilter('city', value || undefined)}
                placeholder="Digite a cidade"
                testID="filter-city-input"
                fullWidth
              />
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
