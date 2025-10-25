import React from 'react';
import { AccordionSection } from '@/components/accordionSection';
import { FriendsSection } from './FriendsSections';
import { UserData } from '@/services/http';

interface FriendsAccordionSectionProps {
  friends: UserData[];
  isLoading: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
  loadingUserId: string | null;
  onNavigateToProfile: (userId: string) => void;
  onRemoveFriend: (userId: string) => void;
  onLoadMore: () => void;
}

export const FriendsAccordionSection: React.FC<
  FriendsAccordionSectionProps
> = ({
  friends,
  isLoading,
  isLoadingMore,
  hasMore,
  loadingUserId,
  onNavigateToProfile,
  onRemoveFriend,
  onLoadMore,
}) => {
  return (
    <AccordionSection
      title="Meus Amigos"
      count={friends.length}
      defaultExpanded={false}
      hasMore={hasMore && !isLoading}
      isLoadingMore={isLoadingMore}
      onLoadMore={onLoadMore}
      testID="friends-accordion"
    >
      <FriendsSection
        friends={friends}
        isLoading={isLoading}
        loadingUserId={loadingUserId}
        onNavigateToProfile={onNavigateToProfile}
        onRemoveFriend={onRemoveFriend}
      />
    </AccordionSection>
  );
};
