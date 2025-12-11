import { StyleSheet } from 'react-native';
import {
  ArenaColors,
  ArenaSpacing,
  ArenaBorders,
  ArenaTypography,
} from '@/constants';

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: `${ArenaColors.neutral.darkest}CC`,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: ArenaColors.neutral.dark,
    borderTopLeftRadius: ArenaBorders.radius.lg,
    borderTopRightRadius: ArenaBorders.radius.lg,
    paddingBottom: ArenaSpacing['2xl'],
  },
  modalHeader: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.md,
    borderBottomWidth: ArenaBorders.width.thin,
    borderBottomColor: `${ArenaColors.neutral.medium}33`,
    alignItems: 'center',
  },
  modalTitle: {
    textAlign: 'center',
  },
  levelsList: {
    padding: ArenaSpacing.lg,
    gap: ArenaSpacing.sm,
  },
  levelOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: ArenaSpacing.md,
    paddingHorizontal: ArenaSpacing.md,
    borderRadius: ArenaBorders.radius.md,
    borderWidth: ArenaBorders.width.medium,
    borderColor: `${ArenaColors.neutral.medium}33`,
    backgroundColor: `${ArenaColors.neutral.darkest}80`,
    gap: ArenaSpacing.md,
  },
  levelOptionSelected: {
    borderColor: ArenaColors.brand.primary,
    backgroundColor: `${ArenaColors.brand.primary}1A`,
  },
  levelIcon: {
    width: ArenaTypography.size['4xl'],
    alignItems: 'center',
  },
  levelContent: {
    flex: 1,
    gap: ArenaSpacing.xs,
  },
  levelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.xs,
  },
  checkIcon: {
    marginLeft: 'auto',
  },
  primarySection: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingTop: ArenaSpacing.md,
    borderTopWidth: ArenaBorders.width.thin,
    borderTopColor: `${ArenaColors.neutral.medium}33`,
    gap: ArenaSpacing.xs,
  },
  buttonContainer: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingTop: ArenaSpacing.md,
    gap: ArenaSpacing.sm,
  },
});
