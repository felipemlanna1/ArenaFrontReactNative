import { FriendshipStatus } from '@/services/friendships/typesFriendships';

export interface PrivateProfileBannerProps {
  userId: string;
  userName: string;
  friendshipStatus: FriendshipStatus | null;
  onSendRequest: () => void;
  onBack: () => void;
  testID?: string;
}
