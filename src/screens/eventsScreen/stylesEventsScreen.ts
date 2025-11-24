import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing } from '@/constants';

export const styles = StyleSheet.create({
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
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
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
  loadingFooter: {
    paddingVertical: ArenaSpacing.lg,
  },
  calendarContainer: {
    flex: 1,
  },
  selectedDateHeader: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.md,
    borderBottomWidth: 1,
    borderBottomColor: ArenaColors.neutral.dark,
  },
  selectedDateList: {
    flex: 1,
    paddingHorizontal: ArenaSpacing.lg,
    paddingTop: ArenaSpacing.sm,
  },
  fabContainer: {
    position: 'absolute',
    right: ArenaSpacing.lg,
    bottom: ArenaSpacing['2xl'],
  },
});
