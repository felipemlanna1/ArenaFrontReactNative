import { UserData } from '@/services/http';
import { NavigationProp } from '@react-navigation/native';

export interface FriendsScreenProps {
  navigation: NavigationProp<Record<string, object | undefined>>;
}

export interface UseFriendsScreenReturn {
  friends: UserData[];
  incomingRequests: UserData[];
  outgoingRequests: UserData[];
  recommendations: UserData[];
  isLoadingFriends: boolean;
  isLoadingRequests: boolean;
  isLoadingOutgoing: boolean;
  isLoadingRecommendations: boolean;
  refreshing: boolean;
  handleRefresh: () => Promise<void>;
  handleRemoveFriend: (userId: string) => Promise<void>;
  handleAcceptRequest: (userId: string) => Promise<void>;
  handleRejectRequest: (userId: string) => Promise<void>;
  handleCancelRequest: (userId: string) => Promise<void>;
  handleSendRequest: (userId: string) => Promise<void>;
  handleNavigateToProfile: (userId: string) => void;
  loadingUserId: string | null;
  handleLogout: () => Promise<void>;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  selectedState: string;
  setSelectedState: (state: string) => void;
  selectedSportId: string | undefined;
  setSelectedSportId: (sportId: string | undefined) => void;
  handleClearFilters: () => void;
  hasActiveFilters: boolean;
  hasMoreFriends: boolean;
  hasMoreIncoming: boolean;
  hasMoreOutgoing: boolean;
  hasMoreRecommendations: boolean;
  isLoadingMoreFriends: boolean;
  isLoadingMoreIncoming: boolean;
  isLoadingMoreOutgoing: boolean;
  isLoadingMoreRecommendations: boolean;
  handleLoadMoreFriends: () => void;
  handleLoadMoreIncoming: () => void;
  handleLoadMoreOutgoing: () => void;
  handleLoadMoreRecommendations: () => void;
}
