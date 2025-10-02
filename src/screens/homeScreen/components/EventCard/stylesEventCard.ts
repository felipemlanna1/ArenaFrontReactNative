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
    borderRadius: ArenaBorders.radius.lg,
    padding: ArenaSpacing['2xl'],
    marginBottom: ArenaSpacing.lg,
    shadowColor: ArenaColors.neutral.darkest,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: ArenaTypography.size.lg,
    fontWeight: ArenaTypography.weight.bold,
    color: ArenaColors.text.inverse,
    marginTop: ArenaSpacing.md,
    marginBottom: ArenaSpacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.xs,
    marginBottom: ArenaSpacing.xs,
  },
  infoIcon: {
    width: 20,
    alignItems: 'center',
  },
  locationText: {
    flex: 1,
    fontSize: ArenaTypography.size.sm,
    color: ArenaColors.text.inverse,
    fontWeight: ArenaTypography.weight.semibold,
  },
  distanceText: {
    fontSize: ArenaTypography.size.sm,
    color: ArenaColors.neutral.medium,
  },
  dateTimeText: {
    fontSize: ArenaTypography.size.sm,
    color: ArenaColors.text.inverse,
    fontWeight: ArenaTypography.weight.semibold,
  },
  priceText: {
    fontSize: ArenaTypography.size.md,
    color: ArenaColors.brand.primary,
    fontWeight: ArenaTypography.weight.bold,
  },
  progressContainer: {
    marginTop: ArenaSpacing.md,
    marginBottom: ArenaSpacing.lg,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: ArenaSpacing.sm,
  },
  shareButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: ArenaSpacing.xs,
    paddingVertical: ArenaSpacing.md,
    borderRadius: ArenaBorders.radius.md,
    borderWidth: ArenaBorders.width.thin,
    borderColor: ArenaColors.neutral.medium,
  },
  shareButtonText: {
    color: ArenaColors.neutral.medium,
    fontSize: ArenaTypography.size.sm,
    fontWeight: ArenaTypography.weight.semibold,
  },
  viewButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: ArenaSpacing.xs,
    paddingVertical: ArenaSpacing.md,
    borderRadius: ArenaBorders.radius.md,
    backgroundColor: ArenaColors.brand.primary,
  },
  viewButtonText: {
    color: ArenaColors.text.inverse,
    fontSize: ArenaTypography.size.sm,
    fontWeight: ArenaTypography.weight.bold,
  },
});
