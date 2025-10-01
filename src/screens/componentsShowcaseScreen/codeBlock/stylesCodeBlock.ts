import { StyleSheet } from 'react-native';
import {
  ArenaColors,
  ArenaSpacing,
  ArenaBorders,
  ArenaTypography,
} from '@/constants';
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
    borderBottomWidth: 1,
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
    fontSize: ArenaTypography.size.xs,
  },
  codeContainer: {
    padding: ArenaSpacing.md,
  },
  codeText: {
    fontFamily: ArenaTypography.family.mono,
    fontSize: ArenaTypography.size.xs,
    lineHeight:
      ArenaTypography.size.xs * ArenaTypography.lineHeight.comfortable,
    color: ArenaColors.neutral.light,
  },
});
