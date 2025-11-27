import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gestureContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.md,
  },
  headerTitle: {
    textAlign: 'left',
  },
  viewToggle: {
    flexDirection: 'row',
    gap: ArenaSpacing.xs,
  },
  toggleButton: {
    width: ArenaSpacing['4xl'],
    height: ArenaSpacing['4xl'],
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: ArenaBorders.radius.md,
    backgroundColor: ArenaColors.neutral.dark,
  },
  toggleButtonActive: {
    backgroundColor: ArenaColors.brand.primary,
  },
  filtersContainer: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.sm,
  },
  listContent: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingTop: ArenaSpacing.lg,
    paddingBottom: ArenaSpacing['2xl'],
  },
  eventCardContainer: {
    marginBottom: ArenaSpacing.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: ArenaSpacing['2xl'],
    paddingTop: ArenaSpacing['3xl'],
    gap: ArenaSpacing.md,
  },
  loadingContainer: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingTop: ArenaSpacing.lg,
    gap: ArenaSpacing.md,
  },
  loadingFooter: {
    paddingVertical: ArenaSpacing.lg,
  },
  calendarContainer: {
    flex: 1,
  },
  selectedDateHeader: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.md,
    borderBottomWidth: ArenaBorders.width.thin,
    borderBottomColor: ArenaColors.neutral.dark,
  },
  selectedDateList: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingTop: ArenaSpacing.lg,
  },
});
