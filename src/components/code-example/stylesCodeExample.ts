import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    marginTop: ArenaSpacing.sm,
    borderRadius: ArenaBorders.radius.sm,
    borderWidth: ArenaBorders.width.thin,
    borderColor: ArenaColors.neutral.medium,
    backgroundColor: ArenaColors.neutral.dark,
    overflow: 'hidden',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: ArenaSpacing.md,
    paddingVertical: ArenaSpacing.xs,
    backgroundColor: ArenaColors.neutral.darkest,
    borderBottomWidth: ArenaBorders.width.thin,
    borderBottomColor: ArenaColors.neutral.medium,
  },

  languageLabel: {
    opacity: 0.7,
  },

  copyButton: {
    paddingHorizontal: ArenaSpacing.sm,
    paddingVertical: ArenaSpacing.xs,
    borderRadius: ArenaBorders.radius.xs,
    backgroundColor: ArenaColors.neutral.medium,
  },

  codeContainer: {
    padding: ArenaSpacing.md,
  },

  codeText: {
    fontFamily: 'Courier',
    fontSize: 12,
    lineHeight: 16,
    color: ArenaColors.neutral.light,
  },
});
