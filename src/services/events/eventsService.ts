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

  // Métodos de Gestão de Participantes
  approveParticipant = (...args: Parameters<EventsApi['approveParticipant']>) =>
    this.api.approveParticipant(...args);

  rejectParticipant = (...args: Parameters<EventsApi['rejectParticipant']>) =>
    this.api.rejectParticipant(...args);

  removeParticipant = (...args: Parameters<EventsApi['removeParticipant']>) =>
    this.api.removeParticipant(...args);

  // Métodos de Gestão de Owners
  addOwner = (...args: Parameters<EventsApi['addOwner']>) =>
    this.api.addOwner(...args);

  removeOwner = (...args: Parameters<EventsApi['removeOwner']>) =>
    this.api.removeOwner(...args);

  // Método para enviar convites
  sendInvitations = (...args: Parameters<EventsApi['sendInvitations']>) =>
    this.api.sendInvitations(...args);

  // Método para atualizar evento
  updateEvent = (...args: Parameters<EventsApi['updateEvent']>) =>
    this.api.updateEvent(...args);

  // Método para deletar evento
  deleteEvent = (...args: Parameters<EventsApi['deleteEvent']>) =>
    this.api.deleteEvent(...args);

  // Método para buscar participantes com status
  getEventParticipants = (...args: Parameters<EventsApi['getEventParticipants']>) =>
    this.api.getEventParticipants(...args);
}

export const eventsService = new EventsService();
