import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaTypography } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: ArenaColors.neutral.darkest,
  },
  calendarWrapper: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.md,
  },
});

export const calendarTheme = {
  backgroundColor: ArenaColors.neutral.darkest,
  calendarBackground: ArenaColors.neutral.dark,
  textSectionTitleColor: ArenaColors.neutral.medium,
  selectedDayBackgroundColor: ArenaColors.brand.primary,
  selectedDayTextColor: ArenaColors.neutral.light,
  todayTextColor: ArenaColors.brand.primary,
  dayTextColor: ArenaColors.neutral.light,
  textDisabledColor: ArenaColors.neutral.medium,
  dotColor: ArenaColors.brand.primary,
  selectedDotColor: ArenaColors.neutral.light,
  arrowColor: ArenaColors.brand.primary,
  monthTextColor: ArenaColors.neutral.light,
  indicatorColor: ArenaColors.brand.primary,
  textDayFontFamily: 'System',
  textMonthFontFamily: 'System',
  textDayHeaderFontFamily: 'System',
  textDayFontWeight: String(ArenaTypography.weight.regular) as
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900',
  textMonthFontWeight: String(ArenaTypography.weight.semibold) as
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900',
  textDayHeaderFontWeight: String(ArenaTypography.weight.medium) as
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900',
  textDayFontSize: ArenaTypography.size.sm,
  textMonthFontSize: ArenaTypography.size.lg,
  textDayHeaderFontSize: ArenaTypography.size.xs,
};
