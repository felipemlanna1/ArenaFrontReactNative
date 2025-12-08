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
    const response = await httpService.get<{ evaluatedId: string }[]>(
      `/feedback/event/${eventId}/given-feedbacks`
    );

    if (!response) {
      return [];
    }

    if (!Array.isArray(response)) {
      return [];
    }

    const evaluatedIds = response.map(f => f.evaluatedId);

    return evaluatedIds;
  },

  async getParticipantsToRate(eventId: string): Promise<{
    participants: {
      id: string;
      userId: string;
      name: string;
      avatar?: string;
    }[];
    totalCount: number;
  }> {
    const response = await httpService.get<{
      participants: {
        id: string;
        userId: string;
        name: string;
        avatar?: string;
      }[];
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
