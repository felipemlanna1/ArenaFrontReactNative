import React, { useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { Badge } from '@/components/ui/badge';
import { OptimizedImage } from '@/components/ui/optimizedImage';
import { ArenaColors } from '@/constants';
import { GroupMemberItemProps } from './typesGroupMemberItem';
import { styles } from './stylesGroupMemberItem';

export const GroupMemberItem: React.FC<GroupMemberItemProps> = ({
  member,
  onPress,
  onRoleChange,
  onRemove,
  showActions = false,
  isActionLoading = false,
  currentActionMemberId,
  currentUserRole,
  testID = 'group-member-item',
}) => {
  const memberId = member.user?.id || member.userId;
  const memberName = member.user
    ? `${member.user.firstName} ${member.user.lastName}`.trim()
    : member.username || 'Usuário';
  const memberAvatar = member.user?.profilePicture || member.avatarUrl;
  const memberBio = member.user?.bio;

  const isLoading = isActionLoading && currentActionMemberId === memberId;
  const canManage =
    currentUserRole &&
    ['OWNER', 'ADMIN'].includes(currentUserRole) &&
    member.role !== 'OWNER';

  const handlePress = useCallback(() => {
    if (onPress && memberId) {
      onPress(memberId);
    }
  }, [onPress, memberId]);

  const handleRemove = useCallback(async () => {
    if (onRemove && !isLoading && memberId) {
      await onRemove(memberId);
    }
  }, [onRemove, memberId, isLoading]);

  const getRoleBadgeVariant = (
    role: string
  ): 'default' | 'primary' | 'success' | 'error' | 'outlined' => {
    switch (role) {
      case 'OWNER':
        return 'primary';
      case 'ADMIN':
        return 'success';
      case 'MODERATOR':
        return 'outlined';
      default:
        return 'default';
    }
  };

  return (
    <View style={styles.container} testID={testID}>
      <TouchableOpacity onPress={handlePress} disabled={!onPress}>
        {memberAvatar ? (
          <OptimizedImage
            source={{ uri: memberAvatar }}
            style={styles.avatar}
            contentFit="cover"
            priority="normal"
          />
        ) : (
          <View style={styles.avatar}>
            <Ionicons
              name="person"
              size={24}
              color={ArenaColors.neutral.medium}
            />
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text variant="bodyBold">{memberName}</Text>
          {member.role && (
            <Badge variant={getRoleBadgeVariant(member.role)} size="sm">
              {member.role}
            </Badge>
          )}
        </View>

        {memberBio && (
          <Text variant="captionMuted" numberOfLines={1}>
            {memberBio}
          </Text>
        )}

        <View style={styles.metadata}>
          <Text variant="captionMuted">
            Membro desde {new Date(member.joinedAt).toLocaleDateString('pt-BR')}
          </Text>
        </View>
      </View>

      {showActions && canManage && (
        <View style={styles.actionsContainer}>
          {onRemove && (
            <TouchableOpacity
              onPress={handleRemove}
              disabled={isLoading}
              style={styles.iconButton}
              testID={`${testID}-remove`}
            >
              <Ionicons
                name="close-circle"
                size={24}
                color={
                  isLoading
                    ? ArenaColors.neutral.medium
                    : ArenaColors.semantic.error
                }
              />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};
