import { StyleSheet } from 'react-native';
import { ArenaSpacing } from '@/constants';
import type { ThemeColors } from '@/types/theme';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.neutral.darkest,
    },
    scrollContent: {
      paddingHorizontal: ArenaSpacing.lg,
      paddingVertical: ArenaSpacing['2xl'],
      gap: ArenaSpacing.lg,
    },
    section: {
      gap: ArenaSpacing.sm,
    },
    sectionTitle: {
      marginBottom: ArenaSpacing.xs,
    },
    themeOptions: {
      gap: ArenaSpacing.md,
      marginBottom: ArenaSpacing.lg,
    },
    helperText: {
      marginLeft: ArenaSpacing['4xl'],
      marginTop: -ArenaSpacing.xs,
      marginBottom: ArenaSpacing.sm,
    },
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: ArenaSpacing.md,
      paddingHorizontal: ArenaSpacing.md,
      backgroundColor: colors.neutral.dark,
      borderRadius: ArenaSpacing.sm,
      gap: ArenaSpacing.sm,
    },
    settingLabel: {
      flex: 1,
    },
    destructive: {
      color: colors.semantic.error,
    },
  });
