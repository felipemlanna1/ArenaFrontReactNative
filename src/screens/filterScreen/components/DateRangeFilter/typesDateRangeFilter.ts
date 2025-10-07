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
  hasError: boolean;
  errorMessage: string;
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
