import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { authService, RegisterData } from '@/services/auth';
import { UserData, LoginCredentials } from '@/types/auth';
import { UserSportData, httpService } from '@/services/http';
import { logger } from '@/utils/logger';

interface AuthContextData {
  user: UserData | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  userHasSports: boolean;
  userSports: UserSportData[];
  primarySport: UserSportData | null;
  signIn: (credentials: LoginCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (data: RegisterData) => Promise<void>;
  updateUser: (user: UserData) => Promise<void>;
  updateUserSports: (sports: UserSportData[]) => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const userHasSports = Boolean(
    user?.hasSports || (user?.sports && user.sports.length > 0)
  );
  const userSports = user?.sports || [];
  const primarySport = userSports.find(sport => sport.isPrimary) || null;

  const loadStoredAuth = useCallback(async () => {
    try {
      setIsLoading(true);

      const [isAuthenticated, storedUser] = await Promise.all([
        authService.isAuthenticated(),
        httpService.getUserData(),
      ]);

      if (isAuthenticated && storedUser) {
        const userWithSports: UserData = {
          ...storedUser,
          hasSports: Boolean(
            storedUser.hasSports ||
              (storedUser.sports && storedUser.sports.length > 0)
          ),
        };
        setUser(userWithSports);
      }
    } catch {
      await httpService.clearAuthData();
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStoredAuth();
  }, [loadStoredAuth]);

  const signIn = useCallback(async (credentials: LoginCredentials) => {
    try {
      const response = await authService.login(credentials);

      const userData: UserData = {
        ...response.user,
        sports: response.user.sports as unknown as UserSportData[],
        hasSports: response.user.hasSports || false,
        createdAt: response.user.createdAt || new Date().toISOString(),
        updatedAt: response.user.updatedAt || new Date().toISOString(),
      };

      setUser(userData);
    } catch {
      throw new Error('Falha no login');
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      setIsLoading(true);
      await authService.logout();
      setUser(null);
    } catch {
      await httpService.clearAuthData();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signUp = useCallback(async (data: RegisterData) => {
    try {
      logger.info('AuthContext: signUp called');
      const response = await authService.register(data);

      logger.debug('AuthContext: register completed');

      const userData: UserData = {
        ...response.user,
        sports: response.user.sports as unknown as UserSportData[],
        createdAt: response.user.createdAt || new Date().toISOString(),
        updatedAt: response.user.updatedAt || new Date().toISOString(),
      };

      logger.debug('AuthContext: Setting user data', { email: userData.email });
      setUser(userData);
      logger.info('AuthContext: signUp completed successfully');
    } catch {
      throw new Error('Falha no cadastro');
    }
  }, []);

  const updateUser = useCallback(async (updatedUser: UserData) => {
    setUser(updatedUser);
    await httpService.saveUserData(updatedUser);
  }, []);

  const updateUserSports = useCallback(
    (sports: UserSportData[]) => {
      if (user) {
        const updatedUser: UserData = {
          ...user,
          sports,
          hasSports: sports.length > 0,
          primarySportId: sports.find(s => s.isPrimary)?.sportId,
        };

        setUser(updatedUser);
        httpService.saveUserData(updatedUser).catch(error => {
          logger.error('Error saving updated user data', error);
        });
      }
    },
    [user]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        userHasSports,
        userSports,
        primarySport,
        signIn,
        signOut,
        signUp,
        updateUser,
        updateUserSports,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
