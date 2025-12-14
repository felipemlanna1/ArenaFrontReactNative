import { useTheme } from '@/contexts/ThemeContext';
import type { ThemeName } from '@/types/theme';

export const useSettingsScreen = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = async (newTheme: ThemeName) => {
    await setTheme(newTheme);
  };

  return {
    theme,
    handleThemeChange,
  };
};
