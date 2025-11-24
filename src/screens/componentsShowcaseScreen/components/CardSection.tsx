import React from 'react';
import { View } from 'react-native';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { ComponentSection } from '../componentSection';
import { ShowcaseItem } from '../showcaseItem';
import { styles } from './stylesCardSection';

interface CardSectionProps {
  onCopyCode: (code: string) => void;
}

const CARD_VARIANTS_CODE = `import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';

<Card variant="default">
  <Text variant="bodyPrimary">Default Card</Text>
</Card>

<Card variant="outlined">
  <Text variant="bodyPrimary">Outlined Card</Text>
</Card>

<Card variant="elevated">
  <Text variant="bodyPrimary">Elevated Card</Text>
</Card>`;

const CARD_INTERACTIVE_CODE = `<Card variant="outlined" onPress={handlePress}>
  <Text variant="titlePrimary">Clickable Card</Text>
  <Text variant="bodySecondary">Tap me!</Text>
</Card>`;

const CARD_CUSTOM_CODE = `import { ArenaSpacing, ArenaBorders } from '@/constants';

<Card
  variant="default"
  style={{ padding: ArenaSpacing['2xl'], borderRadius: ArenaBorders.radius.lg }}
>
  <Text variant="titlePrimary">Custom Styled Card</Text>
  <Text variant="bodySecondary">With custom padding and radius</Text>
</Card>`;

export const CardSection: React.FC<CardSectionProps> = ({ onCopyCode }) => {
  const [clickCount, setClickCount] = React.useState(0);

  const handleCardPress = () => {
    setClickCount(prev => prev + 1);
  };

  return (
    <ComponentSection title="Cards">
      <ShowcaseItem
        label="Card Variants"
        description="Three visual styles: default, outlined, and elevated"
        onCopyCode={onCopyCode}
        code={CARD_VARIANTS_CODE}
      >
        <View style={styles.container}>
          <Card variant="default" style={styles.card}>
            <Text variant="bodyPrimary">Default Card</Text>
            <Text variant="captionSecondary">With background</Text>
          </Card>

          <Card variant="outlined" style={styles.card}>
            <Text variant="bodyPrimary">Outlined Card</Text>
            <Text variant="captionSecondary">With border</Text>
          </Card>

          <Card variant="elevated" style={styles.card}>
            <Text variant="bodyPrimary">Elevated Card</Text>
            <Text variant="captionSecondary">With shadow</Text>
          </Card>
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="Interactive Card"
        description="Cards can handle press events"
        onCopyCode={onCopyCode}
        code={CARD_INTERACTIVE_CODE}
      >
        <View style={styles.container}>
          <Card
            variant="outlined"
            onPress={handleCardPress}
            style={styles.interactiveCard}
          >
            <Text variant="titlePrimary">Clickable Card</Text>
            <Text variant="bodySecondary">Tap me!</Text>
            <Text variant="captionSecondary" style={styles.counter}>
              Clicked {clickCount} times
            </Text>
          </Card>
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="Custom Styling"
        description="Cards accept custom styles"
        onCopyCode={onCopyCode}
        code={CARD_CUSTOM_CODE}
      >
        <View style={styles.container}>
          <Card variant="default" style={styles.customCard}>
            <Text variant="titlePrimary">Custom Card</Text>
            <Text variant="bodySecondary">
              This card has custom padding and border radius applied
            </Text>
          </Card>
        </View>
      </ShowcaseItem>
    </ComponentSection>
  );
};
