import { httpService } from '../http';
import { Event } from '../events/typesEvents';
import {
  UserRatingAggregate,
  CreateBatchFeedbackDto,
  ReceivedFeedback,
} from './typesFeedback';

export const feedbackApi = {
  async createBatch(dto: CreateBatchFeedbackDto): Promise<void> {
    await httpService.post('/feedback/batch', dto);
  },

  async markEventAsCompleted(eventId: string): Promise<void> {
    await httpService.post('/feedback/mark-event-as-completed', { eventId });
  },

  async getPendingEvents(): Promise<Event[]> {
    const response = await httpService.get<Event[]>('/feedback/pending-events');
    if (!response || !Array.isArray(response)) {
      console.warn('[feedbackApi] getPendingEvents: Invalid response, returning []');
      return [];
    }
    return response;
  },

  async getUserAggregate(userId: string): Promise<UserRatingAggregate | null> {
    const response = await httpService.get<UserRatingAggregate | null>(
      `/feedback/user/${userId}/aggregate`
    );
    return response;
  },

  async getGivenFeedbacks(eventId: string): Promise<string[]> {
    console.log(
      `[feedbackApi] getGivenFeedbacks chamado para eventId: ${eventId}`
    );

    const response = await httpService.get<{ evaluatedId: string }[]>(
      `/feedback/event/${eventId}/given-feedbacks`
    );

    console.log(`[feedbackApi] Resposta recebida do httpService:`, response);
    console.log(
      `[feedbackApi] Tipo da resposta:`,
      Array.isArray(response) ? 'Array' : typeof response
    );
    console.log(`[feedbackApi] response === null:`, response === null);
    console.log(`[feedbackApi] response === undefined:`, response === undefined);

    if (!response) {
      console.warn(`[feedbackApi] Resposta é null ou undefined! Retornando []`);
      return [];
    }

    if (!Array.isArray(response)) {
      console.error(
        `[feedbackApi] Resposta não é um array! Tipo:`,
        typeof response
      );
      return [];
    }

    const evaluatedIds = response.map(f => f.evaluatedId);
    console.log(`[feedbackApi] IDs extraídos:`, evaluatedIds);

    return evaluatedIds;
  },

  async getParticipantsToRate(eventId: string): Promise<{
    participants: Array<{
      id: string;
      userId: string;
      name: string;
      avatar?: string;
    }>;
    totalCount: number;
  }> {
    const response = await httpService.get<{
      participants: Array<{
        id: string;
        userId: string;
        name: string;
        avatar?: string;
      }>;
      totalCount: number;
    }>(`/feedback/event/${eventId}/participants-to-rate`);
    return response;
  },

  async getReceivedFeedbacks(limit = 20): Promise<ReceivedFeedback[]> {
    const response = await httpService.get<ReceivedFeedback[]>(
      `/feedback/received?limit=${limit}`
    );
    return response;
  },
};
