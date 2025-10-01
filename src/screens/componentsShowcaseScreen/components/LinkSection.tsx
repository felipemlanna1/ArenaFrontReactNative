import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Link } from '@/components/ui/link';
import { ComponentSection } from '../componentSection';
import { ShowcaseItem } from '../showcaseItem';
import { styles } from './stylesLinkSection';

interface LinkSectionProps {
  onCopyCode: (code: string) => void;
}

export const LinkSection: React.FC<LinkSectionProps> = ({ onCopyCode }) => {
  const BASIC_CODE = `import { Link } from '@/components/ui/link';

<Link onPress={() => console.log('Link pressed')}>
  Este é um link básico
</Link>`;

  const VARIANTS_CODE = `<Link variant="bodyPrimary" onPress={handlePress}>Body Primary</Link>
<Link variant="bodySecondary" onPress={handlePress}>Body Secondary</Link>
<Link variant="captionSecondary" onPress={handlePress}>Caption</Link>
<Link variant="labelPrimary" onPress={handlePress}>Label</Link>`;

  const SIZES_CODE = `<Link variant="captionSecondary" onPress={handlePress}>Caption (small)</Link>
<Link variant="bodyPrimary" onPress={handlePress}>Body (medium)</Link>
<Link variant="titlePrimary" onPress={handlePress}>Title (large)</Link>`;

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
        description="Mesmas variantes do Text, em bold e itálico"
        onCopyCode={onCopyCode}
        code={VARIANTS_CODE}
      >
        <View style={styles.container}>
          <Link variant="bodyPrimary" onPress={handlePress}>
            Body Primary
          </Link>
          <Link variant="bodySecondary" onPress={handlePress}>
            Body Secondary
          </Link>
          <Link variant="captionSecondary" onPress={handlePress}>
            Caption
          </Link>
          <Link variant="labelPrimary" onPress={handlePress}>
            Label
          </Link>
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="Tamanhos"
        description="Tamanhos conforme variants do Text"
        onCopyCode={onCopyCode}
        code={SIZES_CODE}
      >
        <View style={styles.container}>
          <Link variant="captionSecondary" onPress={handlePress}>
            Caption (small)
          </Link>
          <Link variant="bodyPrimary" onPress={handlePress}>
            Body (medium)
          </Link>
          <Link variant="titlePrimary" onPress={handlePress}>
            Title (large)
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
