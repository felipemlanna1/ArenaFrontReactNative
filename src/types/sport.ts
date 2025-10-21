export enum SkillLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
  PROFESSIONAL = 'PROFESSIONAL',
}

export interface Sport {
  id: string;
  name: string;
  icon: string;
  color: string;
  popularity?: number;
}

export interface UserSport {
  sportId: string;
  sportName: string;
  sportIcon: string;
  sportColor: string;
  isPrimary: boolean;
  skillLevel: SkillLevel;
  yearsOfExperience?: number;
}

export interface UserSportInput {
  sportId: string;
  isPrimary: boolean;
  skillLevel: SkillLevel;
  yearsOfExperience?: number;
}

export interface UpdateUserSportsRequest {
  sports: UserSportInput[];
}
