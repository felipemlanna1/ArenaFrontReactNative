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
  updateUserSports: (sports: UserSportData[], skipOnboarding?: boolean) => void;
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

      const isAuthenticated = await authService.isAuthenticated();

      if (isAuthenticated) {
        const fullUserData = await httpService.get<UserData>('/auth/me');

        if (fullUserData) {
          const userData: UserData = {
            ...fullUserData,
            sports: fullUserData.sports as unknown as UserSportData[],
            hasSports: Boolean(
              fullUserData.hasSports ||
                (fullUserData.sports && fullUserData.sports.length > 0)
            ),
            createdAt: fullUserData.createdAt || new Date().toISOString(),
            updatedAt: fullUserData.updatedAt || new Date().toISOString(),
          };
          setUser(userData);
          await httpService.saveUserData(userData);
        }
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
    await authService.login(credentials);

    const fullUserData = await httpService.get<UserData>('/auth/me');

    const userData: UserData = {
      ...fullUserData,
      sports: fullUserData.sports as unknown as UserSportData[],
      hasSports: fullUserData.hasSports || false,
      createdAt: fullUserData.createdAt || new Date().toISOString(),
      updatedAt: fullUserData.updatedAt || new Date().toISOString(),
    };

    setUser(userData);
    await httpService.saveUserData(userData);
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
    await authService.register(data);

    const fullUserData = await httpService.get<UserData>('/auth/me');

    const userData: UserData = {
      ...fullUserData,
      sports: fullUserData.sports as unknown as UserSportData[],
      hasSports: fullUserData.hasSports || false,
      createdAt: fullUserData.createdAt || new Date().toISOString(),
      updatedAt: fullUserData.updatedAt || new Date().toISOString(),
    };

    setUser(userData);
    await httpService.saveUserData(userData);
  }, []);

  const updateUser = useCallback(async (updatedUser: UserData) => {
    setUser(updatedUser);
    await httpService.saveUserData(updatedUser);
  }, []);

  const updateUserSports = useCallback(
    (sports: UserSportData[], skipOnboarding = false) => {
      if (user) {
        const updatedUser: UserData = {
          ...user,
          sports,
          hasSports: skipOnboarding || sports.length > 0,
          primarySportId: sports.find(s => s.isPrimary)?.sportId,
        };

        setUser(updatedUser);
        httpService.saveUserData(updatedUser).catch(() => {});
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
