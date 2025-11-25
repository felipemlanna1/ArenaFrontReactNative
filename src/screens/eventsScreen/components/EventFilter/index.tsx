import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '@/components/ui/text';
import {
  EventFilterType,
  FilterCount,
} from '@/screens/eventsScreen/typesEventsScreen';
import { FilterBadge } from './components/FilterBadge';
import { styles } from './stylesEventFilter';

interface FilterOption {
  value: EventFilterType;
  label: string;
}

const FILTER_OPTIONS: FilterOption[] = [
  { value: 'upcoming', label: 'Próximos' },
  { value: 'organizing', label: 'Meus' },
  { value: 'participating', label: 'Vou' },
  { value: 'invited', label: 'Convites' },
];

export interface EventFilterProps {
  value: EventFilterType;
  filterCounts: FilterCount;
  onChange: (value: EventFilterType) => void;
  testID?: string;
}

export const EventFilter: React.FC<EventFilterProps> = ({
  value,
  filterCounts,
  onChange,
  testID = 'event-filter',
}) => {
  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.filtersRow}>
        {FILTER_OPTIONS.map(option => {
          const isActive = value === option.value;
          const count = filterCounts[option.value];

          return (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.filterButton,
                isActive && styles.filterButtonActive,
              ]}
              onPress={() => onChange(option.value)}
              testID={`${testID}-${option.value}`}
            >
              <Text variant="bodyBold">{option.label}</Text>
              <FilterBadge
                count={count}
                isActive={isActive}
                testID={`${testID}-${option.value}-badge`}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
