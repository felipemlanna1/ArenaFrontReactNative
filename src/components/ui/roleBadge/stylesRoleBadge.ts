import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';
import { RoleType, RoleConfig, RoleBadgeSize } from './typesRoleBadge';

export const roleConfigs: Record<RoleType, RoleConfig> = {
  OWNER: {
    label: 'Proprietário',
    icon: 'ribbon',
    backgroundColor: ArenaColors.brand.primary,
    textColor: ArenaColors.neutral.light,
    borderColor: ArenaColors.brand.primary,
  },
  ADMIN: {
    label: 'Admin',
    icon: 'star',
    backgroundColor: ArenaColors.semantic.success,
    textColor: ArenaColors.neutral.light,
    borderColor: ArenaColors.semantic.success,
  },
  MODERATOR: {
    label: 'Moderador',
    icon: 'shield-checkmark',
    backgroundColor: ArenaColors.semantic.warning,
    textColor: ArenaColors.neutral.darkest,
    borderColor: ArenaColors.semantic.warning,
  },
  MEMBER: {
    label: 'Membro',
    icon: 'person',
    backgroundColor: ArenaColors.neutral.dark,
    textColor: ArenaColors.neutral.medium,
    borderColor: ArenaColors.neutral.medium,
  },
};

export const sizeConfigs: Record<
  RoleBadgeSize,
  {
    paddingVertical: number;
    paddingHorizontal: number;
    iconSize: number;
    borderRadius: number;
  }
> = {
  sm: {
    paddingVertical: ArenaSpacing.xs,
    paddingHorizontal: ArenaSpacing.sm,
    iconSize: ArenaSpacing.md,
    borderRadius: ArenaBorders.radius.sm,
  },
  md: {
    paddingVertical: ArenaSpacing.sm,
    paddingHorizontal: ArenaSpacing.md,
    iconSize: ArenaSpacing.lg,
    borderRadius: ArenaBorders.radius.md,
  },
};

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: ArenaBorders.width.thin,
  },
  iconContainer: {
    marginRight: ArenaSpacing.xs,
  },
});
