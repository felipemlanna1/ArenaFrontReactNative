import { httpService } from '@/services/http';

interface FriendshipFilterDto {
  query?: string;
  city?: string;
  state?: string;
  page?: number;
  limit?: number;
}

interface Friend {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  profilePicture?: string;
  city?: string;
  state?: string;
  favoriteSports?: { id: string; name: string }[];
}

class FriendsApi {
  private readonly basePath = 'api/v1/friendships';

  async getFriends(
    userId: string,
    filters?: FriendshipFilterDto
  ): Promise<{ data: Friend[]; total: number }> {
    const queryParams = new URLSearchParams();

    if (filters?.query) queryParams.append('query', filters.query);
    if (filters?.city) queryParams.append('city', filters.city);
    if (filters?.state) queryParams.append('state', filters.state);
    if (filters?.page) queryParams.append('page', filters.page.toString());
    if (filters?.limit) queryParams.append('limit', filters.limit.toString());

    const url = `${this.basePath}/friends${
      queryParams.toString() ? `?${queryParams.toString()}` : ''
    }`;

    return await httpService.getDirect(url);
  }

  async sendFriendRequest(userId: string, message?: string): Promise<void> {
    await httpService.post(`${this.basePath}/request`, {
      addresseeId: userId,
      message,
    });
  }

  async acceptFriendRequest(friendshipId: string): Promise<void> {
    await httpService.post(`${this.basePath}/${friendshipId}/accept`, {});
  }

  async rejectFriendRequest(friendshipId: string): Promise<void> {
    await httpService.post(`${this.basePath}/${friendshipId}/reject`, {});
  }

  async cancelFriendRequest(friendshipId: string): Promise<void> {
    await httpService.delete(`${this.basePath}/${friendshipId}`);
  }

  async removeFriend(friendshipId: string): Promise<void> {
    await httpService.delete(`${this.basePath}/${friendshipId}`);
  }

  async getIncomingRequests(): Promise<Friend[]> {
    const response = await httpService.getDirect<Friend[]>(
      `${this.basePath}/requests/incoming`
    );
    return response;
  }

  async getOutgoingRequests(): Promise<Friend[]> {
    const response = await httpService.getDirect<Friend[]>(
      `${this.basePath}/requests/outgoing`
    );
    return response;
  }

  async getRecommendations(filters?: FriendshipFilterDto): Promise<Friend[]> {
    const queryParams = new URLSearchParams();

    if (filters?.city) queryParams.append('city', filters.city);
    if (filters?.state) queryParams.append('state', filters.state);
    if (filters?.page) queryParams.append('page', filters.page.toString());
    if (filters?.limit) queryParams.append('limit', filters.limit.toString());

    const url = `${this.basePath}/recommendations${
      queryParams.toString() ? `?${queryParams.toString()}` : ''
    }`;

    const response = await httpService.getDirect<Friend[]>(url);
    return response;
  }
}

export const friendsApi = new FriendsApi();
