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
  const displayName = useMemo(() => {
    const { firstName, lastName, username } = user;
    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    }
    return username || 'Usuário';
  }, [user]);

  const displayLocation = useMemo(() => {
    const { city, state } = user;
    if (city && state) {
      return `${city}, ${state}`;
    }
    if (state) {
      return state;
    }
    return null;
  }, [user]);

  const displaySports = useMemo(() => {
    if (!user.sports || user.sports.length === 0) {
      return [];
    }
    return user.sports.slice(0, 3).map(sport => sport.sportName);
  }, [user.sports]);

  const actionConfig = useMemo(() => {
    switch (variant) {
      case 'friend':
        return {
          hasActions: true,
          primaryAction: onRemove,
          primaryLabel: 'Remover',
          isPrimaryDestructive: true,
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
          isPrimaryDestructive: true,
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
