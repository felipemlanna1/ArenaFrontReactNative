import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/typesNavigation';

export type VerifyCodeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'VerifyCode'
>;

export type VerifyCodeScreenRouteProp = RouteProp<
  RootStackParamList,
  'VerifyCode'
>;

export interface VerifyCodeScreenProps {
  navigation: VerifyCodeScreenNavigationProp;
  route: VerifyCodeScreenRouteProp;
}

export interface VerifyCodeFormData {
  code: string;
}

export interface VerifyCodeErrors {
  code?: string;
  general?: string;
}

export interface TimerState {
  timeLeft: number;
  formattedTime: string;
  isExpired: boolean;
}

export interface UseVerifyCodeScreenReturn {
  email: string;
  formData: VerifyCodeFormData;
  errors: VerifyCodeErrors;
  isLoading: boolean;
  isResending: boolean;
  canResend: boolean;
  timer: TimerState;
  handleCodeChange: (code: string) => void;
  handleVerify: () => Promise<void>;
  handleResend: () => Promise<void>;
  handleBack: () => void;
}
