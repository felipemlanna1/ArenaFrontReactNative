import React from 'react';
import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { CalendarViewProps } from './typesCalendarView';
import { useCalendarView } from './useCalendarView';
import { styles, calendarTheme } from './stylesCalendarView';

export const CalendarView: React.FC<CalendarViewProps> = ({
  markedDates,
  selectedDate,
  onDateSelect,
  testID = 'calendar-view',
}) => {
  const { handleDayPress, formattedSelectedDate } = useCalendarView({
    selectedDate,
    onDateSelect,
  });

  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.calendarWrapper}>
        <Calendar
          current={formattedSelectedDate}
          onDayPress={handleDayPress}
          markedDates={{
            ...markedDates,
            [formattedSelectedDate]: {
              ...markedDates[formattedSelectedDate],
              selected: true,
              selectedColor: calendarTheme.selectedDayBackgroundColor,
            },
          }}
          theme={calendarTheme}
          enableSwipeMonths
          hideExtraDays
          firstDay={0}
          testID={`${testID}-calendar`}
        />
      </View>
    </View>
  );
};
