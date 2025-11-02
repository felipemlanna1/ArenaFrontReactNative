import { httpService } from '../http';
import {
  Group,
  GroupSearchOptions,
  PaginatedGroupsResponse,
  CreateGroupDto,
  UpdateGroupDto,
  AddMemberDto,
  UpdateMemberRoleDto,
  GroupMember,
  GroupStatistics,
} from './typesGroups';
import { Event } from '../events/typesEvents';

interface InvitableUser {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  profileImageUrl?: string;
  favoriteSports?: { id: string; name: string }[];
}

const prepareParams = (params: Record<string, unknown>): URLSearchParams => {
  const searchParams = new URLSearchParams();

  Object.keys(params).forEach(key => {
    const value = params[key];
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        value.forEach(item => {
          searchParams.append(`${key}[]`, String(item));
        });
      } else {
        searchParams.append(key, String(value));
      }
    }
  });

  return searchParams;
};

export class GroupsApi {
  private readonly basePath = '/groups';

  async getGroups(
    options: GroupSearchOptions = {}
  ): Promise<PaginatedGroupsResponse> {
    const params: Record<string, unknown> = {
      page: options.page || 1,
      limit: options.limit || 10,
    };

    if (options.search) params.search = options.search;
    if (options.sportId) params.sportId = options.sportId;
    if (options.city) params.city = options.city;
    if (options.state) params.state = options.state;

    const queryString = prepareParams(params).toString();
    const url = queryString ? `${this.basePath}?${queryString}` : this.basePath;

    const response = await httpService.getDirect<PaginatedGroupsResponse>(url);
    return response;
  }

  async getMyGroups(): Promise<Group[]> {
    const response = await httpService.getDirect<GroupMember[]>(
      `${this.basePath}/my-groups`
    );

    const filtered = response.filter(
      (member): member is GroupMember & { group: Group } =>
        Boolean(member.group) && member.isActive
    );

    const groups = filtered.map(member => {
      const groupWithRole = {
        ...member.group,
        currentUserRole: member.role,
        currentUserStatus: 'MEMBER' as const,
      };

      return groupWithRole;
    });

    return groups;
  }

  async getCreatableGroups(): Promise<Group[]> {
    const response = await httpService.getDirect<Group[]>(
      `${this.basePath}/my-groups/creatable`
    );
    return response;
  }

  async getGroupById(groupId: string): Promise<Group> {
    const response = await httpService.getDirect<Group>(
      `${this.basePath}/${groupId}`
    );

    return response;
  }

  async createGroup(dto: CreateGroupDto): Promise<Group> {
    const response = await httpService.post<Group>(this.basePath, dto);
    return response;
  }

  async updateGroup(groupId: string, dto: UpdateGroupDto): Promise<Group> {
    const response = await httpService.put<Group>(
      `${this.basePath}/${groupId}`,
      dto
    );
    return response;
  }

  async deleteGroup(groupId: string): Promise<void> {
    await httpService.delete(`${this.basePath}/${groupId}`);
  }

  async requestJoin(groupId: string): Promise<void> {
    await httpService.post(`${this.basePath}/${groupId}/join`, {});
  }

  async leaveGroup(groupId: string): Promise<void> {
    await httpService.post(`${this.basePath}/${groupId}/leave`, {});
  }

  async getMembers(groupId: string): Promise<GroupMember[]> {
    const response = await httpService.getDirect<GroupMember[]>(
      `${this.basePath}/${groupId}/members`
    );
    return response;
  }

  async addMember(groupId: string, dto: AddMemberDto): Promise<void> {
    await httpService.post(`${this.basePath}/${groupId}/members`, dto);
  }

  async updateMemberRole(
    groupId: string,
    memberId: string,
    dto: UpdateMemberRoleDto
  ): Promise<void> {
    await httpService.patch(
      `${this.basePath}/${groupId}/members/${memberId}/role`,
      dto
    );
  }

  async removeMember(groupId: string, memberId: string): Promise<void> {
    await httpService.delete(`${this.basePath}/${groupId}/members/${memberId}`);
  }

  async getGroupEvents(groupId: string): Promise<Event[]> {
    const response = await httpService.getDirect<Event[]>(
      `${this.basePath}/${groupId}/events`
    );
    return response;
  }

  async getGroupStatistics(groupId: string): Promise<GroupStatistics> {
    const response = await httpService.getDirect<GroupStatistics>(
      `${this.basePath}/${groupId}/statistics`
    );
    return response;
  }

  async getUserGroups(userId: string): Promise<Group[]> {
    try {
      const response = await httpService.getDirect<GroupMember[] | Group[]>(
        `/users/${userId}/groups`
      );

      if (!response) {
        return [];
      }

      if (!Array.isArray(response)) {
        return [];
      }

      if (response.length === 0) {
        return [];
      }

      const firstItem = response[0];
      if ('group' in firstItem && firstItem.group) {
        const filtered = (response as GroupMember[]).filter(
          (member): member is GroupMember & { group: Group } =>
            Boolean(member.group) && member.isActive
        );
        return filtered.map(member => member.group);
      }

      return response as Group[];
    } catch {
      return [];
    }
  }

  async getRecommendations(
    options: GroupSearchOptions = {}
  ): Promise<PaginatedGroupsResponse> {
    const params: Record<string, unknown> = {
      page: options.page || 1,
      limit: options.limit || 10,
    };

    if (options.search) params.search = options.search;
    if (options.sportId) params.sportId = options.sportId;
    if (options.city) params.city = options.city;
    if (options.state) params.state = options.state;

    const queryString = prepareParams(params).toString();
    const url = queryString
      ? `${this.basePath}/available?${queryString}`
      : `${this.basePath}/available`;

    const response = await httpService.getDirect<PaginatedGroupsResponse>(url);

    return response;
  }

  async cancelJoinRequest(groupId: string): Promise<void> {
    await httpService.delete(`${this.basePath}/${groupId}/requests`);
  }

  async createJoinRequest(groupId: string, message?: string): Promise<void> {
    await httpService.post(`${this.basePath}/${groupId}/requests`, { message });
  }

  async getJoinRequests(groupId: string): Promise<unknown[]> {
    const response = await httpService.getDirect<unknown[]>(
      `${this.basePath}/${groupId}/requests`
    );
    return response;
  }

  async approveJoinRequest(groupId: string, userId: string): Promise<void> {
    await httpService.post(
      `${this.basePath}/${groupId}/requests/${userId}/approve`,
      {}
    );
  }

  async rejectJoinRequest(groupId: string, userId: string): Promise<void> {
    await httpService.post(
      `${this.basePath}/${groupId}/requests/${userId}/reject`,
      {}
    );
  }

  async inviteMembers(
    groupId: string,
    userIds: string[],
    message?: string
  ): Promise<void> {
    const promises = userIds.map(userId =>
      httpService.post(`${this.basePath}/${groupId}/members`, {
        userId,
        role: 'MEMBER',
      })
    );
    await Promise.all(promises);
  }

  async getInvitableUsers(
    groupId: string,
    params?: {
      query?: string;
      limit?: number;
    }
  ): Promise<{
    data: {
      friends: InvitableUser[];
      others: InvitableUser[];
      invited: InvitableUser[];
    };
    message: string;
    success: boolean;
  }> {
    const queryParams = new URLSearchParams();
    if (params?.query) queryParams.append('query', params.query);
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const url = `${this.basePath}/${groupId}/invitable-users${
      queryParams.toString() ? `?${queryParams.toString()}` : ''
    }`;

    return await httpService.getDirect(url);
  }
}

export const groupsApi = new GroupsApi();
