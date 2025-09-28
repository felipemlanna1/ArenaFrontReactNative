export interface WelcomeScreenProps {
  navigation?: object;
}

export interface WelcomeScreenState {
  isLoading: boolean;
  error: string | null;
}

export interface WelcomeScreenActions {
  handleGetStarted: () => void;
  handleShowComponents: () => void;
  handleReset: () => void;
}

export interface UseWelcomeScreenReturn extends WelcomeScreenState {
  actions: WelcomeScreenActions;
}
