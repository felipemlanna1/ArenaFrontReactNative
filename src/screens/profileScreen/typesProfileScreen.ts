import { UserData } from '@/services/http';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/typesNavigation';
import { FriendshipStatus } from '@/services/friendships/typesFriendships';

export type ProfileScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Profile'
> & {
  testID?: string;
};

export interface UseProfileScreenParams {
  userId?: string;
}

export interface UseProfileScreenReturn {
  user: UserData | null;
  userId: string | undefined;
  isLoading: boolean;
  isRefreshing: boolean;
  error: Error | null;
  isOwnProfile: boolean;
  currentUserId: string | null;
  friendshipStatus: FriendshipStatus | null;
  canViewFullProfile: boolean;
  refetch: () => Promise<void>;
  handleEditPress: () => void;
  handleBackPress: () => void;
  handleLogout: () => void;
  handleSendFriendRequest: () => Promise<void>;
}

export interface ProfileDisplayData {
  fullName: string;
  username: string;
  age: number | null;
  gender: string | null;
  city: string | null;
  state: string | null;
  bio: string | null;
  avatarUrl: string | null;
  sports: SportBadgeData[];
}

export interface SportBadgeData {
  id: string;
  name: string;
  icon: string;
  color: string;
  isPrimary: boolean;
  skillLevel?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'PROFESSIONAL';
}
