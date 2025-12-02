export interface UserRatingAggregate {
  id: string;
  userId: string;
  overallAverageRating: number;
  totalRatingsReceived: number;
  technicalSkillAverage: number;
  participationAverage: number;
  ratingsBySport?: Record<
    string,
    { sportName: string; average: number; count: number }
  >;
  lastCalculatedAt: string;
}

export interface CreateBatchFeedbackDto {
  eventId: string;
  feedbacks: {
    evaluatedUserId: string;
    technicalSkillRating: number;
    participationRating: number;
  }[];
}

export interface ParticipantToRate {
  id: string;
  userId: string;
  name: string;
  avatar?: string;
  rating?: number;
}

export interface ReceivedFeedback {
  id: string;
  eventId: string;
  evaluatorId: string;
  evaluatedId: string;
  technicalSkillRating: number;
  participationRating: number;
  createdAt: string;
  evaluator?: {
    id: string;
    firstName: string;
    lastName: string;
    profilePicture?: string;
  };
  event?: {
    id: string;
    title: string;
    sportName?: string;
  };
}
