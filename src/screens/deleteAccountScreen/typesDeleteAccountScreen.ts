import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/typesNavigation';

export type DeleteAccountScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'DeleteAccount'
>;

export type DeleteAccountStep = 'info' | 'confirm' | 'keyword';
