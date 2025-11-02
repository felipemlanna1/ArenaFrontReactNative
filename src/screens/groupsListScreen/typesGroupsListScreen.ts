import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootStackParamList, TabParamList } from '@/navigation/typesNavigation';

import { Group } from '@/services/groups/typesGroups';

export type GroupsStackParamList = {
  GroupsList: undefined;
  GroupDetails: { groupId: string };
  CreateGroup:
    | {
        mode?: 'create' | 'edit';
        groupId?: string;
        groupData?: Group;
      }
    | undefined;
};

export type GroupsListScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<GroupsStackParamList, 'GroupsList'>,
  CompositeNavigationProp<
    BottomTabNavigationProp<TabParamList>,
    NativeStackNavigationProp<RootStackParamList>
  >
>;

export interface GroupsListScreenProps {
  navigation: GroupsListScreenNavigationProp;
}
