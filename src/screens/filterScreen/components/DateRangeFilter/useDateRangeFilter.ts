import { useCallback, useMemo } from 'react';
import {
  UseDateRangeFilterProps,
  UseDateRangeFilterReturn,
  DateShortcut,
} from './typesDateRangeFilter';

const getDateForShortcut = (
  shortcut: DateShortcut
): { from: Date; to: Date } => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const from = new Date(today);
  const to = new Date(today);

  switch (shortcut) {
    case 'today':
      to.setHours(23, 59, 59, 999);
      break;
    case 'this-week': {
      const dayOfWeek = today.getDay();
      from.setDate(today.getDate() - dayOfWeek);
      to.setDate(from.getDate() + 6);
      to.setHours(23, 59, 59, 999);
      break;
    }
    case 'this-month':
      from.setDate(1);
      to.setMonth(from.getMonth() + 1, 0);
      to.setHours(23, 59, 59, 999);
      break;
    case 'next-7-days':
      to.setDate(today.getDate() + 6);
      to.setHours(23, 59, 59, 999);
      break;
    case 'next-30-days':
      to.setDate(today.getDate() + 29);
      to.setHours(23, 59, 59, 999);
      break;
  }

  return { from, to };
};

export const useDateRangeFilter = ({
  startDateFrom,
  startDateTo,
  onStartDateFromChange,
  onStartDateToChange,
}: UseDateRangeFilterProps): UseDateRangeFilterReturn => {
  const hasError = useMemo(() => {
    if (startDateFrom && startDateTo) {
      return startDateFrom > startDateTo;
    }
    return false;
  }, [startDateFrom, startDateTo]);

  const errorMessage = useMemo(() => {
    if (hasError) {
      return 'Data inicial deve ser anterior à data final';
    }
    return '';
  }, [hasError]);

  const handleQuickDateSelect = useCallback(
    (shortcut: DateShortcut) => {
      const { from, to } = getDateForShortcut(shortcut);
      onStartDateFromChange(from);
      onStartDateToChange(to);
    },
    [onStartDateFromChange, onStartDateToChange]
  );

  const handleClearDates = useCallback(() => {
    onStartDateFromChange(null);
    onStartDateToChange(null);
  }, [onStartDateFromChange, onStartDateToChange]);

  return {
    hasError,
    errorMessage,
    handleQuickDateSelect,
    handleClearDates,
  };
};
