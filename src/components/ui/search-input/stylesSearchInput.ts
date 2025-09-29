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
    width: '100%',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ArenaColors.neutral.light,
    borderRadius: ArenaBorders.radius.md,
    borderWidth: ArenaBorders.width.thin,
    borderColor: ArenaColors.neutral.medium,
    paddingHorizontal: ArenaSpacing.md,
  },
  searchIcon: {
    marginRight: ArenaSpacing.sm,
    color: ArenaColors.neutral.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    paddingVertical: ArenaSpacing.sm,
    fontSize: ArenaTypography.size.md,
    color: ArenaColors.text.primary,
    fontFamily: 'Inter-Regular',
  },
  clearButton: {
    padding: ArenaSpacing.xs,
    marginLeft: ArenaSpacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearIcon: {
    color: ArenaColors.neutral.medium,
  },
  focusedWrapper: {
    borderColor: ArenaColors.brand.primary,
    backgroundColor: ArenaColors.brand.primarySubtle,
  },
  disabledWrapper: {
    backgroundColor: ArenaColors.disabled.background,
    borderColor: ArenaColors.disabled.border,
  },
  disabledInput: {
    color: ArenaColors.disabled.text,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIconCircle: {
    borderWidth: ArenaBorders.width.medium,
    position: 'relative',
  },
  searchIconHandle: {
    position: 'absolute',
    height: ArenaBorders.width.medium,
  },
  searchIconLoading: {
    borderWidth: ArenaBorders.width.medium,
    borderTopColor: 'transparent',
  },
  clearIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearIconBackground: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearIconLine: {
    position: 'absolute',
    height: 1.5,
  },
});
