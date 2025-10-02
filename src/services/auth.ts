import {
  httpService,
  AuthTokens,
  LoginUserData,
  ApiError,
  UserData,
} from './http';

export { ApiError } from './http';

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
  confirmPassword: string;
}

export interface AuthResponse {
  user: LoginUserData;
  tokens: AuthTokens;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
  confirmPassword: string;
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await httpService.post<AuthResponse>('/auth/login', {
        email: credentials.email,
        password: credentials.password,
      });

      if (response.tokens) {
        await httpService.saveTokens(response.tokens);
      }

      if (response.user) {
        const userData = {
          ...response.user,
          createdAt: response.user.createdAt || new Date().toISOString(),
          updatedAt: response.user.updatedAt || new Date().toISOString(),
        } as UserData;
        await httpService.saveUserData(userData);
      }

      return response;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'LOGIN_ERROR', 'Erro interno no login');
    }
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await httpService.post<AuthResponse>(
        '/auth/register',
        data
      );

      if (response.tokens) {
        await httpService.saveTokens(response.tokens);
      }

      if (response.user) {
        const userData = {
          ...response.user,
          createdAt: response.user.createdAt || new Date().toISOString(),
          updatedAt: response.user.updatedAt || new Date().toISOString(),
        } as UserData;
        await httpService.saveUserData(userData);
      }

      return response;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'REGISTER_ERROR', 'Erro interno no registro');
    }
  }

  async logout(): Promise<void> {
    try {
      const token = await httpService.getAccessToken();

      if (token) {
        try {
          await httpService.post('/auth/logout');
        } catch {
          return;
        }
      }

      await httpService.clearAuthData();
    } catch {
      await httpService.clearAuthData();
    }
  }

  async forgotPassword(data: ForgotPasswordData): Promise<{ message: string }> {
    try {
      return await httpService.postMessage('/auth/forgot-password', data);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        500,
        'FORGOT_PASSWORD_ERROR',
        'Erro ao solicitar redefinição de senha'
      );
    }
  }

  async resetPassword(data: ResetPasswordData): Promise<{ message: string }> {
    try {
      return await httpService.postMessage('/auth/reset-password', data);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        500,
        'RESET_PASSWORD_ERROR',
        'Erro ao redefinir senha'
      );
    }
  }

  async getCurrentUser(): Promise<LoginUserData | null> {
    try {
      const isAuth = await httpService.isAuthenticated();
      if (!isAuth) {
        return null;
      }

      const savedUserData = await httpService.getUserData();
      if (savedUserData) {
        return savedUserData as LoginUserData;
      }

      const response = await httpService.get<LoginUserData>('/auth/me');
      const userDataForStorage = {
        ...response,
        createdAt: response.createdAt || new Date().toISOString(),
        updatedAt: response.updatedAt || new Date().toISOString(),
      } as UserData;
      await httpService.saveUserData(userDataForStorage);

      return response;
    } catch (error: unknown) {
      if (error instanceof ApiError && error.status === 401) {
        await httpService.clearAuthData();
      }
      return null;
    }
  }

  async refreshToken(): Promise<string | null> {
    try {
      const newToken = await httpService.getAccessToken();
      return newToken;
    } catch {
      await httpService.clearAuthData();
      return null;
    }
  }

  async isAuthenticated(): Promise<boolean> {
    return await httpService.isAuthenticated();
  }

  async verifyEmail(token: string): Promise<{ message: string }> {
    try {
      return await httpService.postMessage('/auth/verify-email', { token });
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        500,
        'EMAIL_VERIFICATION_ERROR',
        'Erro ao verificar email'
      );
    }
  }

  async resendVerificationEmail(email: string): Promise<{ message: string }> {
    try {
      return await httpService.postMessage('/auth/resend-verification', {
        email,
      });
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        500,
        'RESEND_VERIFICATION_ERROR',
        'Erro ao reenviar email de verificação'
      );
    }
  }
}

export const authService = new AuthService();
