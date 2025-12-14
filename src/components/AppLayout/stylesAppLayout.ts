import { StyleSheet } from 'react-native';
import type { ThemeColors } from '@/types/theme';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.neutral.darkest,
    },
    content: {
      flex: 1,
    },
    bottomNavPlaceholder: {
      height: 0,
    },
  });
