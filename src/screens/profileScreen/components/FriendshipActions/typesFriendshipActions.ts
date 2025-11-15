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

export interface FriendshipData {
  status: string | null;
  friendshipId?: string;
  requesterId?: string;
  addresseeId?: string;
}
