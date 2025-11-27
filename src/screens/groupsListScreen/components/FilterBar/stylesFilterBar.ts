import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaElevations } from '@/constants';

interface Styles {
  container: ViewStyle;
  content: ViewStyle;
  searchContainer: ViewStyle;
  buttonsContainer: ViewStyle;
  filterButtonWrapper: ViewStyle;
  actionButton: ViewStyle;
  filterBadge: ViewStyle;
  filterBadgeText: TextStyle;
}

export const styles = StyleSheet.create<Styles>({
  container: {
    backgroundColor: ArenaColors.neutral.dark,
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.lg,
    ...ArenaElevations.elevation1,
    zIndex: 1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.lg,
  },
  searchContainer: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: ArenaSpacing.sm,
  },
  filterButtonWrapper: {
    position: 'relative',
  },
  actionButton: {
    width: ArenaSpacing['4xl'],
    height: ArenaSpacing['4xl'],
    borderRadius: ArenaSpacing.xl,
    backgroundColor: ArenaColors.neutral.darkest,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterBadge: {
    position: 'absolute',
    top: -ArenaSpacing.xs,
    right: -ArenaSpacing.xs,
    minWidth: ArenaSpacing['1.5xl'],
    height: ArenaSpacing['1.5xl'],
    borderRadius: ArenaSpacing['1.5xl'],
    backgroundColor: ArenaColors.brand.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: ArenaSpacing.xs,
  },
  filterBadgeText: {
    color: ArenaColors.text.inverse,
    textAlign: 'center',
  },
});
