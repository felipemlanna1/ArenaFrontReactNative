import React from 'react';
import { View, TouchableOpacity, Platform } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '../text';
import { Label } from '../label';
import { DatePickerProps } from './typesDatePicker';
import { useDatePicker } from './useDatePicker';
import { styles } from './stylesDatePicker';
import { ArenaColors } from '@/constants';

export const DatePicker: React.FC<DatePickerProps> = ({
  variant = 'datetime',
  backgroundVariant = 'default',
  label,
  required = false,
  value,
  onChange,
  error,
  helperText,
  minimumDate,
  maximumDate,
  disabled = false,
  placeholder = 'Selecione...',
  testID,
}) => {
  const {
    showPicker,
    formattedValue,
    mode,
    display,
    isFocused,
    handlePress,
    handleChange,
  } = useDatePicker({
    variant,
    backgroundVariant,
    value,
    onChange,
  });

  const getIconName = () => {
    if (variant === 'time') return 'time-outline';
    return 'calendar-outline';
  };

  const getIconColor = () => {
    if (disabled) return ArenaColors.neutral.medium;
    if (isFocused) return ArenaColors.brand.primary;
    return ArenaColors.neutral.light;
  };

  return (
    <View style={styles.container} testID={testID}>
      {label && (
        <Label
          variant="form"
          required={required}
          disabled={disabled}
          testID={testID ? `${testID}-label` : undefined}
        >
          {label}
        </Label>
      )}

      <TouchableOpacity
        style={[
          styles.inputContainer,
          backgroundVariant === 'filled' && styles.inputContainerFilled,
          isFocused && styles.inputContainerFocused,
          disabled && styles.inputContainerDisabled,
          error && styles.inputContainerError,
        ]}
        onPress={handlePress}
        disabled={disabled}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel={label || placeholder}
        accessibilityHint="Duplo toque para selecionar data"
        accessibilityState={{ disabled, selected: isFocused }}
        testID={testID ? `${testID}-trigger` : undefined}
      >
        <Text
          variant="bodyPrimary"
          style={formattedValue ? styles.value : styles.placeholder}
        >
          {formattedValue || placeholder}
        </Text>

        <View style={isFocused ? styles.iconActive : styles.icon}>
          <Ionicons
            name={getIconName()}
            size={20}
            color={getIconColor()}
          />
        </View>
      </TouchableOpacity>

      {error && (
        <Text variant="bodyPrimary" style={styles.error}>
          {error}
        </Text>
      )}

      {!error && helperText && (
        <Text variant="bodyPrimary" style={styles.helperText}>
          {helperText}
        </Text>
      )}

      {showPicker && Platform.OS !== 'web' && (
        <RNDateTimePicker
          value={value || new Date()}
          mode={mode}
          display={display}
          onChange={handleChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          accentColor={ArenaColors.brand.primary}
          themeVariant="dark"
          testID={testID ? `${testID}-picker` : undefined}
        />
      )}
    </View>
  );
};

export type { DatePickerProps } from './typesDatePicker';
export { useDatePicker } from './useDatePicker';
