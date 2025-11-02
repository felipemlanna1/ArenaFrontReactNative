import { Group, Sport } from '@/services/groups/typesGroups';

export interface GroupCardProps {
  group: Group;
  onDetailsPress: (groupId: string) => void;
  onManagePress: (groupId: string) => void;
  onJoinGroup: (groupId: string) => Promise<void>;
  onLeaveGroup: (groupId: string) => Promise<void>;
  isActionLoading?: boolean;
  currentActionGroupId?: string | null;
  testID?: string;
}

export interface GroupCardImageProps {
  coverImage?: string | null;
  name: string;
  sport?: Sport;
  isPublic: boolean;
  memberCount: number;
  maxMembers?: number | null;
  testID?: string;
}
