import { httpService, UserData } from '../http';

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  phone?: string;
  birthDate?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  bio?: string;
  profilePicture?: string;
}

export interface UserProfileResponseDto extends UserData {
  sports?: {
    sportId: string;
    sportName: string;
    sportIcon: string;
    sportColor: string;
    isPrimary: boolean;
    skillLevel: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'PROFESSIONAL';
  }[];
}

export interface UserStatsResponseDto {
  totalEvents: number;
  confirmedEvents: number;
  attendedEvents: number;
  attendanceRate: number;
  totalGroups: number;
  totalFriends: number;
  totalSports: number;
  createdEvents: number;
}

class UsersApi {
  private basePath = '/users';

  async getUserProfile(userId: string): Promise<UserProfileResponseDto> {
    const response = await httpService.get<UserProfileResponseDto>(
      `${this.basePath}/${userId}`
    );
    return response;
  }

  async updateUserProfile(
    userId: string,
    dto: UpdateUserDto
  ): Promise<UserData> {
    const response = await httpService.patch<UserData>(
      `${this.basePath}/${userId}`,
      dto
    );
    return response;
  }

  async uploadAvatar(userId: string, file: File | Blob): Promise<UserData> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await httpService.post<UserData>(
      `${this.basePath}/${userId}/upload-avatar`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response;
  }

  async getUserStats(userId: string): Promise<UserStatsResponseDto> {
    const response = await httpService.get<UserStatsResponseDto>(
      `${this.basePath}/${userId}/stats`
    );
    return response;
  }
}

export const usersApi = new UsersApi();
