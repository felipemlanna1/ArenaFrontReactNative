import { useState, useCallback, useMemo } from 'react';
import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import {
  UseDatePickerParams,
  UseDatePickerReturn,
  DatePickerMode,
} from './typesDatePicker';
import { formatDateHumanized } from '@/utils/dateFormatting';

export const useDatePicker = ({
  variant,
  backgroundVariant,
  value,
  onChange,
}: UseDatePickerParams): UseDatePickerReturn => {
  const [showPicker, setShowPicker] = useState(false);
  const [tempValue, setTempValue] = useState<Date | null>(null);

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
    return formatDateHumanized(value, variant);
  }, [value, variant]);

  const handlePress = useCallback(async () => {
    if (showPicker) {
      return;
    }

    if (Platform.OS === 'ios') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setTempValue(value || new Date());

    if (Platform.OS === 'android') {
      setTimeout(() => {
        setShowPicker(true);
      }, 50);
    } else {
      setShowPicker(true);
    }
  }, [value, showPicker]);

  const handleChange = useCallback(
    async (event: unknown, selectedDate?: Date) => {
      try {
        const eventType = (event as { type?: string })?.type;

        if (Platform.OS === 'android') {
          setShowPicker(false);

          if (eventType === 'set' && selectedDate) {
            try {
              if (
                selectedDate instanceof Date &&
                !isNaN(selectedDate.getTime())
              ) {
                setTimeout(() => {
                  onChange(selectedDate);
                }, 100);
              }
            } catch {
              return;
            }
          }
          return;
        }
      } catch {
        setShowPicker(false);
        return;
      }

      if (
        Platform.OS === 'ios' &&
        (variant === 'date' || variant === 'datetime') &&
        selectedDate
      ) {
        setTempValue(selectedDate);
        return;
      }

      if (variant === 'time' && selectedDate) {
        setShowPicker(false);
        if (Platform.OS === 'ios') {
          await Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Success
          );
        }
        try {
          onChange(selectedDate);
        } catch {
          return;
        }
      }
    },
    [onChange, variant]
  );

  const handleConfirm = useCallback(async () => {
    if (tempValue) {
      if (Platform.OS === 'ios') {
        await Haptics.notificationAsync(
          Haptics.NotificationFeedbackType.Success
        );
      }
      try {
        if (tempValue instanceof Date && !isNaN(tempValue.getTime())) {
          onChange(tempValue);
        }
      } catch {
        return;
      }
    }
    setShowPicker(false);
    setTempValue(null);
  }, [tempValue, onChange]);

  const handleCancel = useCallback(async () => {
    if (Platform.OS === 'ios') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setShowPicker(false);
    setTempValue(null);
  }, []);

  return {
    showPicker,
    formattedValue,
    mode,
    display,
    isFocused,
    handlePress,
    handleChange,
    handleConfirm,
    handleCancel,
    tempValue,
  };
};
