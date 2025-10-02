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
  title: TextStyle;
  infoRow: ViewStyle;
  locationText: TextStyle;
  distanceText: TextStyle;
  dateTimeRow: ViewStyle;
  dateTimeContainer: ViewStyle;
  dateTimeText: TextStyle;
  priceText: TextStyle;
  priceSuccessBadge: ViewStyle;
  priceSuccessText: TextStyle;
  progressContainer: ViewStyle;
  actionsRow: ViewStyle;
  shareButton: ViewStyle;
  actionButton: ViewStyle;
  actionButtonText: TextStyle;
  outlineButton: ViewStyle;
  outlineButtonText: TextStyle;
  dangerButton: ViewStyle;
  dangerButtonText: TextStyle;
  viewButton: ViewStyle;
  viewButtonText: TextStyle;
}

export const styles = StyleSheet.create<Styles>({
  container: {
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaBorders.radius.lg,
    marginBottom: ArenaSpacing.lg,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    overflow: 'hidden',
  },
  contentContainer: {
    padding: ArenaSpacing['2xl'],
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
  priceSuccessBadge: {
    backgroundColor: ArenaColors.semantic.success,
    paddingHorizontal: ArenaSpacing.sm,
    paddingVertical: ArenaSpacing.xs,
    borderRadius: ArenaBorders.radius.pill,
  },
  priceSuccessText: {
    color: ArenaColors.text.inverse,
    fontSize: ArenaTypography.size.xs,
    fontWeight: ArenaTypography.weight.bold,
  },
  progressContainer: {
    marginTop: ArenaSpacing.md,
    marginBottom: ArenaSpacing.md,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: ArenaSpacing.sm,
    alignItems: 'center',
  },
  shareButton: {
    width: 32,
    height: 32,
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
  outlineButton: {
    borderColor: ArenaColors.neutral.medium,
    backgroundColor: 'transparent',
  },
  outlineButtonText: {
    color: ArenaColors.neutral.medium,
  },
  dangerButton: {
    borderColor: ArenaColors.semantic.error,
    backgroundColor: 'transparent',
  },
  dangerButtonText: {
    color: ArenaColors.semantic.error,
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
