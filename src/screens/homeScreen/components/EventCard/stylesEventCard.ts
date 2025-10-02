import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import {
  ArenaColors,
  ArenaSpacing,
  ArenaBorders,
  ArenaTypography,
} from '@/constants';

interface Styles {
  container: ViewStyle;
  contentContainer: ViewStyle;
  sportBadge: ViewStyle;
  sportBadgeText: TextStyle;
  title: TextStyle;
  infoRow: ViewStyle;
  infoIcon: ViewStyle;
  locationText: TextStyle;
  distanceText: TextStyle;
  dateTimeRow: ViewStyle;
  dateTimeContainer: ViewStyle;
  dateTimeText: TextStyle;
  priceText: TextStyle;
  progressContainer: ViewStyle;
  actionsRow: ViewStyle;
  shareButton: ViewStyle;
  actionButton: ViewStyle;
  actionButtonText: TextStyle;
  viewButton: ViewStyle;
  viewButtonText: TextStyle;
}

export const styles = StyleSheet.create<Styles>({
  container: {
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaBorders.radius.lg,
    marginBottom: ArenaSpacing.lg,
    shadowColor: ArenaColors.neutral.darkest,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  contentContainer: {
    padding: ArenaSpacing['2xl'],
  },
  sportBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.xs,
    alignSelf: 'flex-start',
    paddingHorizontal: ArenaSpacing.sm,
    paddingVertical: ArenaSpacing.xs,
    borderRadius: ArenaBorders.radius.pill,
    marginBottom: ArenaSpacing.md,
  },
  sportBadgeText: {
    fontSize: ArenaTypography.size.xs,
    fontWeight: ArenaTypography.weight.bold,
    color: ArenaColors.text.inverse,
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
  dateTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: ArenaSpacing.xs,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.xs,
    flex: 1,
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
    marginLeft: ArenaSpacing.sm,
  },
  progressContainer: {
    marginTop: ArenaSpacing.md,
    marginBottom: ArenaSpacing.lg,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: ArenaSpacing.sm,
    alignItems: 'center',
  },
  shareButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ArenaBorders.radius.md,
    borderWidth: ArenaBorders.width.thin,
    borderColor: ArenaColors.neutral.medium,
  },
  actionButton: {
    flex: 1,
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ArenaBorders.radius.md,
    borderWidth: ArenaBorders.width.thin,
    borderColor: ArenaColors.brand.primary,
  },
  actionButtonText: {
    color: ArenaColors.brand.primary,
    fontSize: ArenaTypography.size.xs,
    fontWeight: ArenaTypography.weight.bold,
  },
  viewButton: {
    flex: 1,
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: ArenaSpacing.xs,
    borderRadius: ArenaBorders.radius.md,
    backgroundColor: ArenaColors.brand.primary,
  },
  viewButtonText: {
    color: ArenaColors.text.inverse,
    fontSize: ArenaTypography.size.xs,
    fontWeight: ArenaTypography.weight.bold,
  },
});
