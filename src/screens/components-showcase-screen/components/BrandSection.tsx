import React from 'react';
import { View } from 'react-native';
import { Symbol } from '@/components/ui/symbol';
import { Logo } from '@/components/ui/logo';
import { AppIcon } from '@/components/ui/app-icon';
import { ComponentSection } from '../component-section';
import { ShowcaseItem } from '../showcase-item';
import { styles } from '../stylesComponentsShowcaseScreen';

interface BrandSectionProps {
  onCopyCode: (code: string) => void;
}

const SYMBOL_CODE = `import { Symbol } from '@/components/ui/symbol';
<Symbol size="md" variant="variant1" />`;

const LOGO_CODE = `import { Logo } from '@/components/ui/logo';
<Logo size="md" variant="variant1" />`;

const APP_ICON_CODE = `import { AppIcon } from '@/components/ui/app-icon';
<AppIcon size="md" />`;

export const BrandSection: React.FC<BrandSectionProps> = ({ onCopyCode }) => {
  return (
    <ComponentSection title="Brand Components">
      <ShowcaseItem
        label="Symbol"
        description="Arena brand symbol with 6 color variants"
        onCopyCode={onCopyCode}
        code={SYMBOL_CODE}
      >
        <View style={styles.brandShowcase}>
          <View style={styles.brandRow}>
            <Symbol size="xs" variant="variant1" testID="symbol-xs" />
            <Symbol size="sm" variant="variant2" testID="symbol-sm" />
            <Symbol size="md" variant="variant3" testID="symbol-md" />
            <Symbol size="lg" variant="variant4" testID="symbol-lg" />
            <Symbol size="xl" variant="black" testID="symbol-xl" />
            <Symbol size="xxl" variant="white" testID="symbol-xxl" />
          </View>
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="Logo"
        description="Complete Arena logo with color variants"
        onCopyCode={onCopyCode}
        code={LOGO_CODE}
      >
        <View style={styles.brandShowcase}>
          <View style={styles.brandColumn}>
            <Logo size="xs" variant="variant1" testID="logo-xs" />
            <Logo size="sm" variant="variant2" testID="logo-sm" />
            <Logo size="md" variant="variant3" testID="logo-md" />
          </View>
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="App Icon"
        description="Application icon with orange background"
        onCopyCode={onCopyCode}
        code={APP_ICON_CODE}
      >
        <View style={styles.brandShowcase}>
          <View style={styles.brandRow}>
            <AppIcon size="xs" testID="app-icon-xs" />
            <AppIcon size="sm" testID="app-icon-sm" />
            <AppIcon size="md" testID="app-icon-md" />
            <AppIcon size="lg" testID="app-icon-lg" />
            <AppIcon size="xl" testID="app-icon-xl" />
            <AppIcon size="xxl" testID="app-icon-xxl" />
          </View>
        </View>
      </ShowcaseItem>
    </ComponentSection>
  );
};
