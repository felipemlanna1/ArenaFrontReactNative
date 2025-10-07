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

  joinEvent = (...args: Parameters<EventsApi['joinEvent']>) =>
    this.api.joinEvent(...args);

  requestJoin = (...args: Parameters<EventsApi['requestJoin']>) =>
    this.api.requestJoin(...args);

  leaveEvent = (...args: Parameters<EventsApi['leaveEvent']>) =>
    this.api.leaveEvent(...args);

  cancelRequest = (...args: Parameters<EventsApi['cancelRequest']>) =>
    this.api.cancelRequest(...args);

  acceptInvitation = (...args: Parameters<EventsApi['acceptInvitation']>) =>
    this.api.acceptInvitation(...args);

  rejectInvitation = (...args: Parameters<EventsApi['rejectInvitation']>) =>
    this.api.rejectInvitation(...args);

  createEvent = (...args: Parameters<EventsApi['createEvent']>) =>
    this.api.createEvent(...args);
}

export const eventsService = new EventsService();
