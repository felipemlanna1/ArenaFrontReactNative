import { useState, useCallback, useMemo } from 'react';
import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import {
  UseDatePickerParams,
  UseDatePickerReturn,
  DatePickerMode,
} from './typesDatePicker';

export const useDatePicker = ({
  variant,
  backgroundVariant,
  value,
  onChange,
}: UseDatePickerParams): UseDatePickerReturn => {
  const [showPicker, setShowPicker] = useState(false);
  const [tempDate, setTempDate] = useState<Date | null>(null);

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
    setTempDate(null);
    setShowPicker(true);
  }, []);

  const handleChange = useCallback(
    async (event: unknown, selectedDate?: Date) => {
      const eventType = (event as { type?: string })?.type;

      if (Platform.OS === 'android') {
        setShowPicker(false);
        if (selectedDate && eventType !== 'dismissed') {
          onChange(selectedDate);
        }
        return;
      }

      if (variant === 'datetime' && selectedDate) {
        if (!tempDate) {
          setTempDate(selectedDate);
          onChange(selectedDate);
        } else {
          setShowPicker(false);
          if (Platform.OS === 'ios') {
            await Haptics.notificationAsync(
              Haptics.NotificationFeedbackType.Success
            );
          }
          onChange(selectedDate);
          setTempDate(null);
        }
      } else {
        setShowPicker(false);
        if (selectedDate) {
          if (Platform.OS === 'ios') {
            await Haptics.notificationAsync(
              Haptics.NotificationFeedbackType.Success
            );
          }
          onChange(selectedDate);
        }
      }
    },
    [onChange, variant, tempDate]
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
