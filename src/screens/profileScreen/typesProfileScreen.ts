import { UserData } from '@/services/http';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/typesNavigation';

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
  isLoading: boolean;
  isRefreshing: boolean;
  error: Error | null;
  isOwnProfile: boolean;
  currentUserId: string | null;
  refetch: () => Promise<void>;
  handleEditPress: () => void;
  handleBackPress: () => void;
  handleLogout: () => void;
}

export interface ProfileDisplayData {
  fullName: string;
  username: string;
  age: number | null;
  gender: string | null;
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
