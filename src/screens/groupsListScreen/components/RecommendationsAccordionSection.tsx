import React from 'react';
import { AccordionSection } from '@/components/accordionSection';
import { GroupRecommendationsSection } from './GroupsSections';
import { Group } from '@/services/groups/typesGroups';

interface RecommendationsAccordionSectionProps {
  groups: Group[];
  isLoading: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
  loadingGroupId: string | null;
  onNavigateToGroup: (groupId: string) => void;
  onManageGroup: (groupId: string) => void;
  onJoinGroup: (groupId: string) => Promise<void>;
  onLoadMore: () => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  onCreateGroup: () => void;
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
  onManageGroup,
  onJoinGroup,
  onLoadMore,
  hasActiveFilters,
  onClearFilters,
  onCreateGroup,
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
      <GroupRecommendationsSection
        groups={safeGroups}
        isLoading={isLoading}
        loadingGroupId={loadingGroupId}
        onNavigateToGroup={onNavigateToGroup}
        onManageGroup={onManageGroup}
        onJoinGroup={onJoinGroup}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={onClearFilters}
        onCreateGroup={onCreateGroup}
      />
    </AccordionSection>
  );
};
