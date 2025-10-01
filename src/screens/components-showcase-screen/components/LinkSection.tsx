import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/text';
import { Link } from '@/components/ui/link';
import { ComponentSection } from '../component-section';
import { ShowcaseItem } from '../showcase-item';
import { styles } from './stylesLinkSection';

interface LinkSectionProps {
  onCopyCode: (code: string) => void;
}

export const LinkSection: React.FC<LinkSectionProps> = ({ onCopyCode }) => {
  const BASIC_CODE = `import { Link } from '@/components/ui/link';

<Link onPress={() => console.log('Link pressed')}>
  Este é um link básico
</Link>`;

  const VARIANTS_CODE = `<Link variant="primary" onPress={handlePress}>Primary Link</Link>
<Link variant="secondary" onPress={handlePress}>Secondary Link</Link>
<Link variant="subtle" onPress={handlePress}>Subtle Link</Link>`;

  const SIZES_CODE = `<Link size="sm" onPress={handlePress}>Small Link</Link>
<Link size="md" onPress={handlePress}>Medium Link</Link>
<Link size="lg" onPress={handlePress}>Large Link</Link>`;

  const STATES_CODE = `<Link onPress={handlePress}>Normal Link</Link>
<Link underline onPress={handlePress}>Underlined Link</Link>
<Link disabled onPress={handlePress}>Disabled Link</Link>
<Link underline disabled onPress={handlePress}>Disabled Underlined</Link>`;

  const handlePress = () => {};

  return (
    <ComponentSection title="Link">
      <ShowcaseItem
        label="Link Básico"
        description="Link para navegação e ações"
        onCopyCode={onCopyCode}
        code={BASIC_CODE}
      >
        <Link onPress={handlePress}>Este é um link básico</Link>
      </ShowcaseItem>

      <ShowcaseItem
        label="Variantes"
        description="Três variantes de cores disponíveis"
        onCopyCode={onCopyCode}
        code={VARIANTS_CODE}
      >
        <View style={styles.container}>
          <Link variant="primary" onPress={handlePress}>
            Primary Link
          </Link>
          <Link variant="secondary" onPress={handlePress}>
            Secondary Link
          </Link>
          <Link variant="subtle" onPress={handlePress}>
            Subtle Link
          </Link>
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="Tamanhos"
        description="Três tamanhos disponíveis (sm, md, lg)"
        onCopyCode={onCopyCode}
        code={SIZES_CODE}
      >
        <View style={styles.container}>
          <Link size="sm" onPress={handlePress}>
            Small Link
          </Link>
          <Link size="md" onPress={handlePress}>
            Medium Link
          </Link>
          <Link size="lg" onPress={handlePress}>
            Large Link
          </Link>
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="Estados e Opções"
        description="Normal, underline e disabled"
        onCopyCode={onCopyCode}
        code={STATES_CODE}
      >
        <View style={styles.container}>
          <Text variant="bodySecondary">Normal:</Text>
          <Link onPress={handlePress}>Link normal</Link>

          <Text variant="bodySecondary" style={styles.sectionLabel}>
            Com sublinhado:
          </Text>
          <Link underline onPress={handlePress}>
            Link sublinhado
          </Link>

          <Text variant="bodySecondary" style={styles.sectionLabel}>
            Desabilitado:
          </Text>
          <Link disabled onPress={handlePress}>
            Link desabilitado
          </Link>
          <Link underline disabled onPress={handlePress}>
            Link desabilitado sublinhado
          </Link>
        </View>
      </ShowcaseItem>
    </ComponentSection>
  );
};
