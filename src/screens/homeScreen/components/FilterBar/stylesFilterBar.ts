import { StyleSheet } from 'react-native';
import {
  ArenaColors,
  ArenaSpacing,
  ArenaBorders,
  ArenaTypography,
} from '@/constants';

export const styles = StyleSheet.create({
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
    gap: ArenaSpacing.sm,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ArenaColors.neutral.darkest,
    borderRadius: ArenaBorders.radius.pill,
    paddingHorizontal: ArenaSpacing.md,
    paddingVertical: ArenaSpacing.sm,
    borderWidth: ArenaBorders.width.thin,
    borderColor: 'transparent',
  },
  searchContainerFocused: {
    borderColor: ArenaColors.brand.primary,
  },
  searchIcon: {
    marginRight: ArenaSpacing.sm,
  },
  searchInput: {
    flex: 1,
    color: ArenaColors.text.inverse,
    fontSize: ArenaTypography.size.md,
    fontFamily: ArenaTypography.fontFamily.regular,
    padding: 0,
    margin: 0,
  },
  clearButton: {
    padding: ArenaSpacing.xs,
    marginLeft: ArenaSpacing.xs,
  },
  actionButton: {
    width: 40,
    height: 40,
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
    top: -4,
    right: -4,
    minWidth: 18,
    height: 18,
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
    lineHeight: 18,
  },
});
