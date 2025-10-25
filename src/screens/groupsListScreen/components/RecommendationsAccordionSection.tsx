import React from 'react';
import { AccordionSection } from '@/components/accordionSection';
import { RecommendationsGroupsSection } from './GroupsSections';
import { Group } from '@/services/groups/typesGroups';

interface RecommendationsAccordionSectionProps {
  groups: Group[];
  isLoading: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
  loadingGroupId: string | null;
  onNavigateToGroup: (groupId: string) => void;
  onJoinGroup: (groupId: string) => Promise<void>;
  onLoadMore: () => void;
}

export const RecommendationsAccordionSection: React.FC<
  RecommendationsAccordionSectionProps
> = ({
  groups,
  isLoading,
  isLoadingMore,
  hasMore,
  loadingGroupId,
  onNavigateToGroup,
  onJoinGroup,
  onLoadMore,
}) => {
  const safeGroups = Array.isArray(groups) ? groups : [];

  return (
    <AccordionSection
      title="Recomendações"
      count={safeGroups.length}
      defaultExpanded={false}
      hasMore={hasMore && !isLoading}
      isLoadingMore={isLoadingMore}
      onLoadMore={onLoadMore}
      testID="recommendations-groups-accordion"
    >
      <RecommendationsGroupsSection
        groups={safeGroups}
        isLoading={isLoading}
        loadingGroupId={loadingGroupId}
        onNavigateToGroup={onNavigateToGroup}
        onJoinGroup={onJoinGroup}
      />
    </AccordionSection>
  );
};
