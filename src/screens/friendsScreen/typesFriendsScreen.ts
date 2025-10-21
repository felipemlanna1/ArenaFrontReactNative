import { UserData } from '@/services/http';

export interface FriendsScreenProps {
  navigation: any;
}

export interface UseFriendsScreenReturn {
  friends: UserData[];
  incomingRequests: UserData[];
  recommendations: UserData[];
  isLoadingFriends: boolean;
  isLoadingRequests: boolean;
  isLoadingRecommendations: boolean;
  refreshing: boolean;
  handleRefresh: () => Promise<void>;
  handleRemoveFriend: (userId: string) => Promise<void>;
  handleAcceptRequest: (userId: string) => Promise<void>;
  handleRejectRequest: (userId: string) => Promise<void>;
  handleSendRequest: (userId: string) => Promise<void>;
  handleNavigateToProfile: (userId: string) => void;
  loadingUserId: string | null;
}
