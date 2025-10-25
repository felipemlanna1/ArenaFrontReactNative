import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GroupsStackParamList } from '@/screens/groupsListScreen/typesGroupsListScreen';

export type GroupDetailsScreenProps = NativeStackScreenProps<
  GroupsStackParamList,
  'GroupDetails'
>;
