import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import {
  ArenaSpacing,
  ArenaBorders,
  ArenaTypography,
  ArenaColors,
} from '@/constants';

interface Styles {
  container: ViewStyle;
  text: TextStyle;
}

export const styles = StyleSheet.create<Styles>({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: ArenaSpacing.md,
    paddingVertical: ArenaSpacing.xs,
    borderRadius: ArenaBorders.radius.pill,
    gap: ArenaSpacing.xs,
  },
  text: {
    color: ArenaColors.text.inverse,
    fontSize: ArenaTypography.size.xs,
    fontWeight: ArenaTypography.weight.bold,
    letterSpacing: 0.5,
  },
});
