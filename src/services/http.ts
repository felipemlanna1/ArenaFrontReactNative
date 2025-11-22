import { withRetry } from '@/utils/connectivity';
import { storageService } from '@/utils/storage';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { Config } from './config';

const ACCESS_TOKEN_KEY = '@Arena:access_token';
const REFRESH_TOKEN_KEY = '@Arena:refresh_token';
const USER_DATA_KEY = '@Arena:user_data';

export interface ApiResponse<T = unknown> {
  data: T;
  message: string;
  success: boolean;
  status: string;
}

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone?: string;
  birthDate?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  bio?: string;
  profilePicture?: string;
  coverImage?: string;
  city?: string;
  state?: string;
  isProfilePrivate?: boolean;
  isActive: boolean;
  isEmailVerified: boolean;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
  avatar?: string;
  sports?: UserSportData[];
  hasSports?: boolean;
  primarySportId?: string;
  totalGroups?: number;
  totalFriends?: number;
  totalInvites?: number;
}

export interface LoginUserData {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  isActive: boolean;
  isEmailVerified: boolean;
  isProfilePrivate?: boolean;
  sports?: UserSportData[];
  hasSports?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserSportData {
  sportId: string;
  sportName: string;
  sportIcon: string;
  sportColor: string;
  isPrimary: boolean;
  skillLevel: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'PROFESSIONAL';
}

export interface AuthTokens {
  access_token: string;
  refresh_token?: string;
}

export interface ApiErrorData {
  message?: string;
  code?: string;
  errors?: Record<string, string[]>;
  [key: string]: unknown;
}

export class ApiError extends Error {
  public response?: { data?: ApiErrorData; status?: number };

  constructor(
    public status: number,
    public code: string,
    message: string,
    public data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
    this.response = {
      data: data as ApiErrorData,
      status: status,
    };
  }
}

class HttpService {
  private client: AxiosInstance;
  private isRefreshing = false;
  private refreshSubscribers: ((token: string) => void)[] = [];

  constructor() {
    this.client = axios.create({
      baseURL: Config.api.url,
      timeout: Config.api.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
      transformRequest: [
        data => {
          if (data && typeof data === 'object') {
            return JSON.stringify(data);
          }
          return data;
        },
      ],
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.client.interceptors.request.use(
      async config => {
        const token = await this.getAccessToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        if (response.config.url?.includes('/auth/me')) {
          return response;
        }
        return response;
      },
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & {
          _retry?: boolean;
        };

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          if (!this.isRefreshing) {
            this.isRefreshing = true;

            try {
              const newToken = await this.refreshAccessToken();
              this.isRefreshing = false;

              this.refreshSubscribers.forEach(callback => callback(newToken));
              this.refreshSubscribers = [];

              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
              }
              return this.client(originalRequest);
            } catch {
              this.isRefreshing = false;
              this.refreshSubscribers = [];

              await this.clearAuthData();
              throw this.handleError(error);
            }
          } else {
            return new Promise(resolve => {
              this.refreshSubscribers.push((token: string) => {
                if (originalRequest.headers) {
                  originalRequest.headers.Authorization = `Bearer ${token}`;
                }
                resolve(this.client(originalRequest));
              });
            });
          }
        }

        return Promise.reject(this.handleError(error));
      }
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return withRetry(
      async () => {
        const response = await this.client.get<ApiResponse<T>>(url, config);
        return response.data.data;
      },
      {
        maxRetries: 2,
        retryOn: [0, 408, 429, 500, 502, 503, 504],
      }
    );
  }

  async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return withRetry(
      async () => {
        const response = await this.client.post<ApiResponse<T>>(
          url,
          data,
          config
        );
        return response.data.data;
      },
      {
        maxRetries: 2,
        retryOn: [0, 408, 429, 500, 502, 503, 504],
      }
    );
  }

  async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return withRetry(
      async () => {
        const response = await this.client.put<ApiResponse<T>>(
          url,
          data,
          config
        );
        return response.data.data;
      },
      {
        maxRetries: 2,
        retryOn: [0, 408, 429, 500, 502, 503, 504],
      }
    );
  }

  async patch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return withRetry(
      async () => {
        const response = await this.client.patch<ApiResponse<T>>(
          url,
          data,
          config
        );
        return response.data.data;
      },
      {
        maxRetries: 2,
        retryOn: [0, 408, 429, 500, 502, 503, 504],
      }
    );
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return withRetry(
      async () => {
        const response = await this.client.delete<ApiResponse<T>>(url, config);
        return response.data.data;
      },
      {
        maxRetries: 2,
        retryOn: [0, 408, 429, 500, 502, 503, 504],
      }
    );
  }

  async getDirect<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return withRetry(
      async () => {
        const response = await this.client.get<T>(url, config);
        return response.data;
      },
      {
        maxRetries: 2,
        retryOn: [0, 408, 429, 500, 502, 503, 504],
      }
    );
  }

  async postMessage(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<{ message: string }> {
    const response = await this.client.post<{ message: string }>(
      url,
      data,
      config
    );
    return response.data;
  }

  async getAccessToken(): Promise<string | null> {
    try {
      const token = await storageService.getItem(ACCESS_TOKEN_KEY);
      return token;
    } catch {
      return null;
    }
  }

  async getRefreshToken(): Promise<string | null> {
    try {
      return await storageService.getItem(REFRESH_TOKEN_KEY);
    } catch {
      return null;
    }
  }

  async saveTokens(tokens: AuthTokens): Promise<void> {
    try {
      const items: [string, string][] = [
        [ACCESS_TOKEN_KEY, tokens.access_token],
      ];

      if (tokens.refresh_token) {
        items.push([REFRESH_TOKEN_KEY, tokens.refresh_token]);
      }

      await storageService.multiSet(items);
    } catch {
      throw new Error('Falha ao salvar tokens de autenticação');
    }
  }

  async saveUserData(userData: UserData): Promise<void> {
    try {
      await storageService.setItem(USER_DATA_KEY, JSON.stringify(userData));
    } catch {
      throw new Error('Falha ao salvar dados do usuário');
    }
  }

  async getUserData(): Promise<UserData | null> {
    try {
      const userData = await storageService.getItem(USER_DATA_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  }

  async clearAuthData(): Promise<void> {
    try {
      await storageService.multiRemove([
        ACCESS_TOKEN_KEY,
        REFRESH_TOKEN_KEY,
        USER_DATA_KEY,
      ]);
    } catch {
      return;
    }
  }

  async isAuthenticated(): Promise<boolean> {
    const token = await this.getAccessToken();
    return !!token;
  }

  private async refreshAccessToken(): Promise<string> {
    const refreshToken = await this.getRefreshToken();

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await axios.post<ApiResponse<AuthTokens>>(
        `${Config.api.url}/auth/refresh`,
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );

      const { access_token } = response.data.data;
      await storageService.setItem(ACCESS_TOKEN_KEY, access_token);

      return access_token;
    } catch {
      throw new Error('Token refresh failed');
    }
  }

  private handleError(error: AxiosError): ApiError {
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data as ApiErrorData;
      const message = data?.message || error.message || 'Erro na requisição';
      const code = data?.code || `HTTP_${status}`;

      return new ApiError(status, code, message, data);
    } else if (error.request) {
      return new ApiError(0, 'NETWORK_ERROR', 'Erro de conexão', null);
    } else {
      return new ApiError(0, 'REQUEST_ERROR', error.message, null);
    }
  }

  setBaseURL(url: string): void {
    this.client.defaults.baseURL = url;
  }

  setDefaultHeaders(headers: Record<string, string>): void {
    Object.assign(this.client.defaults.headers, headers);
  }
}

export const testConnection = async () => {
  try {
    await httpService.get('/');
    return true;
  } catch {
    return false;
  }
};

export const httpService = new HttpService();
