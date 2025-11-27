import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';
export const styles = StyleSheet.create({
  container: {
    marginTop: ArenaSpacing.md,
    backgroundColor: ArenaColors.neutral.darkest,
    borderRadius: ArenaBorders.radius.md,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: ArenaSpacing.md,
    paddingVertical: ArenaSpacing.sm,
    backgroundColor: ArenaColors.neutral.dark,
    borderBottomWidth: ArenaBorders.width.thin,
    borderBottomColor: ArenaColors.neutral.medium,
  },
  copyButton: {
    paddingHorizontal: ArenaSpacing.sm,
    paddingVertical: ArenaSpacing.xs,
    backgroundColor: ArenaColors.brand.primary,
    borderRadius: ArenaBorders.radius.sm,
  },
  copyButtonText: {
    color: ArenaColors.neutral.light,
  },
  codeContainer: {
    padding: ArenaSpacing.md,
  },
});
