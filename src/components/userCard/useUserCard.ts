import { useMemo } from 'react';
import { UseUserCardProps, UseUserCardReturn } from './typesUserCard';

export const useUserCard = ({
  user,
  variant,
  onAccept,
  onReject,
  onCancel,
  onRemove,
  onAddFriend,
}: UseUserCardProps): UseUserCardReturn => {
  const isDeleted = useMemo(() => !!user.deletedAt, [user.deletedAt]);

  const displayName = useMemo(() => {
    if (isDeleted) {
      return 'Usuário Excluído';
    }

    const { firstName, lastName, username } = user;
    if (firstName) {
      return lastName ? `${firstName} ${lastName}` : firstName;
    }
    return username || 'Usuário';
  }, [user, isDeleted]);

  const displayLocation = useMemo(() => {
    if (isDeleted) {
      return null;
    }

    const { city, state } = user;
    if (city && state) {
      return `${city}, ${state}`;
    }
    if (state) {
      return state;
    }
    return null;
  }, [user, isDeleted]);

  const displaySports = useMemo(() => {
    if (isDeleted || !user.sports || user.sports.length === 0) {
      return [];
    }
    return user.sports.slice(0, 3).map(sport => sport.sportName);
  }, [user.sports, isDeleted]);

  const displayContext = useMemo(() => {
    if (user.totalFriends && user.totalFriends > 0) {
      const friendText =
        user.totalFriends === 1 ? 'amigo em comum' : 'amigos em comum';
      return `${user.totalFriends} ${friendText}`;
    }

    if (user.sports && user.sports.length > 0) {
      const primarySport = user.sports[0].sportName;
      return `Joga ${primarySport}`;
    }

    if (user.city && user.state) {
      return `${user.city}, ${user.state}`;
    }

    return null;
  }, [user.totalFriends, user.sports, user.city, user.state]);

  const isActiveRecently = useMemo(() => {
    if (!user.lastLoginAt) return false;

    const lastLogin = new Date(user.lastLoginAt);
    const now = new Date();
    const threeDaysInMs = 3 * 24 * 60 * 60 * 1000;
    const diffMs = now.getTime() - lastLogin.getTime();

    return diffMs < threeDaysInMs;
  }, [user.lastLoginAt]);

  const actionConfig = useMemo(() => {
    switch (variant) {
      case 'friend':
        return {
          hasActions: true,
          primaryAction: onRemove,
          primaryLabel: 'Remover',
          isPrimaryDestructive: false,
        };
      case 'request':
        return {
          hasActions: true,
          primaryAction: onAccept,
          secondaryAction: onReject,
          primaryLabel: 'Aceitar',
          secondaryLabel: 'Recusar',
          isPrimaryDestructive: false,
        };
      case 'outgoing':
        return {
          hasActions: true,
          primaryAction: onCancel,
          primaryLabel: 'Cancelar',
          isPrimaryDestructive: false,
        };
      case 'recommendation':
        return {
          hasActions: true,
          primaryAction: onAddFriend,
          primaryLabel: 'Adicionar',
          isPrimaryDestructive: false,
        };
      default:
        return {
          hasActions: false,
          primaryLabel: '',
          isPrimaryDestructive: false,
        };
    }
  }, [variant, onAccept, onReject, onCancel, onRemove, onAddFriend]);

  return {
    displayName,
    displayLocation,
    displaySports,
    displayContext,
    isActiveRecently,
    isDeleted,
    hasActions: actionConfig.hasActions,
    handlePrimaryAction: () => actionConfig.primaryAction?.(),
    handleSecondaryAction: actionConfig.secondaryAction
      ? () => actionConfig.secondaryAction?.()
      : undefined,
    primaryActionLabel: actionConfig.primaryLabel,
    secondaryActionLabel: actionConfig.secondaryLabel,
    isPrimaryDestructive: actionConfig.isPrimaryDestructive,
  };
};
