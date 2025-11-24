import React from 'react';
import { AccordionSection } from '@/components/accordionSection';
import { RecommendationsSection } from './FriendsSections';
import { UserData } from '@/services/http';

interface RecommendationsAccordionSectionProps {
  recommendations: UserData[];
  isLoading: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
  loadingUserId: string | null;
  onNavigateToProfile: (userId: string) => void;
  onSendRequest: (userId: string) => void;
  onLoadMore: () => void;
}

export const RecommendationsAccordionSection: React.FC<
  RecommendationsAccordionSectionProps
> = ({
  recommendations,
  isLoading,
  isLoadingMore,
  hasMore,
  loadingUserId,
  onNavigateToProfile,
  onSendRequest,
  onLoadMore,
}) => {
  return (
    <AccordionSection
      title="Recomendações"
      count={recommendations.length}
      defaultExpanded={recommendations.length > 0}
      hasMore={hasMore && !isLoading}
      isLoadingMore={isLoadingMore}
      onLoadMore={onLoadMore}
      testID="recommendations-accordion"
    >
      <RecommendationsSection
        recommendations={recommendations}
        isLoading={isLoading}
        loadingUserId={loadingUserId}
        onNavigateToProfile={onNavigateToProfile}
        onSendRequest={onSendRequest}
      />
    </AccordionSection>
  );
};
