import { httpService } from '../http';
import { EventsFilter, EventsResponse, Event } from './typesEvents';
import { CreateEventDto } from '@/screens/createEventScreen/typesCreateEventScreen';

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

export class EventsApi {
  private readonly basePath = '/events';

  async getFeedEvents(
    page: number = 1,
    filters: EventsFilter = {}
  ): Promise<EventsResponse> {
    const params: Record<string, unknown> = {
      page,
      limit: filters.limit || 10,
    };

    if (filters.search) params.search = filters.search;
    if (filters.sportIds && filters.sportIds.length > 0) {
      params.sportIds = filters.sportIds;
    }
    if (filters.skillLevel && filters.skillLevel.length > 0) {
      params.skillLevel = filters.skillLevel;
    }
    if (filters.privacy && filters.privacy.length > 0) {
      params.privacy = filters.privacy;
    }
    if (filters.status && filters.status.length > 0) {
      params.status = filters.status;
    }
    if (filters.startDateFrom) params.startDateFrom = filters.startDateFrom;
    if (filters.startDateTo) params.startDateTo = filters.startDateTo;
    if (filters.priceMin !== undefined) params.priceMin = filters.priceMin;
    if (filters.priceMax !== undefined) params.priceMax = filters.priceMax;
    if (filters.isFree !== undefined) params.isFree = filters.isFree;
    if (filters.hasAvailableSpots !== undefined) {
      params.hasAvailableSpots = filters.hasAvailableSpots;
    }
    if (filters.city) params.city = filters.city;
    if (filters.state) params.state = filters.state;
    if (filters.userEventStatus && filters.userEventStatus.length > 0) {
      params.userEventStatus = filters.userEventStatus;
    }
    if (filters.sortBy) params.sortBy = filters.sortBy;
    if (filters.sortOrder) params.sortOrder = filters.sortOrder;

    const queryString = prepareParams(params).toString();
    const url = queryString ? `${this.basePath}?${queryString}` : this.basePath;

    const response = await httpService.get<EventsResponse>(url);
    return response;
  }

  async getEventDetails(eventId: string): Promise<Event> {
    const response = await httpService.get<Event>(
      `${this.basePath}/${eventId}`
    );
    return response;
  }

  async joinEvent(eventId: string): Promise<void> {
    await httpService.post(`${this.basePath}/${eventId}/join`, {});
  }

  async requestJoin(eventId: string): Promise<void> {
    await httpService.post(`${this.basePath}/${eventId}/request-join`, {});
  }

  async leaveEvent(eventId: string): Promise<void> {
    await httpService.delete(`${this.basePath}/${eventId}/leave`);
  }

  async cancelRequest(eventId: string): Promise<void> {
    await httpService.delete(`${this.basePath}/${eventId}/request-join`);
  }

  async acceptInvitation(eventId: string, invitationId: string): Promise<void> {
    await httpService.post(
      `${this.basePath}/${eventId}/invitations/${invitationId}/accept`,
      {}
    );
  }

  async acceptInvitationByEventId(eventId: string): Promise<void> {
    await httpService.post(
      `${this.basePath}/${eventId}/invitations/accept`,
      {}
    );
  }

  async rejectInvitation(eventId: string, invitationId: string): Promise<void> {
    await httpService.delete(
      `${this.basePath}/${eventId}/invitations/${invitationId}/reject`
    );
  }

  async rejectInvitationByEventId(eventId: string): Promise<void> {
    await httpService.post(
      `${this.basePath}/${eventId}/invitations/reject`,
      {}
    );
  }

  async createEvent(dto: CreateEventDto): Promise<Event> {
    const response = await httpService.post<Event>(this.basePath, dto);
    return response;
  }

  async approveParticipant(
    eventId: string,
    participantId: string
  ): Promise<void> {
    await httpService.post(
      `${this.basePath}/${eventId}/participants/${participantId}/approve`,
      {}
    );
  }

  async rejectParticipant(
    eventId: string,
    participantId: string
  ): Promise<void> {
    await httpService.post(
      `${this.basePath}/${eventId}/participants/${participantId}/reject`,
      {}
    );
  }

  async removeParticipant(
    eventId: string,
    participantId: string
  ): Promise<void> {
    await httpService.delete(
      `${this.basePath}/${eventId}/participants/${participantId}`
    );
  }

  async addOwner(eventId: string, ownerId: string): Promise<void> {
    await httpService.post(`${this.basePath}/${eventId}/owners`, {
      userId: ownerId,
    });
  }

  async removeOwner(eventId: string, ownerId: string): Promise<void> {
    await httpService.delete(`${this.basePath}/${eventId}/owners/${ownerId}`);
  }

  async inviteParticipants(
    eventId: string,
    userIds: string[],
    message?: string
  ): Promise<void> {
    await httpService.post(`${this.basePath}/${eventId}/invitations`, {
      userIds,
      message,
    });
  }

  async getEventInvitations(eventId: string): Promise<unknown[]> {
    const response = await httpService.getDirect<unknown[]>(
      `${this.basePath}/${eventId}/invites`
    );
    return response;
  }

  async updateEvent(
    eventId: string,
    dto: Partial<CreateEventDto>
  ): Promise<Event> {
    const sanitizedDto = { ...dto };
    delete (sanitizedDto as unknown as { isFree?: boolean }).isFree;
    delete (sanitizedDto as unknown as { availableSpots?: number })
      .availableSpots;
    delete (sanitizedDto as unknown as { distanceKm?: number }).distanceKm;
    delete (sanitizedDto as unknown as { isFull?: boolean }).isFull;
    delete (sanitizedDto as unknown as { canJoin?: boolean }).canJoin;
    delete (sanitizedDto as unknown as { userEventStatus?: string })
      .userEventStatus;

    const response = await httpService.patch<Event>(
      `${this.basePath}/${eventId}`,
      sanitizedDto
    );
    return response;
  }

  async deleteEvent(eventId: string): Promise<void> {
    await httpService.delete(`${this.basePath}/${eventId}`);
  }

  async getEventParticipants(
    eventId: string,
    status?: 'confirmed' | 'pending' | 'invited'
  ): Promise<Event['participants']> {
    const queryParams = status ? `?status=${status}` : '';
    const response = await httpService.get<Event['participants']>(
      `${this.basePath}/${eventId}/participants${queryParams}`
    );
    return response;
  }

  async getInvitableUsers(
    eventId: string,
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

    const url = `${this.basePath}/${eventId}/invitable-users${
      queryParams.toString() ? `?${queryParams.toString()}` : ''
    }`;

    return await httpService.getDirect(url);
  }
}

export const eventsApi = new EventsApi();
