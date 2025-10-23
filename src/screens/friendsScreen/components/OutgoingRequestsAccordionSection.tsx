import React, { useState } from 'react';
// eslint-disable-next-line arena/arena-use-ui-components
import { View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { ArenaColors } from '@/constants';
import { OutgoingRequestsSection } from './FriendsSections';
import { UserData } from '@/services/http';
import { stylesFriendsAccordion } from './stylesFriendsAccordion';

interface OutgoingRequestsAccordionSectionProps {
  requests: UserData[];
  isLoading: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
  loadingUserId: string | null;
  onNavigateToProfile: (userId: string) => void;
  onCancelRequest: (userId: string) => void;
  onLoadMore: () => void;
}

export const OutgoingRequestsAccordionSection: React.FC<
  OutgoingRequestsAccordionSectionProps
> = ({
  requests,
  isLoading,
  isLoadingMore,
  hasMore,
  loadingUserId,
  onNavigateToProfile,
  onCancelRequest,
  onLoadMore,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(prev => !prev);
  };

  const chevronRotation = isExpanded ? '180deg' : '0deg';

  return (
    <View style={stylesFriendsAccordion.container}>
      <Pressable
        onPress={handleToggle}
        style={({ pressed }) => [
          stylesFriendsAccordion.header,
          pressed && stylesFriendsAccordion.headerPressed,
        ]}
        accessibilityRole="button"
        accessibilityLabel={`Solicitados (${requests.length})`}
        accessibilityState={{ expanded: isExpanded }}
        accessibilityHint={
          isExpanded ? 'Duplo toque para recolher' : 'Duplo toque para expandir'
        }
      >
        <View style={stylesFriendsAccordion.headerContent}>
          <View style={stylesFriendsAccordion.titleContainer}>
            <Text variant="bodyPrimary" style={stylesFriendsAccordion.title}>
              Solicitados ({requests.length})
            </Text>
          </View>
        </View>
        <View
          style={[
            stylesFriendsAccordion.chevronContainer,
            { transform: [{ rotate: chevronRotation }] },
          ]}
        >
          <Ionicons
            name="chevron-down"
            size={20}
            color={ArenaColors.text.inverse}
          />
        </View>
      </Pressable>

      {isExpanded && (
        <View style={stylesFriendsAccordion.content}>
          <OutgoingRequestsSection
            requests={requests}
            isLoading={isLoading}
            loadingUserId={loadingUserId}
            onNavigateToProfile={onNavigateToProfile}
            onCancelRequest={onCancelRequest}
          />
          {hasMore && !isLoading && (
            <View style={stylesFriendsAccordion.loadMoreContainer}>
              <Button
                variant="secondary"
                onPress={onLoadMore}
                disabled={isLoadingMore}
                size="md"
              >
                {isLoadingMore ? 'Carregando...' : 'Ver mais'}
              </Button>
            </View>
          )}
        </View>
      )}
    </View>
  );
};
