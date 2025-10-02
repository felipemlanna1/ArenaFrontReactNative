import { UserData as HttpUserData } from '@/services/http';

export type UserData = HttpUserData;

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
