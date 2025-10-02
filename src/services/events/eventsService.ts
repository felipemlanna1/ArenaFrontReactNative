import { EventsApi } from './eventsApi';

class EventsService {
  private readonly api: EventsApi;

  constructor() {
    this.api = new EventsApi();
  }

  getFeedEvents = (...args: Parameters<EventsApi['getFeedEvents']>) =>
    this.api.getFeedEvents(...args);

  getEventDetails = (...args: Parameters<EventsApi['getEventDetails']>) =>
    this.api.getEventDetails(...args);
}

export const eventsService = new EventsService();
