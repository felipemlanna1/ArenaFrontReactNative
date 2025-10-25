import { Group } from '@/services/groups/typesGroups';

export interface GroupCardProps {
  group: Group;
  onPress?: (groupId: string) => void;
  onJoinPress?: (groupId: string) => Promise<void>;
  onLeavePress?: (groupId: string) => Promise<void>;
  isActionLoading?: boolean;
  currentActionGroupId?: string | null;
  showActions?: boolean;
  variant?: 'default' | 'compact';
  testID?: string;
}
