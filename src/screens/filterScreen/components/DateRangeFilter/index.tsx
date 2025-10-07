import React from 'react';
import { View } from 'react-native';
import { DatePicker } from '@/components/ui/datePicker';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import {
  DateRangeFilterProps,
  DateShortcutOption,
} from './typesDateRangeFilter';
import { useDateRangeFilter } from './useDateRangeFilter';
import { styles } from './stylesDateRangeFilter';

const DATE_SHORTCUTS: DateShortcutOption[] = [
  { id: 'today', label: 'Hoje' },
  { id: 'this-week', label: 'Esta Semana' },
  { id: 'this-month', label: 'Este Mês' },
  { id: 'next-7-days', label: 'Próximos 7 dias' },
  { id: 'next-30-days', label: 'Próximos 30 dias' },
];

export const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  startDateFrom,
  startDateTo,
  onStartDateFromChange,
  onStartDateToChange,
  testID = 'date-range-filter',
}) => {
  const { hasError, errorMessage, handleQuickDateSelect, handleClearDates } =
    useDateRangeFilter({
      startDateFrom,
      startDateTo,
      onStartDateFromChange,
      onStartDateToChange,
    });

  const hasSelectedDates = startDateFrom !== null || startDateTo !== null;

  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.row}>
        <View style={styles.inputWrapper}>
          <DatePicker
            label="Data inicial"
            variant="date"
            value={startDateFrom}
            onChange={onStartDateFromChange}
            placeholder="DD/MM/AAAA"
            testID={`${testID}-from`}
          />
        </View>
        <View style={styles.inputWrapper}>
          <DatePicker
            label="Data final"
            variant="date"
            value={startDateTo}
            onChange={onStartDateToChange}
            placeholder="DD/MM/AAAA"
            testID={`${testID}-to`}
          />
        </View>
      </View>

      {hasError && (
        <Text variant="captionError" style={styles.errorText}>
          {errorMessage}
        </Text>
      )}

      <View style={styles.shortcutsContainer}>
        <Text variant="bodySecondary" style={styles.shortcutsTitle}>
          Atalhos rápidos
        </Text>
        <View style={styles.shortcutsRow}>
          {DATE_SHORTCUTS.map(shortcut => (
            <Button
              key={shortcut.id}
              variant="outline-light"
              size="xs"
              onPress={() => handleQuickDateSelect(shortcut.id)}
              testID={`${testID}-shortcut-${shortcut.id}`}
            >
              {shortcut.label}
            </Button>
          ))}
        </View>
      </View>

      {hasSelectedDates && (
        <View style={styles.clearButtonWrapper}>
          <Button
            variant="subtle"
            onPress={handleClearDates}
            testID={`${testID}-clear`}
          >
            Limpar datas
          </Button>
        </View>
      )}
    </View>
  );
};
