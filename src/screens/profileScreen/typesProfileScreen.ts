export interface ProfileScreenProps {
  testID?: string;
}

export interface UseProfileScreenReturn {
  isLoading: boolean;
  handleLogout: () => void;
}
