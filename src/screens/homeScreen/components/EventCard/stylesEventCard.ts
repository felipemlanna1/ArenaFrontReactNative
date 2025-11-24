import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

interface Styles {
  container: ViewStyle;
  containerPressed: ViewStyle;
  contentContainer: ViewStyle;
  title: TextStyle;
  infoRow: ViewStyle;
  infoContent: ViewStyle;
  addressText: TextStyle;
  slotsText: TextStyle;
  dateTimeRow: ViewStyle;
  dateTimeContainer: ViewStyle;
  dateTimeText: TextStyle;
  participantsRow: ViewStyle;
  participantsText: TextStyle;
  progressContainer: ViewStyle;
  actionsRow: ViewStyle;
  buttonWrapper: ViewStyle;
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
    shadowColor: ArenaColors.neutral.darkest,
    shadowOffset: { width: ArenaSpacing.none, height: ArenaSpacing.xs },
    shadowOpacity: 0.3,
    shadowRadius: ArenaSpacing.sm,
    elevation: ArenaSpacing.sm,
    overflow: 'hidden',
  },
  containerPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  contentContainer: {
    padding: ArenaSpacing['2xl'],
  },
  title: {
    marginTop: ArenaSpacing.xs,
    marginBottom: ArenaSpacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: ArenaSpacing.sm,
    marginBottom: ArenaSpacing.xs,
  },
  infoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.xs,
    flex: 1,
  },
  addressText: {
    flex: 1,
    color: ArenaColors.text.inverse,
  },
  slotsText: {
    color: ArenaColors.text.inverse,
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
    color: ArenaColors.text.inverse,
  },
  participantsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.sm,
    marginTop: ArenaSpacing.md,
    marginBottom: ArenaSpacing.xs,
  },
  participantsText: {
    color: ArenaColors.neutral.medium,
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
  buttonWrapper: {
    flex: 1,
  },
  actionButton: {
    flex: 1,
    height: ArenaSpacing['3xl'],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ArenaBorders.radius.md,
    borderWidth: ArenaBorders.width.thin,
    borderColor: ArenaColors.brand.primary,
  },
  actionButtonText: {
    color: ArenaColors.brand.primary,
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
    height: ArenaSpacing['3xl'],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: ArenaSpacing.xs,
    borderRadius: ArenaBorders.radius.md,
    backgroundColor: ArenaColors.brand.primary,
  },
  viewButtonText: {
    color: ArenaColors.text.inverse,
  },
});
