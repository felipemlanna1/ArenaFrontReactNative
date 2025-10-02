import React, { useCallback } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from '@/components/ui/text';
import {
  ActiveFiltersBarProps,
  ActiveFilterChip,
} from './typesActiveFiltersBar';
import { useActiveFiltersBar } from './useActiveFiltersBar';
import { styles } from './stylesActiveFiltersBar';
import { FilterScreenState } from '@/screens/filterScreen/typesFilterScreen';

export const ActiveFiltersBar: React.FC<ActiveFiltersBarProps> = ({
  filters,
  filterCount,
  onClearAll,
  onRemoveFilter,
  testID = 'active-filters-bar',
}) => {
  const { activeFilters, hasActiveFilters } = useActiveFiltersBar({
    filters,
  });

  const handleRemoveFilter = useCallback(
    (chip: ActiveFilterChip) => {
      if (chip.value) {
        onRemoveFilter(chip.key, chip.value);
      } else {
        const resetValue = getResetValue(chip.key);
        onRemoveFilter(chip.key, resetValue);
      }
    },
    [onRemoveFilter]
  );

  if (!hasActiveFilters) {
    return null;
  }

  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.header}>
        <Text variant="bodySecondary">
          {filterCount} {filterCount === 1 ? 'filtro ativo' : 'filtros ativos'}
        </Text>
        <TouchableOpacity
          onPress={onClearAll}
          style={styles.clearAllButton}
          testID={`${testID}-clear-all`}
        >
          <Text variant="bodyPrimary">Limpar tudo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.chipsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.chipsScrollView}
          contentContainerStyle={styles.chipsContent}
        >
          {activeFilters.map(chip => (
            <View key={chip.id} style={styles.chip}>
              <Text variant="bodySecondary" style={styles.chipLabel}>
                {chip.label}
              </Text>
              <TouchableOpacity
                onPress={() => handleRemoveFilter(chip)}
                style={styles.chipCloseButton}
                testID={`${testID}-chip-${chip.id}-remove`}
              >
                <Text variant="bodySecondary" style={styles.chipCloseIcon}>
                  ×
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const getResetValue = (key: keyof FilterScreenState): string | undefined => {
  switch (key) {
    case 'priceMin':
    case 'priceMax':
    case 'startDateFrom':
    case 'startDateTo':
    case 'city':
    case 'state':
    case 'isFree':
    case 'hasAvailableSpots':
      return undefined;
    default:
      return undefined;
  }
};
