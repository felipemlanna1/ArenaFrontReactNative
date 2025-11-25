import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '@/components/ui/text';
import { ExploreFilterProps, FilterOption } from './typesExploreFilter';
import { useExploreFilter } from './useExploreFilter';
import { styles } from './stylesExploreFilter';

const FILTER_OPTIONS: FilterOption[] = [
  { value: 'friends', label: 'Amigos' },
  { value: 'groups', label: 'Grupos' },
  { value: 'events', label: 'Eventos' },
];

export const ExploreFilter: React.FC<ExploreFilterProps> = ({
  value,
  filterCounts,
  onChange,
  testID = 'explore-filter',
}) => {
  const { handlePress } = useExploreFilter({ onChange });

  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.filtersRow}>
        {FILTER_OPTIONS.map((option, index) => {
          const isActive = value === option.value;
          const count = filterCounts[option.value];
          const isLast = index === FILTER_OPTIONS.length - 1;

          return (
            <React.Fragment key={option.value}>
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  isActive && styles.filterButtonActive,
                ]}
                onPress={() => handlePress(option.value)}
                testID={`${testID}-${option.value}`}
              >
                <Text variant={isActive ? 'bodyPrimary' : 'bodySecondary'}>
                  {option.label}
                </Text>
                <Text variant="captionSecondary" style={styles.countText}>
                  {count}
                </Text>
              </TouchableOpacity>
              {!isLast && <View style={styles.divider} />}
            </React.Fragment>
          );
        })}
      </View>
    </View>
  );
};
