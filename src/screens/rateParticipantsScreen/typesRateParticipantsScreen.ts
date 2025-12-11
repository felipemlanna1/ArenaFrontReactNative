import { SkillLevel } from '@/components/ui/skillLevelRating/typesSkillLevelRating';

export interface ParticipantRating {
  userId: string;
  technical: SkillLevel | null;
  participation: number;
}

export interface RateParticipantsScreenParams {
  eventId: string;
}

export interface RatingProgress {
  rated: number;
  total: number;
}
