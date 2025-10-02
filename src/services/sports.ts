import { httpService } from './http';
import {
  Sport,
  UserSport,
  UpdateUserSportsRequest,
  SkillLevel,
} from '@/types/sport';

interface UserSportResponse {
  sportId: string;
  isPrimary: boolean;
  skillLevel: SkillLevel;
  yearsOfExperience?: number;
  sport: {
    id: string;
    name: string;
    icon: string;
    color: string;
  };
}

class SportsService {
  async getAllSports(): Promise<Sport[]> {
    try {
      const response = await httpService.get<Sport[]>('/sports');
      return response;
    } catch {
      throw new Error('Erro ao carregar esportes');
    }
  }

  async getUserSports(userId: string): Promise<UserSport[]> {
    try {
      const response = await httpService.get<UserSportResponse[]>(
        `/sports/users/${userId}/sports`
      );

      return response.map(userSport => ({
        sportId: userSport.sportId,
        sportName: userSport.sport.name,
        sportIcon: userSport.sport.icon,
        sportColor: userSport.sport.color,
        isPrimary: userSport.isPrimary,
        skillLevel: userSport.skillLevel,
        yearsOfExperience: userSport.yearsOfExperience,
      }));
    } catch {
      throw new Error('Erro ao carregar esportes do usuário');
    }
  }

  async updateUserSports(
    userId: string,
    data: UpdateUserSportsRequest
  ): Promise<UserSport[]> {
    try {
      const response = await httpService.post<UserSportResponse[]>(
        `/sports/users/${userId}/sports`,
        data
      );

      return response.map(userSport => ({
        sportId: userSport.sportId,
        sportName: userSport.sport.name,
        sportIcon: userSport.sport.icon,
        sportColor: userSport.sport.color,
        isPrimary: userSport.isPrimary,
        skillLevel: userSport.skillLevel,
        yearsOfExperience: userSport.yearsOfExperience,
      }));
    } catch {
      throw new Error('Erro ao atualizar esportes');
    }
  }
}

export const sportsService = new SportsService();
