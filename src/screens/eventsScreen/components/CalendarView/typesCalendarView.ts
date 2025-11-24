export interface CalendarViewProps {
  markedDates: Record<string, { marked: boolean; dotColor: string }>;
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  testID?: string;
}

export interface UseCalendarViewParams {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export interface UseCalendarViewReturn {
  handleDayPress: (day: { dateString: string }) => void;
  formattedSelectedDate: string;
}
