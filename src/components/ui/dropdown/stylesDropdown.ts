import { StyleSheet } from 'react-native';
import {
  ArenaColors,
  ArenaSpacing,
  ArenaBorders,
  ArenaOpacity,
} from '@/constants';

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  triggerContainer: {
    zIndex: 1,
  },
  triggerDisabled: {
    opacity: ArenaOpacity.medium,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 998,
  },
  menuContainer: {
    position: 'absolute',
    minWidth: ArenaSpacing['6xl'] * 3,
    maxWidth: ArenaSpacing['6xl'] * 5,
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaBorders.radius.md,
    borderWidth: ArenaBorders.width.thin,
    borderColor: ArenaColors.neutral.medium,
    paddingVertical: ArenaSpacing.xs,
    shadowColor: ArenaColors.neutral.darkest,
    shadowOffset: { width: 0, height: ArenaSpacing.xs },
    shadowOpacity: 0.3,
    shadowRadius: ArenaSpacing.sm,
    elevation: ArenaSpacing.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: ArenaSpacing.md,
    paddingHorizontal: ArenaSpacing.lg,
    minHeight: ArenaSpacing['4xl'] + ArenaSpacing.xs,
  },
  menuItemPressed: {
    backgroundColor: ArenaColors.interaction.pressed.surface,
  },
  menuItemDisabled: {
    opacity: ArenaOpacity.medium,
  },
  menuItemIconContainer: {
    marginRight: ArenaSpacing.md,
  },
  menuItemLabel: {
    flex: 1,
    color: ArenaColors.text.inverse,
  },
  menuItemLabelDestructive: {
    color: ArenaColors.semantic.error,
  },
  menuItemLabelSubtle: {
    color: ArenaColors.neutral.medium,
  },
  separator: {
    height: ArenaBorders.width.thin,
    backgroundColor: ArenaColors.neutral.medium,
    marginVertical: ArenaSpacing.xs,
    marginHorizontal: ArenaSpacing.lg,
  },
});
