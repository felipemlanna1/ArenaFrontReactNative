import { StyleSheet } from 'react-native';
import { ArenaSpacing, ArenaBorders, ArenaColors } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: ArenaSpacing.sm,
    paddingVertical: ArenaSpacing.xs,
    borderRadius: ArenaBorders.radius.pill,
    borderWidth: 1,
    gap: ArenaSpacing.xs,
  },
  containerSm: {
    paddingHorizontal: ArenaSpacing.xs,
    paddingVertical: 2,
  },
  containerMd: {
    paddingHorizontal: ArenaSpacing.sm,
    paddingVertical: ArenaSpacing.xs,
  },
  containerLg: {
    paddingHorizontal: ArenaSpacing.md,
    paddingVertical: ArenaSpacing.sm,
  },
  public: {
    backgroundColor: ArenaColors.semantic.successSubtle,
    borderColor: ArenaColors.semantic.success,
  },
  groupOnly: {
    backgroundColor: ArenaColors.brand.primarySubtle,
    borderColor: ArenaColors.brand.primary,
  },
  approvalRequired: {
    backgroundColor: ArenaColors.semantic.warningSubtle,
    borderColor: ArenaColors.semantic.warning,
  },
  inviteOnly: {
    backgroundColor: ArenaColors.semantic.errorSubtle,
    borderColor: ArenaColors.semantic.error,
  },
});
