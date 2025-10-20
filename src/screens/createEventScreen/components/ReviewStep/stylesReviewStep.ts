import { StyleSheet } from 'react-native';
import { ArenaSpacing, ArenaColors, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    gap: ArenaSpacing['2xl'],
  },
  previewCard: {
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaBorders.radius.lg,
    padding: ArenaSpacing.lg,
    gap: ArenaSpacing.md,
  },
  previewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.sm,
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: ArenaSpacing.md,
    borderBottomWidth: 1,
    borderBottomColor: ArenaColors.neutral.dark,
  },
  accordionContent: {
    paddingVertical: ArenaSpacing.md,
    gap: ArenaSpacing.md,
  },
  divider: {
    height: ArenaBorders.width.thin,
    backgroundColor: ArenaColors.neutral.dark,
    marginVertical: ArenaSpacing.sm,
  },
  row: {
    flexDirection: 'row',
    gap: ArenaSpacing.md,
  },
  flex1: {
    flex: 1,
  },
});
