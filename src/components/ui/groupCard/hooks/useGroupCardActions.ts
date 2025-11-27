import { useMemo } from 'react';
import {
  GroupMembershipStatus,
  GroupUserRole,
} from '@/services/groups/typesGroups';

interface UseGroupCardActionsProps {
  currentUserStatus?: GroupMembershipStatus;
  currentUserRole?: GroupUserRole;
  isPublic: boolean;
  memberCount: number;
  maxMembers?: number | null;
  isLoading?: boolean;
  currentActionGroupId?: string | null;
  groupId: string;
}

export interface ActionButton {
  key: 'view' | 'action' | 'secondary';
  label: string;
  variant:
    | 'primary'
    | 'secondary'
    | 'subtle'
    | 'destructive'
    | 'outline-light'
    | 'outline-primary'
    | 'ghost';
  type: 'view' | 'join' | 'leave';
  testID: string;
  loading: boolean;
  disabled: boolean;
}

interface UseGroupCardActionsReturn {
  viewButton: ActionButton;
  actionButton: ActionButton | null;
  secondaryActionButton: ActionButton | null;
}

const isOwner = (role?: GroupUserRole): boolean => {
  return role === 'OWNER';
};

const canManageGroup = (role?: GroupUserRole): boolean => {
  return role === 'OWNER' || role === 'ADMIN';
};

const isMember = (status?: GroupMembershipStatus): boolean => {
  return status === 'MEMBER';
};

const hasNoMembership = (status?: GroupMembershipStatus): boolean => {
  return !status || status === 'NONE';
};

const createJoinButton = (
  isLoading: boolean,
  isDisabled: boolean
): ActionButton => ({
  key: 'action',
  label: 'ENTRAR',
  variant: 'primary',
  type: 'join',
  testID: 'group-card-join-button',
  loading: isLoading,
  disabled: isDisabled,
});

const createLeaveButton = (
  isLoading: boolean,
  isDisabled: boolean
): ActionButton => ({
  key: 'action',
  label: 'SAIR',
  variant: 'ghost',
  type: 'leave',
  testID: 'group-card-leave-button',
  loading: isLoading,
  disabled: isDisabled,
});

export const useGroupCardActions = ({
  currentUserStatus,
  currentUserRole,
  isPublic,
  memberCount,
  maxMembers,
  isLoading = false,
  currentActionGroupId,
  groupId,
}: UseGroupCardActionsProps): UseGroupCardActionsReturn => {
  const isGroupFull = useMemo(() => {
    if (!maxMembers) return false;
    return memberCount >= maxMembers;
  }, [memberCount, maxMembers]);

  const isThisGroupLoading = useMemo(
    () => isLoading && currentActionGroupId === groupId,
    [isLoading, currentActionGroupId, groupId]
  );

  const viewButton: ActionButton = useMemo(
    () => ({
      key: 'view',
      label: canManageGroup(currentUserRole) ? 'GERENCIAR' : 'VER',
      variant: canManageGroup(currentUserRole) ? 'secondary' : 'outline-light',
      type: 'view',
      testID: 'group-card-view-button',
      loading: false,
      disabled: false,
    }),
    [currentUserRole]
  );

  const actionButton = useMemo((): ActionButton | null => {
    if (
      isMember(currentUserStatus) &&
      currentUserRole &&
      !isOwner(currentUserRole)
    ) {
      return createLeaveButton(isThisGroupLoading, isThisGroupLoading);
    }

    if (hasNoMembership(currentUserStatus)) {
      if (!isPublic) {
        return null;
      }

      if (isGroupFull) {
        return null;
      }

      return createJoinButton(isThisGroupLoading, isThisGroupLoading);
    }

    return null;
  }, [
    currentUserStatus,
    currentUserRole,
    isPublic,
    isGroupFull,
    isThisGroupLoading,
  ]);

  const secondaryActionButton = useMemo((): ActionButton | null => {
    return null;
  }, []);

  return {
    viewButton,
    actionButton,
    secondaryActionButton,
  };
};
