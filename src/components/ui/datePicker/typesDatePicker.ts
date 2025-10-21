export type DatePickerVariant = 'datetime' | 'date' | 'time';

export type DatePickerMode = 'date' | 'time' | 'datetime';

export type DatePickerBackgroundVariant = 'default' | 'filled';

export interface DatePickerProps {
  variant?: DatePickerVariant;
  backgroundVariant?: DatePickerBackgroundVariant;
  label?: string;
  required?: boolean;
  value: Date | null;
  onChange: (date: Date | null) => void;
  error?: string;
  helperText?: string;
  minimumDate?: Date;
  maximumDate?: Date;
  disabled?: boolean;
  placeholder?: string;
  testID?: string;
}

export interface UseDatePickerParams {
  variant: DatePickerVariant;
  backgroundVariant: DatePickerBackgroundVariant;
  value: Date | null;
  onChange: (date: Date | null) => void;
}

export interface UseDatePickerReturn {
  showPicker: boolean;
  formattedValue: string;
  mode: DatePickerMode;
  display: 'default' | 'spinner' | 'compact' | 'inline';
  isFocused: boolean;
  handlePress: () => void;
  handleChange: (event: unknown, selectedDate?: Date) => void;
  handleConfirm: () => void;
  handleCancel: () => void;
  tempValue: Date | null;
}
