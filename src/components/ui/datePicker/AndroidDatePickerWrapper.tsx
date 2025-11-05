import React, { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import RNDateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

interface AndroidDatePickerWrapperProps {
  value: Date;
  mode: 'date' | 'time' | 'datetime';
  display: 'default' | 'spinner' | 'compact' | 'inline';
  onChange: (event: any, selectedDate?: Date) => void;
  minimumDate?: Date;
  maximumDate?: Date;
  accentColor?: string;
  themeVariant?: 'light' | 'dark';
  testID?: string;
}

/**
 * Wrapper component for Android DateTimePicker to handle dismiss errors
 * This component prevents the "Cannot read property 'dismiss' of undefined" error
 * by using the imperative API for Android instead of the component
 */
export const AndroidDatePickerWrapper: React.FC<AndroidDatePickerWrapperProps> = ({
  value,
  mode,
  display,
  onChange,
  minimumDate,
  maximumDate,
  accentColor,
  themeVariant,
  testID,
}) => {
  const hasOpenedRef = useRef(false);

  useEffect(() => {
    // For Android, use the imperative API which is more stable
    if (Platform.OS === 'android' && !hasOpenedRef.current) {
      hasOpenedRef.current = true;

      // Use a small timeout to ensure the component is ready
      const timer = setTimeout(() => {
        try {
          DateTimePickerAndroid.open({
            value: value || new Date(),
            mode: mode as any,
            is24Hour: true,
            minimumDate,
            maximumDate,
            onChange: (event: DateTimePickerEvent, date?: Date) => {
              // Call the onChange handler
              onChange(event, date);
            },
          });
        } catch (error) {
          console.error('AndroidDatePickerWrapper: Error opening picker', error);
          // Fallback: call onChange to close the picker
          onChange({ type: 'dismissed' } as any, undefined);
        }
      }, 100);

      return () => {
        clearTimeout(timer);
        // Safely try to dismiss if needed
        try {
          DateTimePickerAndroid.dismiss(mode as any);
        } catch (error) {
          // Ignore dismiss errors
        }
      };
    }
  }, [value, mode, minimumDate, maximumDate, onChange]);

  // For Android, return null as we're using the imperative API
  if (Platform.OS === 'android') {
    return null;
  }

  // For iOS and other platforms, use the regular component
  return (
    <RNDateTimePicker
      value={value}
      mode={mode}
      display={display}
      onChange={onChange}
      minimumDate={minimumDate}
      maximumDate={maximumDate}
      accentColor={accentColor}
      themeVariant={themeVariant}
      testID={testID}
    />
  );
};