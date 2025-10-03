import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import {
  ArenaColors,
  ArenaSpacing,
  ArenaBorders,
  ArenaTypography,
} from '@/constants';

interface Styles {
  container: ViewStyle;
  content: ViewStyle;
  searchContainer: ViewStyle;
  actionButton: ViewStyle;
  actionButtonPressed: ViewStyle;
  filterBadge: ViewStyle;
  filterBadgeText: TextStyle;
}

export const styles = StyleSheet.create<Styles>({
  container: {
    backgroundColor: ArenaColors.neutral.dark,
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.md,
    borderBottomWidth: ArenaBorders.width.thin,
    borderBottomColor: ArenaColors.neutral.darkest,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.xs,
  },
  searchContainer: {
    flex: 1,
  },
  actionButton: {
    width: ArenaSpacing['4xl'],
    height: ArenaSpacing['4xl'],
    borderRadius: ArenaBorders.radius.md,
    backgroundColor: ArenaColors.neutral.darkest,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  actionButtonPressed: {
    backgroundColor: ArenaColors.interaction.pressed.surface,
  },
  filterBadge: {
    position: 'absolute',
    top: -ArenaSpacing.xs,
    right: -ArenaSpacing.xs,
    minWidth: ArenaSpacing['1.5xl'],
    height: ArenaSpacing['1.5xl'],
    borderRadius: ArenaBorders.radius.circle,
    backgroundColor: ArenaColors.brand.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: ArenaSpacing.xs,
  },
  filterBadgeText: {
    color: ArenaColors.text.inverse,
    fontSize: ArenaTypography.size.xs,
    fontWeight: ArenaTypography.weight.bold,
    lineHeight: ArenaTypography.size.xs * 1.5,
  },
});
