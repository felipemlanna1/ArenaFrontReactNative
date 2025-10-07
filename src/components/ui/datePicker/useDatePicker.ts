import { useState, useCallback, useMemo } from 'react';
import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import { UseDatePickerParams, UseDatePickerReturn, DatePickerMode } from './typesDatePicker';

export const useDatePicker = ({
  variant,
  backgroundVariant,
  value,
  onChange,
}: UseDatePickerParams): UseDatePickerReturn => {
  const [showPicker, setShowPicker] = useState(false);

  const mode: DatePickerMode = useMemo(() => {
    if (variant === 'datetime') return 'datetime';
    if (variant === 'time') return 'time';
    return 'date';
  }, [variant]);

  const display = useMemo<'default' | 'spinner' | 'compact' | 'inline'>(() => {
    if (Platform.OS === 'ios') {
      return 'spinner';
    }
    return 'default';
  }, []);

  const isFocused = showPicker;

  const formattedValue = useMemo(() => {
    if (!value) return '';

    const options: Intl.DateTimeFormatOptions = {};

    if (variant === 'date') {
      options.day = '2-digit';
      options.month = '2-digit';
      options.year = 'numeric';
    } else if (variant === 'time') {
      options.hour = '2-digit';
      options.minute = '2-digit';
    } else {
      options.day = '2-digit';
      options.month = '2-digit';
      options.year = 'numeric';
      options.hour = '2-digit';
      options.minute = '2-digit';
    }

    return value.toLocaleDateString('pt-BR', options);
  }, [value, variant]);

  const handlePress = useCallback(async () => {
    if (Platform.OS === 'ios') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setShowPicker(true);
  }, []);

  const handleChange = useCallback(
    async (_event: unknown, selectedDate?: Date) => {
      setShowPicker(false);
      if (selectedDate) {
        if (Platform.OS === 'ios') {
          await Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Success
          );
        }
        onChange(selectedDate);
      }
    },
    [onChange]
  );

  return {
    showPicker,
    formattedValue,
    mode,
    display,
    isFocused,
    handlePress,
    handleChange,
  };
};
