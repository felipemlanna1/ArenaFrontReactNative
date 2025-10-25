import React from 'react';
import { AccordionSection } from '@/components/accordionSection';
import { PendingGroupsSection } from './GroupsSections';
import { Group } from '@/services/groups/typesGroups';

interface PendingGroupsAccordionSectionProps {
  groups: Group[];
  isLoading: boolean;
  loadingGroupId: string | null;
  onNavigateToGroup: (groupId: string) => void;
  onCancelRequest: (groupId: string) => Promise<void>;
}

export const PendingGroupsAccordionSection: React.FC<
  PendingGroupsAccordionSectionProps
> = ({
  groups,
  isLoading,
  loadingGroupId,
  onNavigateToGroup,
  onCancelRequest,
}) => {
  const safeGroups = Array.isArray(groups) ? groups : [];

  return (
    <AccordionSection
      title="Solicitações Pendentes"
      count={safeGroups.length}
      defaultExpanded={false}
      testID="pending-groups-accordion"
    >
      <PendingGroupsSection
        groups={safeGroups}
        isLoading={isLoading}
        loadingGroupId={loadingGroupId}
        onNavigateToGroup={onNavigateToGroup}
        onCancelRequest={onCancelRequest}
      />
    </AccordionSection>
  );
};
