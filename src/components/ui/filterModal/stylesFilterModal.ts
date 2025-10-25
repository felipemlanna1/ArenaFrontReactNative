import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: ArenaColors.neutral.overlay,
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
  },
  modalContainer: {
    backgroundColor: ArenaColors.neutral.darkest,
    borderTopLeftRadius: ArenaBorders.radius.xl,
    borderTopRightRadius: ArenaBorders.radius.xl,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.md,
    borderBottomWidth: ArenaBorders.width.thin,
    borderBottomColor: ArenaColors.neutral.darkSubtleBorder,
    backgroundColor: ArenaColors.neutral.dark,
  },
  closeButton: {
    padding: ArenaSpacing.xs,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: ArenaSpacing.lg,
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: ArenaSpacing['2xl'],
  },
  footer: {
    flexDirection: 'row',
    padding: ArenaSpacing.lg,
    borderTopWidth: ArenaBorders.width.thin,
    borderTopColor: ArenaColors.neutral.darkSubtleBorder,
    gap: ArenaSpacing.sm,
    backgroundColor: ArenaColors.neutral.dark,
  },
  footerButton: {
    flex: 1,
  },
});
