import { httpService } from '../http';
import { EventsFilter, EventsResponse, Event } from './typesEvents';
import { CreateEventDto } from '@/screens/createEventScreen/typesCreateEventScreen';

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
    await httpService.post(`${this.basePath}/${eventId}/request`, {});
  }

  async leaveEvent(eventId: string): Promise<void> {
    await httpService.delete(`${this.basePath}/${eventId}/leave`);
  }

  async cancelRequest(eventId: string): Promise<void> {
    await httpService.delete(`${this.basePath}/${eventId}/request`);
  }

  async acceptInvitation(eventId: string, invitationId: string): Promise<void> {
    await httpService.post(
      `${this.basePath}/${eventId}/invitations/${invitationId}/accept`,
      {}
    );
  }

  async rejectInvitation(eventId: string, invitationId: string): Promise<void> {
    await httpService.delete(
      `${this.basePath}/${eventId}/invitations/${invitationId}/reject`
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

  async sendInvitations(
    eventId: string,
    userIds: string[],
    message?: string
  ): Promise<void> {
    await httpService.post(`${this.basePath}/${eventId}/send-invitations`, {
      userIds,
      message,
    });
  }

  async updateEvent(
    eventId: string,
    dto: Partial<CreateEventDto>
  ): Promise<Event> {
    const response = await httpService.patch<Event>(
      `${this.basePath}/${eventId}`,
      dto
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
}
