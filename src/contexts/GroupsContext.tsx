import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { Group } from '@/services/groups/typesGroups';
import { groupsApi } from '@/services/groups/groupsApi';

interface GroupsContextValue {
  myGroups: Group[];
  creatableGroups: Group[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  getGroupById: (id: string) => Group | undefined;
  isCreatableGroup: (groupId: string) => boolean;
}

const GroupsContext = createContext<GroupsContextValue | undefined>(undefined);

export const useGroups = (): GroupsContextValue => {
  const context = useContext(GroupsContext);
  if (!context) {
    throw new Error('useGroups must be used within a GroupsProvider');
  }
  return context;
};

interface GroupsProviderProps {
  children: React.ReactNode;
}

export const GroupsProvider: React.FC<GroupsProviderProps> = ({ children }) => {
  const [myGroups, setMyGroups] = useState<Group[]>([]);
  const [creatableGroups, setCreatableGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchGroups = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [myGroupsData, creatableGroupsData] = await Promise.all([
        groupsApi.getMyGroups(),
        groupsApi.getCreatableGroups(),
      ]);

      setMyGroups(myGroupsData);
      setCreatableGroups(creatableGroupsData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load groups'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  const getGroupById = useCallback(
    (id: string): Group | undefined => {
      return myGroups?.find(group => group.id === id);
    },
    [myGroups]
  );

  const isCreatableGroup = useCallback(
    (groupId: string): boolean => {
      return creatableGroups?.some(group => group.id === groupId) || false;
    },
    [creatableGroups]
  );

  const value = useMemo(
    () => ({
      myGroups,
      creatableGroups,
      isLoading,
      error,
      refetch: fetchGroups,
      getGroupById,
      isCreatableGroup,
    }),
    [
      myGroups,
      creatableGroups,
      isLoading,
      error,
      fetchGroups,
      getGroupById,
      isCreatableGroup,
    ]
  );

  return (
    <GroupsContext.Provider value={value}>{children}</GroupsContext.Provider>
  );
};
