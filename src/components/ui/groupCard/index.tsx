import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { OptimizedImage } from '@/components/ui/optimizedImage';
import { ArenaColors } from '@/constants';
import { GroupCardProps } from './typesGroupCard';
import { useGroupCard } from './useGroupCard';
import { styles } from './stylesGroupCard';

export const GroupCard: React.FC<GroupCardProps> = ({
  group,
  onPress,
  onJoinPress,
  onLeavePress,
  isActionLoading = false,
  currentActionGroupId,
  showActions = false,
  variant = 'default',
  testID = 'group-card',
}) => {
  const isLoading = isActionLoading && currentActionGroupId === group.id;

  const {
    isMember,
    handleCardPress,
    handleJoinPress,
    handleLeavePress,
    getRoleBadgeVariant,
  } = useGroupCard({
    groupId: group.id,
    currentUserStatus: group.currentUserStatus,
    onPress,
    onJoinPress,
    onLeavePress,
  });

  if (variant === 'compact') {
    return (
      <TouchableOpacity
        style={[styles.card, styles.compactCard]}
        onPress={handleCardPress}
        testID={testID}
      >
        {group.avatar ? (
          <OptimizedImage
            source={{ uri: group.avatar }}
            style={styles.compactAvatar}
            contentFit="cover"
            priority="normal"
          />
        ) : (
          <View style={styles.compactAvatar}>
            <Ionicons
              name="people"
              size={24}
              color={ArenaColors.neutral.medium}
            />
          </View>
        )}
        <View style={styles.compactContent}>
          <View style={styles.compactHeader}>
            <Text variant="bodyBold" numberOfLines={1}>
              {group.name}
            </Text>
          </View>
          {(group.sports && group.sports.length > 0) || group.city ? (
            <View style={styles.compactMetadata}>
              {group.sports && group.sports.length > 0 && (
                <View style={styles.metadataChip}>
                  <Ionicons
                    name="football-outline"
                    size={12}
                    color={ArenaColors.neutral.medium}
                  />
                  <Text variant="captionMuted" numberOfLines={1}>
                    {group.sports[0].name}
                  </Text>
                </View>
              )}
              {group.city && (
                <View style={styles.metadataChip}>
                  <Ionicons
                    name="location-outline"
                    size={12}
                    color={ArenaColors.neutral.medium}
                  />
                  <Text variant="captionMuted" numberOfLines={1}>
                    {group.city}
                  </Text>
                </View>
              )}
            </View>
          ) : null}
          <View style={styles.compactFooter}>
            <View style={styles.metadataItem}>
              <Ionicons
                name="people"
                size={14}
                color={ArenaColors.neutral.medium}
              />
              <Text variant="captionMuted">
                {group.memberCount}{' '}
                {group.memberCount === 1 ? 'membro' : 'membros'}
              </Text>
            </View>
            {group.currentUserRole && (
              <Badge
                variant={getRoleBadgeVariant(group.currentUserRole)}
                size="sm"
              >
                {group.currentUserRole}
              </Badge>
            )}
          </View>
        </View>
        <Ionicons
          name="chevron-forward"
          size={20}
          color={ArenaColors.neutral.medium}
        />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handleCardPress}
      testID={testID}
    >
      {group.coverImage && (
        <OptimizedImage
          source={{ uri: group.coverImage }}
          style={styles.coverImage}
          contentFit="cover"
          priority="normal"
        />
      )}

      <View style={styles.content}>
        <View style={styles.header}>
          <Text variant="titlePrimary">{group.name}</Text>
          {group.currentUserRole && (
            <View style={styles.roleContainer}>
              <Badge
                variant={getRoleBadgeVariant(group.currentUserRole)}
                size="sm"
              >
                {group.currentUserRole}
              </Badge>
            </View>
          )}
        </View>

        {group.description && (
          <Text
            variant="bodySecondary"
            numberOfLines={2}
            style={styles.description}
          >
            {group.description}
          </Text>
        )}

        {group.sports && group.sports.length > 0 && (
          <View style={styles.sportsContainer}>
            {group.sports.slice(0, 3).map(sport => (
              <Badge key={sport.id} variant="default" size="sm">
                {sport.name}
              </Badge>
            ))}
            {group.sports.length > 3 && (
              <Badge variant="default" size="sm">
                {`+${group.sports.length - 3}`}
              </Badge>
            )}
          </View>
        )}

        <View style={styles.footer}>
          <View style={styles.metadata}>
            <View style={styles.metadataItem}>
              <Ionicons
                name="people"
                size={16}
                color={ArenaColors.neutral.medium}
              />
              <Text variant="captionMuted">
                {group.memberCount}{' '}
                {group.memberCount === 1 ? 'membro' : 'membros'}
              </Text>
            </View>
          </View>
        </View>

        {showActions && (
          <View style={styles.actions}>
            {isMember ? (
              <View style={styles.actionButton}>
                <Button
                  variant="destructive"
                  size="sm"
                  onPress={handleLeavePress}
                  loading={isLoading}
                  fullWidth
                >
                  Sair do grupo
                </Button>
              </View>
            ) : (
              <View style={styles.actionButton}>
                <Button
                  variant="primary"
                  size="sm"
                  onPress={handleJoinPress}
                  loading={isLoading}
                  fullWidth
                >
                  Solicitar entrada
                </Button>
              </View>
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
