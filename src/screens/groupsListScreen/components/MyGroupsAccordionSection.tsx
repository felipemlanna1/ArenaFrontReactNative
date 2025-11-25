import React from 'react';
import { AccordionSection } from '@/components/accordionSection';
import { MyGroupsSection } from './GroupsSections';
import { Group } from '@/services/groups/typesGroups';

interface MyGroupsAccordionSectionProps {
  groups: Group[];
  isLoading: boolean;
  loadingGroupId: string | null;
  onNavigateToGroup: (groupId: string) => void;
  onManageGroup: (groupId: string) => void;
  onLeaveGroup: (groupId: string) => Promise<void>;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  onSwitchToRecommendations: () => void;
}

export const MyGroupsAccordionSection: React.FC<
  MyGroupsAccordionSectionProps
> = ({
  groups,
  isLoading,
  loadingGroupId,
  onNavigateToGroup,
  onManageGroup,
  onLeaveGroup,
  hasActiveFilters,
  onClearFilters,
  onSwitchToRecommendations,
}) => {
  const safeGroups = Array.isArray(groups) ? groups : [];

  return (
    <AccordionSection
      title="Meus Grupos"
      count={safeGroups.length}
      defaultExpanded={true}
      testID="my-groups-accordion"
    >
      <MyGroupsSection
        groups={safeGroups}
        isLoading={isLoading}
        loadingGroupId={loadingGroupId}
        onNavigateToGroup={onNavigateToGroup}
        onManageGroup={onManageGroup}
        onLeaveGroup={onLeaveGroup}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={onClearFilters}
        onSwitchToRecommendations={onSwitchToRecommendations}
      />
    </AccordionSection>
  );
};
