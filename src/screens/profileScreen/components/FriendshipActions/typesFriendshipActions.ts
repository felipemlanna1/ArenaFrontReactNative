import { Friendship } from '@/services/friendships/typesFriendships';

export interface FriendshipActionsProps {
  userId: string;
  onStatusChange?: () => void;
}

export type FriendshipActionType =
  | 'none'
  | 'pending_sent'
  | 'pending_received'
  | 'accepted'
  | 'loading';

export type FriendshipData = Friendship | { status: null };
