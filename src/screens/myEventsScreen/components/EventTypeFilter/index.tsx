import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
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
  onChange,
  testID = 'event-type-filter',
}) => {
  const { handlePress } = useEventTypeFilter({ onChange });

  return (
    <View style={styles.container} testID={testID}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {FILTER_OPTIONS.map(option => {
          const isActive = value === option.value;
          return (
            <TouchableOpacity
              key={option.value}
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
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
