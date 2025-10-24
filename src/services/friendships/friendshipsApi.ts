import { httpService, UserData } from '../http';
import {
  Friendship,
  SendFriendRequestDto,
  UpdateFriendshipDto,
  FriendshipFilter,
  FriendshipType,
  UnifiedFriendshipFilter,
  PaginatedUsersResponse,
  FriendsListResponse,
} from './typesFriendships';

class FriendshipsApi {
  private basePath = '/friendships';

  async getUsers(
    type: FriendshipType,
    filters: Omit<UnifiedFriendshipFilter, 'type'> = {},
    page: number = 1,
    limit: number = 20
  ): Promise<PaginatedUsersResponse> {
    const params: Record<string, string> = {
      type,
      page: page.toString(),
      limit: limit.toString(),
    };

    if (type !== FriendshipType.OUTGOING) {
      if (filters.query) params.query = filters.query;
      if (filters.city) params.city = filters.city;
      if (filters.state) params.state = filters.state;
      if (filters.sportId) params.sportId = filters.sportId;
    }

    const queryString = new URLSearchParams(params).toString();
    const url = `${this.basePath}?${queryString}`;

    const response = await httpService.get<PaginatedUsersResponse>(url);
    return response;
  }

  async sendFriendRequest(dto: SendFriendRequestDto): Promise<Friendship> {
    const response = await httpService.post<Friendship>(
      `${this.basePath}/request`,
      dto
    );
    return response;
  }

  async acceptFriendRequest(friendshipId: string): Promise<Friendship> {
    const response = await httpService.patch<Friendship>(
      `${this.basePath}/${friendshipId}`,
      { status: 'ACCEPTED' }
    );
    return response;
  }

  async rejectFriendRequest(friendshipId: string): Promise<Friendship> {
    const response = await httpService.patch<Friendship>(
      `${this.basePath}/${friendshipId}`,
      { status: 'REJECTED' }
    );
    return response;
  }

  async updateFriendship(
    friendshipId: string,
    dto: UpdateFriendshipDto
  ): Promise<Friendship> {
    const response = await httpService.patch<Friendship>(
      `${this.basePath}/${friendshipId}`,
      dto
    );
    return response;
  }

  async getFriends(
    filters: FriendshipFilter = {}
  ): Promise<FriendsListResponse> {
    const params: Record<string, string> = {};

    if (filters.query) params.query = filters.query;
    if (filters.city) params.city = filters.city;
    if (filters.state) params.state = filters.state;
    if (filters.sportId) params.sportId = filters.sportId;
    if (filters.page) params.page = filters.page.toString();
    if (filters.limit) params.limit = filters.limit.toString();

    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${this.basePath}?${queryString}` : this.basePath;

    const response = await httpService.get<FriendsListResponse>(url);
    return response;
  }

  async getIncomingRequests(): Promise<Friendship[]> {
    const response = await httpService.get<Friendship[]>(
      `${this.basePath}/requests/incoming`
    );
    return response;
  }

  async getOutgoingRequests(): Promise<Friendship[]> {
    const response = await httpService.get<Friendship[]>(
      `${this.basePath}/requests/outgoing`
    );
    return response;
  }

  async removeFriend(friendId: string): Promise<void> {
    await httpService.delete(`${this.basePath}/${friendId}`);
  }

  async cancelFriendRequest(requestId: string): Promise<void> {
    await httpService.delete(`${this.basePath}/requests/${requestId}`);
  }

  async blockUser(userId: string): Promise<Friendship> {
    const response = await httpService.post<Friendship>(
      `${this.basePath}/block/${userId}`,
      {}
    );
    return response;
  }

  async unblockUser(userId: string): Promise<void> {
    await httpService.delete(`${this.basePath}/block/${userId}`);
  }

  async getFriendshipStatus(
    userId: string
  ): Promise<{ status: string | null }> {
    const response = await httpService.get<{ status: string | null }>(
      `${this.basePath}/status/${userId}`
    );
    return response;
  }

  async getRecommendations(
    filters: FriendshipFilter = {},
    limit: number = 20
  ): Promise<UserData[]> {
    const params: Record<string, string> = { limit: limit.toString() };

    if (filters.query) params.query = filters.query;
    if (filters.city) params.city = filters.city;
    if (filters.state) params.state = filters.state;
    if (filters.sportId) params.sportId = filters.sportId;

    const queryString = new URLSearchParams(params).toString();
    const url = `${this.basePath}/recommendations?${queryString}`;

    const response = await httpService.get<UserData[]>(url);
    return response;
  }
}

export const friendshipsApi = new FriendshipsApi();
