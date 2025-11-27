import { useCallback, useMemo } from 'react';
import {
  UseCalendarViewParams,
  UseCalendarViewReturn,
} from './typesCalendarView';

export const useCalendarView = ({
  selectedDate,
  onDateSelect,
}: UseCalendarViewParams): UseCalendarViewReturn => {
  const handleDayPress = useCallback(
    (day: { dateString: string }) => {
      const newDate = new Date(day.dateString);
      onDateSelect(newDate);
    },
    [onDateSelect]
  );

  const formattedSelectedDate = useMemo(() => {
    return selectedDate.toISOString().split('T')[0];
  }, [selectedDate]);

  return {
    handleDayPress,
    formattedSelectedDate,
  };
};
