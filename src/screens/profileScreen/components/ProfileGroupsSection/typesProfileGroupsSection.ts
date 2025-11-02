import { Group } from '@/services/groups/typesGroups';

export interface ProfileGroupsSectionProps {
  userId: string;
  isOwnProfile: boolean;
}

export interface UseProfileGroupsReturn {
  groups: Group[];
  isLoading: boolean;
  error: Error | null;
}
