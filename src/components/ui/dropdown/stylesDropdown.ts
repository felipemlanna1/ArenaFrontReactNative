import { StyleSheet } from 'react-native';
import {
  ArenaColors,
  ArenaSpacing,
  ArenaBorders,
  ArenaTypography,
} from '@/constants';

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  triggerContainer: {
    zIndex: 1,
  },
  triggerDisabled: {
    opacity: 0.5,
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
    minWidth: 200,
    maxWidth: 300,
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaBorders.radius.md,
    borderWidth: ArenaBorders.width.thin,
    borderColor: ArenaColors.neutral.medium,
    paddingVertical: ArenaSpacing.xs,
    shadowColor: ArenaColors.neutral.darkest,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: ArenaSpacing.md,
    paddingHorizontal: ArenaSpacing.lg,
    minHeight: 44,
  },
  menuItemPressed: {
    backgroundColor: ArenaColors.interaction.pressed.surface,
  },
  menuItemDisabled: {
    opacity: 0.5,
  },
  menuItemIconContainer: {
    marginRight: ArenaSpacing.md,
  },
  menuItemLabel: {
    flex: 1,
    fontSize: ArenaTypography.size.md,
    fontFamily: ArenaTypography.fontFamily.regular,
    color: ArenaColors.text.inverse,
  },
  menuItemLabelDestructive: {
    color: ArenaColors.semantic.error,
  },
  separator: {
    height: ArenaBorders.width.thin,
    backgroundColor: ArenaColors.neutral.medium,
    marginVertical: ArenaSpacing.xs,
    marginHorizontal: ArenaSpacing.lg,
  },
});
