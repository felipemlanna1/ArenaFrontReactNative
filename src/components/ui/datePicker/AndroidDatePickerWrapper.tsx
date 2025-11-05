import React, { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import RNDateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

interface AndroidDatePickerWrapperProps {
  value: Date;
  mode: 'date' | 'time' | 'datetime';
  display: 'default' | 'spinner' | 'compact' | 'inline';
  onChange: (event: DateTimePickerEvent, selectedDate?: Date) => void;
  minimumDate?: Date;
  maximumDate?: Date;
  accentColor?: string;
  themeVariant?: 'light' | 'dark';
  testID?: string;
}

export const AndroidDatePickerWrapper: React.FC<
  AndroidDatePickerWrapperProps
> = ({
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
    if (Platform.OS === 'android' && !hasOpenedRef.current) {
      hasOpenedRef.current = true;

      const timer = setTimeout(() => {
        try {
          DateTimePickerAndroid.open({
            value: value || new Date(),
            mode: mode,
            is24Hour: true,
            minimumDate,
            maximumDate,
            onChange: (event: DateTimePickerEvent, date?: Date) => {
              onChange(event, date);
            },
          });
        } catch {
          const dismissedEvent: DateTimePickerEvent = {
            type: 'dismissed',
            nativeEvent: {
              timestamp: Date.now(),
            },
          };
          onChange(dismissedEvent, undefined);
        }
      }, 100);

      return () => {
        clearTimeout(timer);
        try {
          DateTimePickerAndroid.dismiss(mode);
        } catch {
          /* Ignore dismiss errors */
        }
      };
    }
  }, [value, mode, minimumDate, maximumDate, onChange]);

  if (Platform.OS === 'android') {
    return null;
  }

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
