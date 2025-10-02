import { httpService } from '../http';
import { EventsFilter, EventsResponse, Event } from './typesEvents';

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

    const response = await httpService.get<EventsResponse>(this.basePath, {
      params,
    });
    return response;
  }

  async getEventDetails(eventId: string): Promise<Event> {
    const response = await httpService.get<Event>(
      `${this.basePath}/${eventId}`
    );
    return response;
  }
}
