import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { groupsApi } from '@/services/groups/groupsApi';
import { Group, GroupMember } from '@/services/groups/typesGroups';
import { useGroups } from '@/contexts/GroupsContext';

export const useGroupDetailsScreen = (groupId: string) => {
  const { refetch: refetchGroupsContext } = useGroups();
  const [group, setGroup] = useState<Group | null>(null);
  const [members, setMembers] = useState<GroupMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [currentActionMemberId, setCurrentActionMemberId] = useState<
    string | null
  >(null);
  const [showLeaveConfirmation, setShowLeaveConfirmation] = useState(false);
  const [showRemoveConfirmation, setShowRemoveConfirmation] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState<string | null>(null);

  const fetchGroupDetails = useCallback(async () => {
    try {
      const [groupData, membersData] = await Promise.all([
        groupsApi.getGroupById(groupId),
        groupsApi.getMembers(groupId),
      ]);
      setGroup(groupData);
      setMembers(membersData);
    } finally {
      setIsLoading(false);
    }
  }, [groupId]);

  useFocusEffect(
    useCallback(() => {
      fetchGroupDetails();
    }, [fetchGroupDetails])
  );

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await fetchGroupDetails();
    } finally {
      setIsRefreshing(false);
    }
  }, [fetchGroupDetails]);

  const handleJoinGroup = useCallback(async () => {
    setActionLoading(true);
    try {
      await groupsApi.requestJoin(groupId);
      await Promise.all([refetchGroupsContext(), fetchGroupDetails()]);
    } catch {
      await Promise.all([refetchGroupsContext(), fetchGroupDetails()]);
    } finally {
      setActionLoading(false);
    }
  }, [groupId, refetchGroupsContext, fetchGroupDetails]);

  const handleLeaveGroup = useCallback(() => {
    setShowLeaveConfirmation(true);
  }, []);

  const confirmLeaveGroup = useCallback(async () => {
    setActionLoading(true);
    try {
      await groupsApi.leaveGroup(groupId);
      await Promise.all([refetchGroupsContext(), fetchGroupDetails()]);
      setShowLeaveConfirmation(false);
    } catch {
      await Promise.all([refetchGroupsContext(), fetchGroupDetails()]);
      setShowLeaveConfirmation(false);
    } finally {
      setActionLoading(false);
    }
  }, [groupId, refetchGroupsContext, fetchGroupDetails]);

  const handleRemoveMember = useCallback((memberId: string) => {
    setMemberToRemove(memberId);
    setShowRemoveConfirmation(true);
  }, []);

  const confirmRemoveMember = useCallback(async () => {
    if (!memberToRemove) return;

    setActionLoading(true);
    setCurrentActionMemberId(memberToRemove);
    try {
      const { group: updatedGroup, members: updatedMembers } =
        await groupsApi.removeMember(groupId, memberToRemove);
      setGroup(updatedGroup);
      setMembers(updatedMembers);
      setShowRemoveConfirmation(false);
      setMemberToRemove(null);
    } finally {
      setActionLoading(false);
      setCurrentActionMemberId(null);
    }
  }, [groupId, memberToRemove]);

  return {
    group,
    members,
    isLoading,
    isRefreshing,
    actionLoading,
    currentActionMemberId,
    handleRefresh,
    handleJoinGroup,
    handleLeaveGroup,
    confirmLeaveGroup,
    handleRemoveMember,
    confirmRemoveMember,
    showLeaveConfirmation,
    setShowLeaveConfirmation,
    showRemoveConfirmation,
    setShowRemoveConfirmation,
  };
};
