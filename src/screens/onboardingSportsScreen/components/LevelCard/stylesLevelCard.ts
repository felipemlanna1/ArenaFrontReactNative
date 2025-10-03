import { StyleSheet } from 'react-native';
import {
  ArenaColors,
  ArenaSpacing,
  ArenaBorders,
  ArenaTypography,
  ArenaShadows,
} from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaBorders.radius.lg,
    borderWidth: ArenaBorders.width.thick,
    borderColor: 'transparent',
    padding: ArenaSpacing.lg,
    marginBottom: ArenaSpacing.md,
    minHeight: ArenaSpacing['8xl'],
    boxShadow: ArenaShadows.soft,
  },
  selectedContainer: {
    borderColor: ArenaColors.brand.primary,
    backgroundColor: `${ArenaColors.brand.primary}15`,
    boxShadow: ArenaShadows.card,
  },
  iconContainer: {
    marginRight: ArenaSpacing.lg,
    width: ArenaSpacing['5xl'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconUnselected: {
    opacity: 0.3,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    marginBottom: ArenaSpacing.xs,
  },
  labelUnselected: {
    opacity: 0.3,
  },
  labelSelected: {
    color: ArenaColors.brand.primary,
  },
  description: {
    fontSize: ArenaTypography.size.sm,
  },
  descriptionUnselected: {
    opacity: 0.3,
  },
  descriptionSelected: {
    color: ArenaColors.brand.primary,
    opacity: 0.8,
  },
});
