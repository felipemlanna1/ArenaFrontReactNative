import { StyleSheet } from 'react-native';
import {
  ArenaColors,
  ArenaSpacing,
  ArenaBorders,
  ArenaSizes,
} from '@/constants';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  digitsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: ArenaSpacing.sm,
  },
  digitBox: {
    flex: 1,
    aspectRatio: 1,
    maxWidth: ArenaSizes.fabSize,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: ArenaSpacing.xxs,
    borderColor: ArenaColors.neutral.dark,
    borderRadius: ArenaBorders.radius.md,
    backgroundColor: ArenaColors.neutral.darker,
  },
  digitBoxFocused: {
    borderColor: ArenaColors.brand.primary,
    backgroundColor: ArenaColors.neutral.darkest,
  },
  digitBoxError: {
    borderColor: ArenaColors.semantic.error,
    backgroundColor: ArenaColors.neutral.darkest,
  },
  digitBoxDisabled: {
    opacity: 0.5,
    backgroundColor: ArenaColors.neutral.dark,
  },
  digitBoxFilled: {
    borderColor: ArenaColors.neutral.medium,
    backgroundColor: ArenaColors.neutral.darkest,
  },
  hiddenInput: {
    position: 'absolute',
    width: 0,
    height: 0,
    opacity: 0,
  },
  errorText: {
    marginTop: ArenaSpacing.xs,
    textAlign: 'center',
  },
});
