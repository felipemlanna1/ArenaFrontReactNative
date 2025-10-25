import React from 'react';
import { AccordionSection } from '@/components/accordionSection';
import { GroupsSection } from './GroupsSections';
import { Group } from '@/services/groups/typesGroups';

interface MyGroupsAccordionSectionProps {
  groups: Group[];
  isLoading: boolean;
  loadingGroupId: string | null;
  onNavigateToGroup: (groupId: string) => void;
  onLeaveGroup: (groupId: string) => Promise<void>;
}

export const MyGroupsAccordionSection: React.FC<
  MyGroupsAccordionSectionProps
> = ({
  groups,
  isLoading,
  loadingGroupId,
  onNavigateToGroup,
  onLeaveGroup,
}) => {
  const safeGroups = Array.isArray(groups) ? groups : [];

  return (
    <AccordionSection
      title="Meus Grupos"
      count={safeGroups.length}
      defaultExpanded={true}
      testID="my-groups-accordion"
    >
      <GroupsSection
        groups={safeGroups}
        isLoading={isLoading}
        loadingGroupId={loadingGroupId}
        onNavigateToGroup={onNavigateToGroup}
        onLeaveGroup={onLeaveGroup}
      />
    </AccordionSection>
  );
};
