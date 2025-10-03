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
  buttonsContainer: ViewStyle;
  actionButton: ViewStyle;
  actionButtonPressed: ViewStyle;
  actionButtonStyle: ViewStyle;
  filterBadge: ViewStyle;
  filterBadgeText: TextStyle;
}

export const styles = StyleSheet.create<Styles>({
  container: {
    backgroundColor: ArenaColors.neutral.lighter,
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.md,
    borderBottomWidth: ArenaBorders.width.thin,
    borderBottomColor: ArenaColors.neutral.medium,
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
  actionButtonStyle: {
    width: ArenaSpacing['4xl'],
    height: ArenaSpacing['4xl'],
    borderRadius: ArenaBorders.radius.md,
    backgroundColor: ArenaColors.neutral.darkest,
    padding: ArenaSpacing.none,
    minWidth: ArenaSpacing['4xl'],
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
