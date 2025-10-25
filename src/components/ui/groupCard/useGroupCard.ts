import { useCallback } from 'react';

export interface UseGroupCardParams {
  groupId: string;
  currentUserStatus?: string;
  onPress?: (groupId: string) => void;
  onJoinPress?: (groupId: string) => Promise<void>;
  onLeavePress?: (groupId: string) => Promise<void>;
}

export const useGroupCard = ({
  groupId,
  currentUserStatus,
  onPress,
  onJoinPress,
  onLeavePress,
}: UseGroupCardParams) => {
  const isMember = currentUserStatus === 'MEMBER';

  const handleCardPress = useCallback(() => {
    if (onPress) {
      onPress(groupId);
    }
  }, [onPress, groupId]);

  const handleJoinPress = useCallback(async () => {
    if (onJoinPress) {
      await onJoinPress(groupId);
    }
  }, [onJoinPress, groupId]);

  const handleLeavePress = useCallback(async () => {
    if (onLeavePress) {
      await onLeavePress(groupId);
    }
  }, [onLeavePress, groupId]);

  const getRoleBadgeVariant = useCallback(
    (
      role: string
    ): 'default' | 'primary' | 'success' | 'error' | 'outlined' => {
      switch (role) {
        case 'OWNER':
          return 'primary';
        case 'ADMIN':
          return 'success';
        case 'MODERATOR':
          return 'outlined';
        default:
          return 'default';
      }
    },
    []
  );

  return {
    isMember,
    handleCardPress,
    handleJoinPress,
    handleLeavePress,
    getRoleBadgeVariant,
  };
};
