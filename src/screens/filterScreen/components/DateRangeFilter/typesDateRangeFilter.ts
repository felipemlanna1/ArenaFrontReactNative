export interface DateRangeFilterProps {
  startDateFrom: Date | null;
  startDateTo: Date | null;
  onStartDateFromChange: (value: Date | null) => void;
  onStartDateToChange: (value: Date | null) => void;
  testID?: string;
}

export interface UseDateRangeFilterProps {
  startDateFrom: Date | null;
  startDateTo: Date | null;
  onStartDateFromChange: (value: Date | null) => void;
  onStartDateToChange: (value: Date | null) => void;
}

export interface UseDateRangeFilterReturn {
  formattedStartFrom: string;
  formattedStartTo: string;
  showFromPicker: boolean;
  showToPicker: boolean;
  hasError: boolean;
  errorMessage: string;
  handleFromPress: () => void;
  handleToPress: () => void;
  handleFromDateChange: (date: Date) => void;
  handleToDateChange: (date: Date) => void;
  handleQuickDateSelect: (shortcut: DateShortcut) => void;
  handleClearDates: () => void;
}

export type DateShortcut =
  | 'today'
  | 'this-week'
  | 'this-month'
  | 'next-7-days'
  | 'next-30-days';

export interface DateShortcutOption {
  id: DateShortcut;
  label: string;
}
