import React, { useState } from 'react';
import { View } from 'react-native';
import { Switch } from '@/components/ui/switch';
import { ComponentSection } from '../componentSection';
import { ShowcaseItem } from '../showcaseItem';
import { styles } from '../stylesComponentsShowcaseScreen';

interface SwitchSectionProps {
  onCopyCode: (code: string) => void;
}

export const SwitchSection: React.FC<SwitchSectionProps> = ({
  onCopyCode,
}) => {
  const [brandSwitch, setBrandSwitch] = useState(false);
  const [defaultSwitch, setDefaultSwitch] = useState(false);
  const [withLabel, setWithLabel] = useState(true);
  const [disabled, setDisabled] = useState(true);

  return (
    <ComponentSection title="Toggle Switches">
      <ShowcaseItem
        label="Brand Variant"
        description="Primary brand colored switch"
        onCopyCode={onCopyCode}
        code={`import { Switch } from '@/components/ui/switch';
const [enabled, setEnabled] = useState(false);

<Switch
  value={enabled}
  onValueChange={setEnabled}
  variant="brand"
/>`}
      >
        <View style={styles.verticalStack}>
          <Switch
            value={brandSwitch}
            onValueChange={setBrandSwitch}
            variant="brand"
          />
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="Default Variant"
        description="Default neutral switch"
        onCopyCode={onCopyCode}
        code={`<Switch
  value={enabled}
  onValueChange={setEnabled}
  variant="default"
/>`}
      >
        <View style={styles.verticalStack}>
          <Switch
            value={defaultSwitch}
            onValueChange={setDefaultSwitch}
            variant="default"
          />
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="With Label"
        description="Switch with descriptive label"
        onCopyCode={onCopyCode}
        code={`<Switch
  value={enabled}
  onValueChange={setEnabled}
  label="Notificações"
  variant="brand"
/>`}
      >
        <View style={styles.verticalStack}>
          <Switch
            value={withLabel}
            onValueChange={setWithLabel}
            label="Notificações"
            variant="brand"
          />
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="Disabled State"
        description="Switch in disabled state"
        onCopyCode={onCopyCode}
        code={`<Switch
  value={true}
  onValueChange={() => {}}
  label="Desabilitado"
  variant="brand"
  disabled
/>`}
      >
        <View style={styles.verticalStack}>
          <Switch
            value={disabled}
            onValueChange={setDisabled}
            label="Desabilitado"
            variant="brand"
            disabled
          />
        </View>
      </ShowcaseItem>
    </ComponentSection>
  );
};
