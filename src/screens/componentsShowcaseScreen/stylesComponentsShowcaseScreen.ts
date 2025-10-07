import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ArenaColors.neutral.darkest,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.xl,
  },
  flatListContent: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.xl,
  },
  sectionHeader: {
    marginBottom: ArenaSpacing.lg,
    marginTop: ArenaSpacing.xl,
  },
  section: {
    marginBottom: ArenaSpacing.xl,
    gap: ArenaSpacing.md,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: ArenaSpacing['4xl'],
  },
  emptyIcon: {
    marginBottom: ArenaSpacing.xl,
    opacity: 0.5,
  },
  emptyContent: {
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandShowcase: {
    backgroundColor: ArenaColors.neutral.light,
    borderRadius: ArenaSpacing.md,
    padding: ArenaSpacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: ArenaSpacing.md,
    flexWrap: 'wrap',
  },
  brandColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: ArenaSpacing.lg,
  },
  buttonShowcase: {
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaSpacing.md,
    padding: ArenaSpacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: ArenaSpacing.md,
    flexWrap: 'wrap',
  },
  buttonColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: ArenaSpacing.md,
    width: '100%',
  },
  buttonSizes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: ArenaSpacing.sm,
  },
  loadingGrid: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: ArenaSpacing.md,
  },
  orientationShowcase: {
    gap: ArenaSpacing.lg,
  },
  orientationItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  speedShowcase: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: ArenaSpacing.md,
    flexWrap: 'wrap',
  },
  speedItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputColumn: {
    gap: ArenaSpacing.md,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: ArenaSpacing.sm,
    flexWrap: 'wrap',
  },
  badgeColumn: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: ArenaSpacing.sm,
  },
  dropdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: ArenaSpacing.md,
    paddingVertical: ArenaSpacing.lg,
  },
  menuTrigger: {
    paddingVertical: ArenaSpacing.sm,
    paddingHorizontal: ArenaSpacing.lg,
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaSpacing.sm,
  },
  profileTrigger: {
    paddingVertical: ArenaSpacing.sm,
    paddingHorizontal: ArenaSpacing.lg,
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaSpacing.sm,
  },
  menuIconContainer: {
    gap: ArenaSpacing.xs,
  },
  menuIconBar: {
    width: ArenaSpacing.xl,
    height: ArenaSpacing.micro,
    backgroundColor: ArenaColors.neutral.light,
  },
  iconMenuTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.sm,
    paddingVertical: ArenaSpacing.sm,
    paddingHorizontal: ArenaSpacing.sm,
  },
  buttonTrigger: {
    paddingVertical: ArenaSpacing.md,
    paddingHorizontal: ArenaSpacing.xl,
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaSpacing.sm,
    borderWidth: ArenaBorders.width.thin,
    borderColor: ArenaColors.neutral.medium,
    minHeight: ArenaSpacing['4.5xl'],
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTriggerText: {
    color: ArenaColors.text.inverse,
  },
  accordionVariantContainer: {
    gap: ArenaSpacing.md,
  },
  accordionVariantItem: {
    marginBottom: ArenaSpacing.sm,
  },
  verticalStack: {
    gap: ArenaSpacing.md,
  },
  fabShowcase: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.xl,
    position: 'relative',
    minHeight: 80,
  },
});
