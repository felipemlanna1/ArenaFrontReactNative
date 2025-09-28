import React from 'react';
import { Text } from '@/components/text';
import { CodeExample } from '@/components/code-example';
import { ComponentSection } from '../ComponentSection';
import { ShowcaseItem } from '../ShowcaseItem';

interface TextComponentsSectionProps {
  onCopyCode: (code: string) => void;
}

export const TextComponentsSection: React.FC<TextComponentsSectionProps> = ({ onCopyCode }) => {
  return (
    <ComponentSection title="Text Components">
      <ShowcaseItem
        label="Display Variants"
        description="Para títulos hero e landing pages"
      >
        <Text variant="displayPrimary">Arena Sports</Text>
        <Text variant="displayAccent" style={{ marginTop: 8 }}>Arena Sports</Text>

        <CodeExample
          code={`<Text variant="displayPrimary">Arena Sports</Text>
<Text variant="displayAccent">Arena Sports</Text>`}
          onCopy={onCopyCode}
        />
      </ShowcaseItem>

      <ShowcaseItem
        label="Heading Variants"
        description="Títulos principais de telas"
      >
        <Text variant="headingPrimary">Dashboard</Text>
        <Text variant="headingAccent" style={{ marginTop: 8 }}>Dashboard</Text>

        <CodeExample
          code={`<Text variant="headingPrimary">Dashboard</Text>
<Text variant="headingAccent">Dashboard</Text>`}
          onCopy={onCopyCode}
        />
      </ShowcaseItem>

      <ShowcaseItem
        label="Title Variants"
        description="Títulos de seções"
      >
        <Text variant="titlePrimary">Seção Principal</Text>
        <Text variant="titleSecondary" style={{ marginTop: 8 }}>Seção Secundária</Text>

        <CodeExample
          code={`<Text variant="titlePrimary">Seção Principal</Text>
<Text variant="titleSecondary">Seção Secundária</Text>`}
          onCopy={onCopyCode}
        />
      </ShowcaseItem>

      <ShowcaseItem
        label="Body Variants"
        description="Texto de corpo para conteúdo"
      >
        <Text variant="bodyPrimary">Texto principal de conteúdo</Text>
        <Text variant="bodySecondary" style={{ marginTop: 8 }}>Texto secundário de conteúdo</Text>
        <Text variant="bodyMuted" style={{ marginTop: 8 }}>Texto com opacity reduzida</Text>
        <Text variant="bodyError" style={{ marginTop: 8 }}>Mensagem de erro</Text>
        <Text variant="bodySuccess" style={{ marginTop: 8 }}>Mensagem de sucesso</Text>

        <CodeExample
          code={`<Text variant="bodyPrimary">Texto principal</Text>
<Text variant="bodySecondary">Texto secundário</Text>
<Text variant="bodyMuted">Texto com opacity</Text>
<Text variant="bodyError">Mensagem de erro</Text>
<Text variant="bodySuccess">Mensagem de sucesso</Text>`}
          onCopy={onCopyCode}
        />
      </ShowcaseItem>

      <ShowcaseItem
        label="Caption Variants"
        description="Textos pequenos e legendas"
      >
        <Text variant="captionSecondary">Legenda secundária</Text>
        <Text variant="captionMuted" style={{ marginTop: 4 }}>Metadado com opacity</Text>
        <Text variant="captionError" style={{ marginTop: 4 }}>Erro de validação</Text>

        <CodeExample
          code={`<Text variant="captionSecondary">Legenda secundária</Text>
<Text variant="captionMuted">Metadado com opacity</Text>
<Text variant="captionError">Erro de validação</Text>`}
          onCopy={onCopyCode}
        />
      </ShowcaseItem>

      <ShowcaseItem
        label="Label Variants"
        description="Labels de formulários"
      >
        <Text variant="labelPrimary">Nome do campo</Text>
        <Text variant="labelSecondary" style={{ marginTop: 4 }}>Campo opcional</Text>
        <Text variant="labelError" style={{ marginTop: 4 }}>Campo obrigatório</Text>

        <CodeExample
          code={`<Text variant="labelPrimary">Nome do campo</Text>
<Text variant="labelSecondary">Campo opcional</Text>
<Text variant="labelError">Campo obrigatório</Text>`}
          onCopy={onCopyCode}
        />
      </ShowcaseItem>

      <ShowcaseItem
        label="Interactive Text"
        description="Textos clicáveis"
      >
        <Text
          variant="bodyPrimary"
          onPress={() => console.log('Pressed!')}
        >
          Texto clicável (primary)
        </Text>
        <Text
          variant="captionSecondary"
          onPress={() => console.log('Pressed!')}
          style={{ marginTop: 8 }}
        >
          Link pequeno (secondary)
        </Text>

        <CodeExample
          code={`<Text
  variant="bodyPrimary"
  onPress={() => console.log('Pressed!')}
>
  Texto clicável (primary)
</Text>

<Text
  variant="captionSecondary"
  onPress={() => alert('Link clicado!')}
>
  Link pequeno (secondary)
</Text>`}
          onCopy={onCopyCode}
        />
      </ShowcaseItem>

      <ShowcaseItem
        label="Truncated Text"
        description="Texto com truncamento"
      >
        <Text
          variant="bodyPrimary"
          numberOfLines={1}
        >
          Este é um texto muito longo que será truncado após uma linha para demonstrar o comportamento do componente
        </Text>
        <Text
          variant="bodySecondary"
          numberOfLines={2}
          style={{ marginTop: 8 }}
        >
          Este é outro texto longo que será truncado após duas linhas para mostrar como funciona o ellipsizeMode do componente Text
        </Text>

        <CodeExample
          code={`<Text
  variant="bodyPrimary"
  numberOfLines={1}
>
  Texto longo que será truncado...
</Text>

<Text
  variant="bodySecondary"
  numberOfLines={2}
>
  Texto que será truncado após duas linhas...
</Text>`}
          onCopy={onCopyCode}
        />
      </ShowcaseItem>
    </ComponentSection>
  );
};