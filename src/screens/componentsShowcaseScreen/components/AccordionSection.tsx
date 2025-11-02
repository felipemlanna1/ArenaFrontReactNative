import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@/components/ui/text';
import { Accordion } from '@/components/ui/accordion';
import { ComponentSection } from '../componentSection';
import { ShowcaseItem } from '../showcaseItem';
import { ArenaColors } from '@/constants';
import { styles } from '../stylesComponentsShowcaseScreen';

interface AccordionSectionProps {
  onCopyCode: (code: string) => void;
}

const HelpIcon: React.FC<{ size: number; color: string }> = ({ size }) => (
  <Ionicons
    name="help-circle-outline"
    size={size}
    color={ArenaColors.brand.primary}
  />
);

const SettingsIcon: React.FC<{ size: number; color: string }> = ({ size }) => (
  <Ionicons
    name="settings-outline"
    size={size}
    color={ArenaColors.brand.primary}
  />
);

const InfoIcon: React.FC<{ size: number; color: string }> = ({ size }) => (
  <Ionicons
    name="information-circle-outline"
    size={size}
    color={ArenaColors.brand.primary}
  />
);

export const AccordionSection: React.FC<AccordionSectionProps> = ({
  onCopyCode,
}) => {
  const basicItems = [
    {
      id: '1',
      title: 'O que é Arena?',
      content: 'Arena é uma plataforma moderna para gerenciamento esportivo.',
    },
    {
      id: '2',
      title: 'Como funciona?',
      content: 'Conecte atletas, treinadores e equipes em um único lugar.',
    },
    {
      id: '3',
      title: 'É gratuito?',
      content: 'Oferecemos planos gratuitos e premium com recursos adicionais.',
    },
  ];

  const multipleItems = [
    {
      id: '1',
      title: 'Seção 1',
      content: 'Conteúdo da primeira seção que pode ser expandida.',
    },
    {
      id: '2',
      title: 'Seção 2',
      content: 'Conteúdo da segunda seção, independente da primeira.',
    },
  ];

  const iconItems = [
    {
      id: '1',
      title: 'Ajuda',
      icon: HelpIcon,
      content: 'Como podemos ajudar você hoje?',
    },
    {
      id: '2',
      title: 'Configurações',
      icon: SettingsIcon,
      content: 'Personalize sua experiência.',
    },
    {
      id: '3',
      title: 'Sobre',
      icon: InfoIcon,
      content: 'Conheça mais sobre a Arena.',
    },
  ];

  const variantItems = [
    {
      id: '1',
      title: 'Item Principal',
      content: 'Este é um exemplo de accordion com variante default.',
    },
  ];

  const disabledItems = [
    {
      id: '1',
      title: 'Item Ativo',
      content: 'Este item está disponível para interação.',
    },
    {
      id: '2',
      title: 'Item Desabilitado',
      content: 'Este conteúdo não pode ser acessado.',
      disabled: true,
    },
  ];

  const BASIC_CODE = `import { Accordion } from '@/components/ui/accordion';

const items = [
  {
    id: '1',
    title: 'O que é Arena?',
    content: 'Arena é uma plataforma moderna...',
  },
];

<Accordion items={items} />`;

  const MULTIPLE_CODE = `<Accordion
  mode="multiple"
  items={items}
  defaultExpandedIds={['1', '2']}
/>`;

  const ICONS_CODE = `const items = [
  {
    id: '1',
    title: 'Ajuda',
    icon: HelpIcon,
    content: 'Como podemos ajudar?',
  },
];

<Accordion items={items} />`;

  const VARIANTS_CODE = `<Accordion variant="default" items={items} />
<Accordion variant="outlined" items={items} />
<Accordion variant="filled" items={items} />
<Accordion variant="minimal" items={items} />`;

  const DISABLED_CODE = `const items = [
  {
    id: '1',
    title: 'Item Ativo',
    content: 'Disponível',
  },
  {
    id: '2',
    title: 'Item Desabilitado',
    content: 'Indisponível',
    disabled: true,
  },
];

<Accordion items={items} />`;

  const FAQ_CODE = `const faqItems = [
  {
    id: '1',
    title: 'Como criar conta?',
    content: 'Passo a passo...',
  },
];

<Accordion
  mode="single"
  variant="minimal"
  items={faqItems}
  onItemToggle={(id, isExpanded) => {
  }}
/>`;

  return (
    <ComponentSection
      title="Accordion"
      description="Conteúdo expansível e colapsável"
    >
      <ShowcaseItem
        label="Básico (Single Mode)"
        code={BASIC_CODE}
        onCopyCode={() => onCopyCode(BASIC_CODE)}
      >
        <Accordion items={basicItems} />
      </ShowcaseItem>

      <ShowcaseItem
        label="Modo Multiple"
        code={MULTIPLE_CODE}
        onCopyCode={() => onCopyCode(MULTIPLE_CODE)}
      >
        <Accordion
          mode="multiple"
          items={multipleItems}
          defaultExpandedIds={['1', '2']}
        />
      </ShowcaseItem>

      <ShowcaseItem
        label="Com Ícones"
        code={ICONS_CODE}
        onCopyCode={() => onCopyCode(ICONS_CODE)}
      >
        <Accordion items={iconItems} />
      </ShowcaseItem>

      <ShowcaseItem
        label="Variantes"
        code={VARIANTS_CODE}
        onCopyCode={() => onCopyCode(VARIANTS_CODE)}
      >
        <View style={styles.accordionVariantContainer}>
          <View style={styles.accordionVariantItem}>
            <Text variant="bodySecondary" style={styles.accordionVariantItem}>
              Default
            </Text>
            <Accordion variant="default" items={variantItems} />
          </View>

          <View style={styles.accordionVariantItem}>
            <Text variant="bodySecondary" style={styles.accordionVariantItem}>
              Outlined
            </Text>
            <Accordion variant="outlined" items={variantItems} />
          </View>

          <View style={styles.accordionVariantItem}>
            <Text variant="bodySecondary" style={styles.accordionVariantItem}>
              Filled
            </Text>
            <Accordion variant="filled" items={variantItems} />
          </View>

          <View style={styles.accordionVariantItem}>
            <Text variant="bodySecondary" style={styles.accordionVariantItem}>
              Minimal
            </Text>
            <Accordion variant="minimal" items={variantItems} />
          </View>
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="Estado Disabled"
        code={DISABLED_CODE}
        onCopyCode={() => onCopyCode(DISABLED_CODE)}
      >
        <Accordion items={disabledItems} />
      </ShowcaseItem>

      <ShowcaseItem
        label="Exemplo: FAQ"
        code={FAQ_CODE}
        onCopyCode={() => onCopyCode(FAQ_CODE)}
      >
        <Accordion mode="single" variant="minimal" items={basicItems} />
      </ShowcaseItem>
    </ComponentSection>
  );
};
