import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GroupsStackParamList } from '@/screens/groupsListScreen/typesGroupsListScreen';

export type CreateGroupScreenProps = NativeStackScreenProps<
  GroupsStackParamList,
  'CreateGroup'
>;

export interface CreateGroupFormData {
  name: string;
  description: string;
  sportIds: string[];
  city: string;
  state: string;
  isPublic: boolean;
  maxMembers?: number;
  coverImage?: string;
}
