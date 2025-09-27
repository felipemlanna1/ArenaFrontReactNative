// Arena Welcome Screen - Tipos TypeScript

export interface WelcomeScreenProps {
  // Props vazias por enquanto - screen standalone
}

export interface WelcomeScreenState {
  isLoading: boolean;
  error: string | null;
}

export interface WelcomeScreenActions {
  handleGetStarted: () => void;
  handleReset: () => void;
}

export interface UseWelcomeScreenReturn extends WelcomeScreenState {
  actions: WelcomeScreenActions;
}
