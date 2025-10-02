import React from 'react';
import { View, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Input } from '@/components/ui/input';
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
  const {
    formattedStartFrom,
    formattedStartTo,
    showFromPicker,
    showToPicker,
    hasError,
    errorMessage,
    handleFromPress,
    handleToPress,
    handleFromDateChange,
    handleToDateChange,
    handleQuickDateSelect,
    handleClearDates,
  } = useDateRangeFilter({
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
          <Input
            label="Data inicial"
            value={formattedStartFrom}
            onChangeText={() => {}}
            onPressIn={handleFromPress}
            placeholder="DD/MM/AAAA"
            editable={false}
            testID={`${testID}-from`}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Input
            label="Data final"
            value={formattedStartTo}
            onChangeText={() => {}}
            onPressIn={handleToPress}
            placeholder="DD/MM/AAAA"
            editable={false}
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
            <TouchableOpacity
              key={shortcut.id}
              style={styles.shortcutButton}
              onPress={() => handleQuickDateSelect(shortcut.id)}
              testID={`${testID}-shortcut-${shortcut.id}`}
            >
              <Text variant="bodySecondary">{shortcut.label}</Text>
            </TouchableOpacity>
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

      {showFromPicker && (
        <DateTimePicker
          value={startDateFrom || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(_event: unknown, date?: Date) => {
            if (date) handleFromDateChange(date);
          }}
          testID={`${testID}-from-picker`}
        />
      )}

      {showToPicker && (
        <DateTimePicker
          value={startDateTo || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(_event: unknown, date?: Date) => {
            if (date) handleToDateChange(date);
          }}
          testID={`${testID}-to-picker`}
        />
      )}
    </View>
  );
};
