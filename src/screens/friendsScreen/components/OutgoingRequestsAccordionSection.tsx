import React from 'react';
import { AccordionSection } from '@/components/accordionSection';
import { OutgoingRequestsSection } from './FriendsSections';
import { UserData } from '@/services/http';

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
  return (
    <AccordionSection
      title="Solicitações Enviadas"
      count={requests.length}
      defaultExpanded={requests.length > 0}
      hasMore={hasMore && !isLoading}
      isLoadingMore={isLoadingMore}
      onLoadMore={onLoadMore}
      testID="outgoing-requests-accordion"
    >
      <OutgoingRequestsSection
        requests={requests}
        isLoading={isLoading}
        loadingUserId={loadingUserId}
        onNavigateToProfile={onNavigateToProfile}
        onCancelRequest={onCancelRequest}
      />
    </AccordionSection>
  );
};
