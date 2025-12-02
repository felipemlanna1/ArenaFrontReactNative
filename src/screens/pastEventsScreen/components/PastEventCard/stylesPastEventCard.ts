import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaBorders.radius.lg,
    padding: ArenaSpacing.md,
    borderWidth: 1,
    borderColor: ArenaColors.neutral.medium,
    gap: ArenaSpacing.md,
  },
  badgeContainer: {
    alignSelf: 'flex-start',
  },
  header: {
    gap: ArenaSpacing.xs,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.xs,
  },
  infoSeparator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: ArenaColors.neutral.medium,
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.xs,
    backgroundColor: ArenaColors.neutral.medium,
    paddingHorizontal: ArenaSpacing.sm,
    paddingVertical: ArenaSpacing.xs,
    borderRadius: ArenaBorders.radius.sm,
    opacity: 0.3,
  },
  actions: {
    flexDirection: 'row',
    gap: ArenaSpacing.sm,
    marginTop: ArenaSpacing.xs,
  },
  actionButton: {
    flex: 1,
  },
});
