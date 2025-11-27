import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

interface Styles {
  container: ViewStyle;
  barContainer: ViewStyle;
  barFill: ViewStyle;
  text: TextStyle;
}

export const styles = StyleSheet.create<Styles>({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.md,
  },
  barContainer: {
    flex: 1,
    height: ArenaSpacing.xs,
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaBorders.radius.pill,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: ArenaBorders.radius.pill,
  },
  text: {
    color: ArenaColors.text.inverse,
    minWidth: ArenaSpacing['4xl'],
    textAlign: 'right',
  },
});
