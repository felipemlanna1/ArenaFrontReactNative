import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '@/components/ui/text';
import { EventFilterType, FilterCount } from '../../typesEventsScreen';
import { styles } from './stylesEventFilter';

interface FilterOption {
  value: EventFilterType;
  label: string;
}

const FILTER_OPTIONS: FilterOption[] = [
  { value: 'upcoming', label: 'Próximos' },
  { value: 'organizing', label: 'Organizando' },
  { value: 'participating', label: 'Participando' },
  { value: 'invited', label: 'Convidado' },
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
                onPress={() => onChange(option.value)}
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
