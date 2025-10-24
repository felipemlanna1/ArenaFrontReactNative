import { StyleSheet } from 'react-native';
import { ArenaSpacing, ArenaBorders, ArenaColors } from '@/constants';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaBorders.radius.lg,
    paddingVertical: ArenaSpacing.md,
    paddingHorizontal: ArenaSpacing.md,
    gap: ArenaSpacing.sm,
    minWidth: ArenaSpacing['2xl'] * 5,
    borderWidth: ArenaBorders.width.thin,
    borderColor: ArenaColors.neutral.darkSubtleBorder,
  },

  cardPrimary: {
    borderColor: ArenaColors.brand.primary,
    borderWidth: ArenaBorders.width.medium,
  },

  cardSelected: {
    borderColor: ArenaColors.brand.primary,
    borderWidth: ArenaBorders.width.medium,
  },

  cardHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    height: ArenaSpacing['2xl'] * 2.5,
    position: 'relative',
  },

  sportIconImage: {
    width: ArenaSpacing['2xl'] * 2,
    height: ArenaSpacing['2xl'] * 2,
  },

  sportIconUnselected: {
    opacity: 0.3,
  },

  primaryBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: ArenaColors.neutral.darkest,
    borderRadius: ArenaBorders.radius.circle,
    padding: ArenaSpacing.micro,
    borderWidth: ArenaBorders.width.thin,
    borderColor: ArenaColors.brand.primary,
  },

  cardContent: {
    alignItems: 'center',
    gap: ArenaSpacing.xs,
  },

  sportName: {
    textAlign: 'center',
  },

  sportNameUnselected: {
    opacity: 0.3,
  },
});
