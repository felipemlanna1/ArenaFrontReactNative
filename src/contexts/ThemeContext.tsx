import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { themes, DEFAULT_THEME } from '@/constants/themes';
import type { ThemeName, ThemeContextData } from '@/types/theme';

const THEME_STORAGE_KEY = '@Arena:theme_preference';

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export const useTheme = (): ThemeContextData => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeName>(DEFAULT_THEME);
  const [isLoading, setIsLoading] = useState(true);

  const colors = useMemo(() => themes[theme].colors, [theme]);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (
          savedTheme &&
          (savedTheme === 'black' ||
            savedTheme === 'blueGray' ||
            savedTheme === 'light')
        ) {
          setTheme(savedTheme as ThemeName);
        }
      } catch {
        setTheme(DEFAULT_THEME);
      } finally {
        setIsLoading(false);
      }
    };

    loadTheme();
  }, []);

  const setThemeAndSave = useCallback(async (newTheme: ThemeName) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
      setTheme(newTheme);
    } catch {}
  }, []);

  const contextValue = useMemo<ThemeContextData>(
    () => ({
      theme,
      colors,
      setTheme: setThemeAndSave,
      isLoading,
    }),
    [theme, colors, setThemeAndSave, isLoading]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
