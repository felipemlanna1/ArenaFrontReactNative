import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  // Modal Overlay
  modalOverlay: {
    flex: 1,
    backgroundColor: ArenaColors.neutral.overlay,
    justifyContent: 'flex-end',
  },

  // Modal Content
  modalContent: {
    width: '100%',
    backgroundColor: ArenaColors.neutral.darkest,
    borderTopLeftRadius: ArenaBorders.radius.xl,
    borderTopRightRadius: ArenaBorders.radius.xl,
    overflow: 'hidden',
    maxHeight: '50%',
  },

  // Header
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: ArenaSpacing.lg,
    paddingTop: ArenaSpacing.lg,
    paddingBottom: ArenaSpacing.md,
    backgroundColor: ArenaColors.neutral.dark,
    borderBottomWidth: ArenaBorders.width.thin,
    borderBottomColor: ArenaColors.neutral.darkSubtleBorder,
  },

  closeButton: {
    padding: ArenaSpacing.xs,
  },

  // Lista de Apps
  appsList: {
    paddingVertical: ArenaSpacing.md,
    paddingHorizontal: ArenaSpacing.lg,
    gap: ArenaSpacing.sm,
  },

  // Item de App
  appItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.md,
    padding: ArenaSpacing.md,
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaBorders.radius.md,
    borderWidth: ArenaBorders.width.thin,
    borderColor: ArenaColors.neutral.darkSubtleBorder,
    minHeight: 64, // Touch target mínimo
  },

  appItemDisabled: {
    opacity: 0.5,
  },

  appIcon: {
    width: 40,
    height: 40,
    borderRadius: ArenaBorders.radius.sm,
    backgroundColor: ArenaColors.neutral.darkIntermediate,
    alignItems: 'center',
    justifyContent: 'center',
  },

  appInfo: {
    flex: 1,
  },

  // Loading state
  loadingContainer: {
    paddingVertical: ArenaSpacing['2xl'],
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
  },
});
