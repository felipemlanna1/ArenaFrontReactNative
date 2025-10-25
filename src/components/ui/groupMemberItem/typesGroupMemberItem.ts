import { GroupMember } from '@/services/groups/typesGroups';

export interface GroupMemberItemProps {
  member: GroupMember;
  onPress?: (memberId: string) => void;
  onRoleChange?: (memberId: string, newRole: string) => Promise<void>;
  onRemove?: (memberId: string) => void | Promise<void>;
  showActions?: boolean;
  isActionLoading?: boolean;
  currentActionMemberId?: string | null;
  currentUserRole?: string;
  testID?: string;
}
