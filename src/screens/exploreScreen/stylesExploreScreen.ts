import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { ArenaColors, ArenaSpacing } from '@/constants';

interface Styles {
  container: ViewStyle;
  content: ViewStyle;
  title: TextStyle;
  subtitle: TextStyle;
}

export const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: ArenaSpacing['2xl'],
  },
  content: {
    alignItems: 'center',
    gap: ArenaSpacing.md,
  },
  title: {
    color: ArenaColors.neutral.light,
    textAlign: 'center',
  },
  subtitle: {
    color: ArenaColors.neutral.medium,
    textAlign: 'center',
  },
});
