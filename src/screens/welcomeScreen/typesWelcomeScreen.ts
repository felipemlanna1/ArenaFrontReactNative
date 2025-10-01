export interface WelcomeScreenProps {
  navigation?: object;
}

export interface WelcomeScreenState {
  isLoading: boolean;
  error: string | null;
  isDev: boolean;
}

export interface WelcomeScreenActions {
  handleGetStarted: () => void;
  handleCreateAccount: () => void;
  handleShowComponents: () => void;
  handleReset: () => void;
}

export interface UseWelcomeScreenReturn extends WelcomeScreenState {
  actions: WelcomeScreenActions;
}
