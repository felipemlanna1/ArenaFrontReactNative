import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '@/components/ui/text';
import { EventTypeFilterProps, FilterOption } from './typesEventTypeFilter';
import { useEventTypeFilter } from './useEventTypeFilter';
import { styles } from './stylesEventTypeFilter';

const FILTER_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'Todos' },
  { value: 'organizing', label: 'Organizando' },
  { value: 'participating', label: 'Participando' },
  { value: 'invited', label: 'Convidado' },
];

export const EventTypeFilter: React.FC<EventTypeFilterProps> = ({
  value,
  filterCounts,
  onChange,
  testID = 'event-type-filter',
}) => {
  const { handlePress } = useEventTypeFilter({ onChange });

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
                <Text variant={isActive ? 'labelPrimary' : 'labelSecondary'}>
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
