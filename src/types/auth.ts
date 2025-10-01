import { UserSport } from './sport';

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone?: string;
  dateOfBirth?: Date | string;
  gender?: string;
  bio?: string;
  profilePicture?: string;
  isActive: boolean;
  isEmailVerified: boolean;
  lastLoginAt?: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
  sports?: UserSport[];
  hasSports: boolean;
  primarySportId?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
  phone?: string;
  birthDate?: string;
  gender?: string;
  bio?: string;
}

export interface AuthResponse {
  user: UserData;
  access_token: string;
}
