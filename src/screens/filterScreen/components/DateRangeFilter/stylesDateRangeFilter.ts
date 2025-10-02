import { StyleSheet } from 'react-native';
import {
  ArenaSpacing,
  ArenaColors,
  ArenaBorders,
  ArenaTypography,
} from '@/constants';

export const styles = StyleSheet.create({
  container: {
    gap: ArenaSpacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: ArenaSpacing.sm,
    alignItems: 'flex-start',
  },
  inputWrapper: {
    flex: 1,
  },
  errorText: {
    fontSize: ArenaTypography.size.xs,
    color: ArenaColors.semantic.error,
    marginTop: ArenaSpacing.xs,
  },
  shortcutsContainer: {
    gap: ArenaSpacing.xs,
  },
  shortcutsTitle: {
    marginBottom: ArenaSpacing.xs,
  },
  shortcutsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: ArenaSpacing.xs,
  },
  shortcutButton: {
    paddingVertical: ArenaSpacing.xs,
    paddingHorizontal: ArenaSpacing.sm,
    borderRadius: ArenaBorders.radius.sm,
    backgroundColor: ArenaColors.neutral.dark,
    borderWidth: 1,
    borderColor: ArenaColors.neutral.medium,
  },
  shortcutButtonActive: {
    backgroundColor: ArenaColors.brand.primary,
    borderColor: ArenaColors.brand.primary,
  },
  clearButtonWrapper: {
    marginTop: ArenaSpacing.xs,
  },
});
