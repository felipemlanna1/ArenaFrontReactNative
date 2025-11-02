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

  approveParticipant = (...args: Parameters<EventsApi['approveParticipant']>) =>
    this.api.approveParticipant(...args);

  rejectParticipant = (...args: Parameters<EventsApi['rejectParticipant']>) =>
    this.api.rejectParticipant(...args);

  removeParticipant = (...args: Parameters<EventsApi['removeParticipant']>) =>
    this.api.removeParticipant(...args);

  addOwner = (...args: Parameters<EventsApi['addOwner']>) =>
    this.api.addOwner(...args);

  removeOwner = (...args: Parameters<EventsApi['removeOwner']>) =>
    this.api.removeOwner(...args);

  inviteParticipants = (...args: Parameters<EventsApi['inviteParticipants']>) =>
    this.api.inviteParticipants(...args);

  updateEvent = (...args: Parameters<EventsApi['updateEvent']>) =>
    this.api.updateEvent(...args);

  deleteEvent = (...args: Parameters<EventsApi['deleteEvent']>) =>
    this.api.deleteEvent(...args);

  getEventParticipants = (
    ...args: Parameters<EventsApi['getEventParticipants']>
  ) => this.api.getEventParticipants(...args);
}

export const eventsService = new EventsService();
