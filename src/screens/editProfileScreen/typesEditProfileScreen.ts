import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/typesNavigation';
import { SkillLevel } from '@/types/sport';

export type EditProfileScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'EditProfile'
>;

export interface EditProfileFormData {
  firstName: string;
  lastName: string;
  bio: string;
  birthDate: Date | null;
  gender: 'male' | 'female' | 'other' | null;
  profilePicture?: string | null;
  coverPhoto?: string | null;
  selectedSports: string[];
  sportLevels: { [sportId: string]: SkillLevel };
  primarySportId: string | null;
}

export interface EditProfileFormErrors {
  firstName?: string;
  lastName?: string;
  bio?: string;
  birthDate?: string;
  gender?: string;
  profilePicture?: string;
  coverPhoto?: string;
}

export interface ImagePickerResult {
  uri: string;
  type: 'image' | 'video';
  width: number;
  height: number;
}
