import React from 'react';
import { AccordionSection } from '@/components/accordionSection';
import { RequestsSection } from './FriendsSections';
import { UserData } from '@/services/http';

interface IncomingRequestsAccordionSectionProps {
  requests: UserData[];
  isLoading: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
  loadingUserId: string | null;
  onAcceptRequest: (userId: string) => void;
  onRejectRequest: (userId: string) => void;
  onLoadMore: () => void;
}

export const IncomingRequestsAccordionSection: React.FC<
  IncomingRequestsAccordionSectionProps
> = ({
  requests,
  isLoading,
  isLoadingMore,
  hasMore,
  loadingUserId,
  onAcceptRequest,
  onRejectRequest,
  onLoadMore,
}) => {
  return (
    <AccordionSection
      title="Solicitações Recebidas"
      count={requests.length}
      defaultExpanded={false}
      hasMore={hasMore && !isLoading}
      isLoadingMore={isLoadingMore}
      onLoadMore={onLoadMore}
      testID="incoming-requests-accordion"
    >
      <RequestsSection
        requests={requests}
        isLoading={isLoading}
        loadingUserId={loadingUserId}
        onAcceptRequest={onAcceptRequest}
        onRejectRequest={onRejectRequest}
      />
    </AccordionSection>
  );
};
