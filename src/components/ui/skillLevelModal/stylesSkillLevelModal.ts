import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: `${ArenaColors.neutral.darkest}CC`,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: ArenaColors.neutral.dark,
    borderTopLeftRadius: ArenaBorders.radius.xl,
    borderTopRightRadius: ArenaBorders.radius.xl,
    paddingBottom: ArenaSpacing['2xl'],
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: ArenaSpacing.md,
    right: ArenaSpacing.md,
    zIndex: 1,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sportIconContainer: {
    alignItems: 'center',
    marginTop: ArenaSpacing['2xl'],
    marginBottom: ArenaSpacing.md,
  },
  sportIcon: {
    width: 64,
    height: 64,
  },
  sportName: {
    textAlign: 'center',
    marginBottom: ArenaSpacing.lg,
  },
  questionText: {
    textAlign: 'center',
    marginBottom: ArenaSpacing.md,
  },
  levelsList: {
    paddingHorizontal: ArenaSpacing.lg,
    maxHeight: 280,
  },
  levelOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: ArenaSpacing.md,
    paddingHorizontal: ArenaSpacing.lg,
    borderRadius: ArenaBorders.radius.lg,
    borderWidth: 1,
    borderColor: ArenaColors.neutral.medium,
    backgroundColor: ArenaColors.neutral.darkest,
    marginBottom: ArenaSpacing.sm,
  },
  levelOptionSelected: {
    borderColor: ArenaColors.brand.primary,
    borderWidth: 2,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: ArenaSpacing.xs,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: ArenaBorders.radius.circle,
    backgroundColor: ArenaColors.neutral.medium,
  },
  dotFilled: {
    backgroundColor: ArenaColors.neutral.light,
  },
  dotFilledSelected: {
    backgroundColor: ArenaColors.brand.primary,
  },
  primarySection: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.md,
    marginTop: ArenaSpacing.sm,
  },
  primaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.sm,
  },
  primaryLabel: {
    flex: 1,
  },
  buttonContainer: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingTop: ArenaSpacing.md,
  },
  removeLink: {
    alignItems: 'center',
    paddingVertical: ArenaSpacing.md,
  },
  removeLinkText: {
    color: ArenaColors.semantic.error,
  },
});
