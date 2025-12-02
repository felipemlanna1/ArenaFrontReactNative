export interface ParticipantRating {
  userId: string;
  technical: number;
  participation: number;
}

export interface RateParticipantsScreenParams {
  eventId: string;
}

export interface RatingProgress {
  rated: number;
  total: number;
}
