import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/typesNavigation';
import { SkillLevel } from '@/types/sport';

export type OnboardingSportsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'OnboardingSports'
>;

export interface OnboardingSportsScreenProps {
  navigation: OnboardingSportsNavigationProp;
}

export interface SportSelection {
  sportId: string;
  sportName: string;
  level: SkillLevel;
  isPrimary?: boolean;
}
