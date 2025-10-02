import React from 'react';
import { View } from 'react-native';
import { Badge } from '@/components/ui/badge';
import { ComponentSection } from '../componentSection';
import { ShowcaseItem } from '../showcaseItem';
import { styles } from '../stylesComponentsShowcaseScreen';

interface BadgeSectionProps {
  onCopyCode: (code: string) => void;
}

const BADGE_VARIANTS_CODE = `import { Badge } from '@/components/ui/badge';

<Badge variant="default">Default</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="outlined">Outlined</Badge>`;

const BADGE_SIZES_CODE = `<Badge size="sm">Small Badge</Badge>
<Badge size="md">Medium Badge</Badge>
<Badge size="lg">Large Badge</Badge>`;

const BADGE_REMOVABLE_CODE = `<Badge
  variant="primary"
  removable
  onRemove={handleRemove}
>
  Removable Badge
</Badge>`;

export const BadgeSection: React.FC<BadgeSectionProps> = ({ onCopyCode }) => {
  const [badges, setBadges] = React.useState([
    { id: '1', label: 'React Native' },
    { id: '2', label: 'TypeScript' },
    { id: '3', label: 'Expo' },
  ]);

  const handleRemove = (id: string) => {
    setBadges(prev => prev.filter(badge => badge.id !== id));
  };

  return (
    <ComponentSection title="Badges">
      <ShowcaseItem
        label="Badge Variants"
        description="Different visual styles for badges"
        onCopyCode={onCopyCode}
        code={BADGE_VARIANTS_CODE}
      >
        <View style={styles.badgeRow}>
          <Badge variant="default">Default</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="outlined">Outlined</Badge>
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="Badge Sizes"
        description="Different sizes for various contexts"
        onCopyCode={onCopyCode}
        code={BADGE_SIZES_CODE}
      >
        <View style={styles.badgeColumn}>
          <Badge variant="primary" size="sm">
            Small Badge
          </Badge>
          <Badge variant="primary" size="md">
            Medium Badge
          </Badge>
          <Badge variant="primary" size="lg">
            Large Badge
          </Badge>
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="Removable Badges"
        description="Badges with remove functionality (click × to remove)"
        onCopyCode={onCopyCode}
        code={BADGE_REMOVABLE_CODE}
      >
        <View style={styles.badgeRow}>
          {badges.map(badge => (
            <Badge
              key={badge.id}
              variant="primary"
              removable
              onRemove={() => handleRemove(badge.id)}
              testID={`badge-${badge.id}`}
            >
              {badge.label}
            </Badge>
          ))}
        </View>
      </ShowcaseItem>
    </ComponentSection>
  );
};
