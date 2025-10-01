import React from 'react';
import { View } from 'react-native';
import { Button } from '@/components/ui/button';
import { ComponentSection } from '../componentSection';
import { ShowcaseItem } from '../showcaseItem';
import { styles } from '../stylesComponentsShowcaseScreen';

interface ButtonSectionProps {
  onCopyCode: (code: string) => void;
}

const PRIMARY_BUTTONS_CODE = `import { Button } from '@/components/ui/button';
<Button variant="primary">Save Changes</Button>
<Button variant="secondary">Cancel</Button>`;

const ACCENT_BUTTONS_CODE = `<Button variant="destructive">Delete</Button>
<Button variant="success">Approve</Button>`;

const SUBTLE_BUTTONS_CODE = `<Button variant="subtle">Subtle Action</Button>
<Button variant="ghost">Filter</Button>`;

export const ButtonSection: React.FC<ButtonSectionProps> = ({ onCopyCode }) => {
  const [loadingStates, setLoadingStates] = React.useState({
    primary: false,
    secondary: false,
    danger: false,
  });

  const handleButtonPress = (buttonType: keyof typeof loadingStates) => {
    setLoadingStates(prev => ({ ...prev, [buttonType]: true }));
    setTimeout(() => {
      setLoadingStates(prev => ({ ...prev, [buttonType]: false }));
    }, 2000);
  };

  return (
    <ComponentSection title="Buttons">
      <ShowcaseItem
        label="Primary Actions"
        description="Main and secondary action buttons"
        onCopyCode={onCopyCode}
        code={PRIMARY_BUTTONS_CODE}
      >
        <View style={styles.buttonRow}>
          <View style={styles.buttonColumn}>
            <Button
              variant="primary"
              onPress={() => handleButtonPress('primary')}
              loading={loadingStates.primary}
              testID="button-primary"
            >
              Save Changes
            </Button>
          </View>
          <View style={styles.buttonColumn}>
            <Button
              variant="secondary"
              onPress={() => handleButtonPress('secondary')}
              loading={loadingStates.secondary}
              testID="button-secondary"
            >
              Cancel
            </Button>
          </View>
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="Accent Actions"
        description="Destructive and positive confirmation buttons"
        onCopyCode={onCopyCode}
        code={ACCENT_BUTTONS_CODE}
      >
        <View style={styles.buttonRow}>
          <View style={styles.buttonColumn}>
            <Button
              variant="destructive"
              onPress={() => handleButtonPress('danger')}
              loading={loadingStates.danger}
              testID="button-danger"
            >
              Delete
            </Button>
          </View>
          <View style={styles.buttonColumn}>
            <Button
              variant="success"
              onPress={() => {}}
              testID="button-success"
            >
              Approve
            </Button>
          </View>
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="Subtle Actions"
        description="Discrete buttons for secondary actions"
        onCopyCode={onCopyCode}
        code={SUBTLE_BUTTONS_CODE}
      >
        <View style={styles.buttonRow}>
          <View style={styles.buttonColumn}>
            <Button variant="subtle" onPress={() => {}} testID="button-subtle">
              Subtle Action
            </Button>
          </View>
          <View style={styles.buttonColumn}>
            <Button variant="ghost" onPress={() => {}} testID="button-ghost">
              Filter
            </Button>
          </View>
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="Button Sizes"
        description="Different sizes for various contexts"
        onCopyCode={onCopyCode}
        code={`<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>`}
      >
        <View style={styles.buttonSizes}>
          <Button variant="primary" size="xs" onPress={() => {}}>
            XS
          </Button>
          <Button variant="primary" size="sm" onPress={() => {}}>
            Small
          </Button>
          <Button variant="primary" size="md" onPress={() => {}}>
            Medium
          </Button>
          <Button variant="primary" size="lg" onPress={() => {}}>
            Large
          </Button>
          <Button variant="primary" size="xl" onPress={() => {}}>
            XL
          </Button>
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="Button States"
        description="Loading and disabled states"
        onCopyCode={onCopyCode}
        code={`<Button loading>Loading...</Button>
<Button disabled>Disabled</Button>`}
      >
        <View style={styles.buttonRow}>
          <View style={styles.buttonColumn}>
            <Button variant="primary" loading onPress={() => {}}>
              Loading
            </Button>
          </View>
          <View style={styles.buttonColumn}>
            <Button variant="primary" disabled onPress={() => {}}>
              Disabled
            </Button>
          </View>
        </View>
      </ShowcaseItem>
    </ComponentSection>
  );
};
