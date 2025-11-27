import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    gap: ArenaSpacing.md,
  },
  sportsGrid: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: ArenaSpacing.md,
  },
  sportCard: {
    width: ArenaSpacing['8xl'],
    height: ArenaSpacing['8xl'],
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: ArenaSpacing.sm,
    paddingHorizontal: ArenaSpacing.xs,
    borderRadius: ArenaBorders.radius.md,
    borderWidth: ArenaBorders.width.thick,
    gap: ArenaSpacing.xxs,
  },
  sportCardSelected: {
    borderColor: ArenaColors.brand.primary,
    backgroundColor: ArenaColors.brand.primarySubtle,
    shadowColor: ArenaColors.text.primary,
    shadowOffset: { width: 0, height: ArenaSpacing.xs },
    shadowOpacity: 0.12,
    shadowRadius: ArenaSpacing.sm,
    elevation: ArenaSpacing.xxs,
  },
  sportCardUnselected: {
    borderColor: ArenaColors.neutral.dark,
    backgroundColor: ArenaColors.neutral.transparent,
    shadowColor: ArenaColors.text.primary,
    shadowOffset: { width: 0, height: ArenaSpacing.xxs },
    shadowOpacity: 0.08,
    shadowRadius: ArenaSpacing.xs,
    elevation: 1,
  },
  sportCardIcon: {
    width: ArenaSpacing['5xl'],
    height: ArenaSpacing['5xl'],
  },
  sportCardText: {
    textAlign: 'center',
    flexWrap: 'nowrap',
  },
  checkmarkContainer: {
    position: 'absolute',
    top: ArenaSpacing.xs,
    right: ArenaSpacing.xs,
    backgroundColor: ArenaColors.brand.primary,
    borderRadius: ArenaSpacing.md,
    width: ArenaSpacing.lg,
    height: ArenaSpacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelIcon: {
    marginTop: ArenaSpacing.xs,
  },
  starButton: {
    position: 'absolute',
    top: ArenaSpacing.xs,
    left: ArenaSpacing.xs,
    padding: ArenaSpacing.xxs,
  },
  loadingContainer: {
    paddingVertical: ArenaSpacing.lg,
    alignItems: 'center',
  },
  viewMoreButton: {
    width: ArenaSpacing['8xl'],
    height: ArenaSpacing['8xl'],
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ArenaBorders.radius.md,
    borderWidth: ArenaBorders.width.thick,
    borderColor: ArenaColors.neutral.medium,
    borderStyle: 'dashed',
    backgroundColor: ArenaColors.neutral.transparent,
  },
  viewMoreText: {
    textAlign: 'center',
  },
});
