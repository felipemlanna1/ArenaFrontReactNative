export type ThemeName = 'black' | 'blueGray' | 'light';

export interface ThemeColors {
  brand: {
    primary: string;
    secondary: string;
    primaryHover: string;
    primaryPressed: string;
    primarySubtle: string;
    primarySubtleHover: string;
    primarySubtlePressed: string;
  };
  neutral: {
    darkest: string;
    darker: string;
    dark: string;
    darkIntermediate: string;
    darkSubtleBorder: string;
    medium: string;
    lighter: string;
    light: string;
    transparent: string;
    overlay: string;
    lightHover: string;
    lightPressed: string;
    lightDisabled: string;
    lightSubtleHover: string;
    lightSubtlePressed: string;
    lightFocus: string;
    darkHover: string;
    darkPressed: string;
    darkMedium: string;
    darkSubtle: string;
    lightMedium: string;
    lightSubtle15: string;
    mediumSubtle30: string;
    mediumSubtle60: string;
    mediumSubtle80: string;
  };
  text: {
    primary: string;
    secondary: string;
    inverse: string;
  };
  interaction: {
    hover: {
      primary: string;
      neutral: string;
      surface: string;
    };
    pressed: {
      primary: string;
      neutral: string;
      surface: string;
    };
    focus: {
      primary: string;
      neutral: string;
      surface: string;
    };
  };
  disabled: {
    background: string;
    text: string;
    border: string;
    surface: string;
  };
  semantic: {
    error: string;
    errorHover: string;
    errorPressed: string;
    errorSubtle: string;
    errorFocus: string;
    errorDisabled: string;
    errorSubtle20: string;
    success: string;
    successHover: string;
    successPressed: string;
    successSubtle: string;
    successFocus: string;
    successDisabled: string;
    successSubtle20: string;
    warning: string;
    warningSubtle: string;
  };
  achievement: {
    bronze: string;
    silver: string;
    gold: string;
    platinum: string;
  };
  backdrop: {
    light: string;
    medium: string;
    dark: string;
    darker: string;
    darkestOverlay: string;
  };
}

export interface Theme {
  name: ThemeName;
  displayName: string;
  colors: ThemeColors;
}

export interface ThemeContextData {
  theme: ThemeName;
  colors: ThemeColors;
  setTheme: (theme: ThemeName) => Promise<void>;
  isLoading: boolean;
}
