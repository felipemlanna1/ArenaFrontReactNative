import { UserData } from '../http';

export enum FriendshipStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  BLOCKED = 'BLOCKED',
}

export interface Friendship {
  id: string;
  requesterId: string;
  addresseeId: string;
  status: FriendshipStatus;
  createdAt: string;
  updatedAt: string;
  requester?: UserData;
  addressee?: UserData;
}

export interface SendFriendRequestDto {
  addresseeId: string;
  message?: string;
}

export interface UpdateFriendshipDto {
  status: FriendshipStatus.ACCEPTED | FriendshipStatus.REJECTED | FriendshipStatus.BLOCKED;
}

export enum FriendshipType {
  FRIENDS = 'friends',
  INCOMING = 'incoming',
  OUTGOING = 'outgoing',
  RECOMMENDATIONS = 'recommendations',
}

export interface FriendshipFilter {
  status?: FriendshipStatus;
  query?: string;
  city?: string;
  state?: string;
  sportId?: string;
  page?: number;
  limit?: number;
}

export interface UnifiedFriendshipFilter {
  type: FriendshipType;
  query?: string;
  city?: string;
  state?: string;
  sportId?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedUsersResponse {
  data: UserData[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface FriendsListResponse {
  data: UserData[];
  total: number;
}

export interface InvitableUsersResponse {
  friends: UserData[];
  others: UserData[];
}
