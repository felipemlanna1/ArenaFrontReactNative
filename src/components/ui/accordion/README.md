# Accordion - Arena UI Component

Componente de accordion (sanfona) acessível e versátil para exibir conteúdo expansível com múltiplas variantes e modos de operação.

## 🎯 Quando Usar

- FAQs (Perguntas Frequentes)
- Listas de conteúdo expansível
- Menus de navegação com sub-itens
- Formulários com seções colapsáveis
- Detalhes de produtos ou serviços
- Instruções passo a passo

## 🚀 Uso Básico

```tsx
import { Accordion } from '@/components/ui/accordion';

export const MyComponent = () => {
  const items = [
    {
      id: '1',
      title: 'Como funciona?',
      content: 'O accordion permite expandir e colapsar conteúdo de forma organizada.',
    },
    {
      id: '2',
      title: 'Quais são os benefícios?',
      content: 'Economia de espaço, melhor organização e experiência do usuário.',
    },
  ];

  return <Accordion items={items} />;
};
```

## 🎨 Variantes

### 1. **Default** - Estilo Padrão

```tsx
<Accordion
  variant="default"
  items={[
    {
      id: '1',
      title: 'Título 1',
      content: 'Conteúdo aqui',
    },
  ]}
/>
```

### 2. **Outlined** - Com Borda Destacada

```tsx
<Accordion
  variant="outlined"
  items={[
    {
      id: '1',
      title: 'Importante',
      content: 'Informação destacada',
    },
  ]}
/>
```

### 3. **Filled** - Fundo Preenchido

```tsx
<Accordion
  variant="filled"
  items={[
    {
      id: '1',
      title: 'Destaque',
      content: 'Conteúdo com fundo',
    },
  ]}
/>
```

### 4. **Minimal** - Sem Bordas

```tsx
<Accordion
  variant="minimal"
  items={[
    {
      id: '1',
      title: 'Simples',
      content: 'Design minimalista',
    },
  ]}
/>
```

## 🔧 Modos de Operação

### Single Mode (Padrão)

Apenas um item expandido por vez:

```tsx
<Accordion
  mode="single"
  items={faqItems}
/>
```

### Multiple Mode

Múltiplos itens podem estar expandidos:

```tsx
<Accordion
  mode="multiple"
  items={sectionsItems}
/>
```

## 🎨 Exemplos Avançados

### Com Ícones

```tsx
import { HelpCircle, Settings, Info } from '@/icons';

const itemsWithIcons = [
  {
    id: '1',
    title: 'Ajuda',
    icon: HelpCircle,
    content: 'Como podemos ajudar você?',
  },
  {
    id: '2',
    title: 'Configurações',
    icon: Settings,
    content: 'Ajuste suas preferências',
  },
];

<Accordion items={itemsWithIcons} />
```

### Com Itens Desabilitados

```tsx
const items = [
  {
    id: '1',
    title: 'Disponível',
    content: 'Este item está disponível',
  },
  {
    id: '2',
    title: 'Em breve',
    content: 'Conteúdo em desenvolvimento',
    disabled: true,
  },
];

<Accordion items={items} />
```

### Com Itens Pré-Expandidos

```tsx
<Accordion
  items={items}
  defaultExpandedIds={['1', '3']}
  mode="multiple"
/>
```

### Com Callback de Toggle

```tsx
<Accordion
  items={items}
  onItemToggle={(id, isExpanded) => {
    console.log(`Item ${id} está ${isExpanded ? 'expandido' : 'recolhido'}`);
  }}
/>
```

### Com Conteúdo Customizado

```tsx
const items = [
  {
    id: '1',
    title: 'Detalhes',
    content: (
      <View>
        <Text variant="bodyPrimary">Informações detalhadas</Text>
        <Button variant="primary" onPress={handleAction}>
          Ação
        </Button>
      </View>
    ),
  },
];

<Accordion items={items} />
```

### Accordion Desabilitado

```tsx
<Accordion
  items={items}
  disabled={!isUserAuthenticated}
/>
```

## 🔧 Props Interface

```typescript
interface AccordionProps {
  items: AccordionItemData[];
  variant?: 'default' | 'outlined' | 'filled' | 'minimal';
  mode?: 'single' | 'multiple';
  defaultExpandedIds?: string[];
  onItemToggle?: (id: string, isExpanded: boolean) => void;
  testID?: string;
  disabled?: boolean;
}

interface AccordionItemData {
  id: string;
  title: string;
  content: ReactNode;
  disabled?: boolean;
  icon?: React.ComponentType<{ size: number; color: string }>;
}
```

## 📋 Props Detalhadas

### `items`
- **Tipo**: `AccordionItemData[]`
- **Obrigatório**: ✅
- **Descrição**: Array de itens do accordion

### `variant`
- **Tipo**: `'default' | 'outlined' | 'filled' | 'minimal'`
- **Padrão**: `'default'`
- **Descrição**: Define o estilo visual do accordion

### `mode`
- **Tipo**: `'single' | 'multiple'`
- **Padrão**: `'single'`
- **Descrição**: Define se apenas um ou múltiplos itens podem estar expandidos

### `defaultExpandedIds`
- **Tipo**: `string[]`
- **Padrão**: `[]`
- **Descrição**: IDs dos itens que devem começar expandidos

### `onItemToggle`
- **Tipo**: `(id: string, isExpanded: boolean) => void`
- **Descrição**: Callback chamado quando um item é expandido/recolhido

### `testID`
- **Tipo**: `string`
- **Padrão**: `'accordion'`
- **Descrição**: ID para testes automatizados

### `disabled`
- **Tipo**: `boolean`
- **Padrão**: `false`
- **Descrição**: Desabilita a interação com todo o accordion

## ♿ Acessibilidade

### Automática
- **Role**: `button` (header)
- **AccessibilityState**: `expanded`, `disabled`
- **AccessibilityLabel**: Título do item
- **AccessibilityHint**: Contexto da ação (expandir/recolher)

### Suporte a Screen Readers
- Anuncia estado expandido/recolhido
- Anuncia itens desabilitados
- Navegação por teclado (web)
- Labels descritivos automáticos

## 🎭 Comportamento

### Expansão/Colapso
- Clique no header expande/recolhe
- Modo single: fecha outros ao abrir um
- Modo multiple: múltiplos podem estar abertos
- Chevron rotaciona 180° ao expandir

### Estados
- Normal: Interativo e responsivo
- Expanded: Conteúdo visível
- Collapsed: Conteúdo oculto
- Disabled: Sem interação (opacity 50%)
- Pressed: Feedback visual ao tocar

### Indicadores Visuais
- Chevron down: Item recolhido
- Chevron up (rotacionado): Item expandido
- Ícone opcional à esquerda do título
- Cores diferenciadas por variante

## 🧪 Testando

```tsx
import { render, fireEvent } from '@testing-library/react-native';
import { Accordion } from '@/components/ui/accordion';

test('deve expandir item ao clicar no header', () => {
  const items = [
    { id: '1', title: 'Item 1', content: 'Conteúdo 1' },
  ];

  const { getByText, getByTestID } = render(
    <Accordion items={items} testID="accordion" />
  );

  fireEvent.press(getByText('Item 1'));
  expect(getByTestID('accordion-item-0-content')).toBeTruthy();
});

test('deve chamar onItemToggle ao expandir', () => {
  const handleToggle = jest.fn();
  const items = [
    { id: '1', title: 'Item 1', content: 'Conteúdo 1' },
  ];

  const { getByText } = render(
    <Accordion items={items} onItemToggle={handleToggle} />
  );

  fireEvent.press(getByText('Item 1'));
  expect(handleToggle).toHaveBeenCalledWith('1', true);
});

test('modo single deve fechar outros ao abrir um', () => {
  const items = [
    { id: '1', title: 'Item 1', content: 'Conteúdo 1' },
    { id: '2', title: 'Item 2', content: 'Conteúdo 2' },
  ];

  const { getByText, queryByText } = render(
    <Accordion items={items} mode="single" defaultExpandedIds={['1']} />
  );

  expect(queryByText('Conteúdo 1')).toBeTruthy();

  fireEvent.press(getByText('Item 2'));

  expect(queryByText('Conteúdo 1')).toBeNull();
  expect(queryByText('Conteúdo 2')).toBeTruthy();
});
```

## 📱 Compatibilidade

- ✅ iOS 11+
- ✅ Android API 21+
- ✅ Expo SDK 49+
- ✅ React Native 0.72+
- ✅ Screen Readers
- ✅ Dark Mode

## 🎨 Design Tokens

Todos os estilos utilizam exclusivamente tokens do Arena Design System:

- **Cores**: `ArenaColors.*`
- **Espaçamento**: `ArenaSpacing.*`
- **Tipografia**: `ArenaTypography.*`
- **Bordas**: `ArenaBorders.*`

## 💡 Boas Práticas

### ✅ Fazer
- Usar títulos claros e descritivos
- Limitar a 5-7 itens por accordion
- Agrupar conteúdo relacionado
- Usar ícones para melhor identificação
- Pré-expandir itens importantes
- Usar mode="single" para FAQs

### ❌ Evitar
- Accordions aninhados (accordion dentro de accordion)
- Conteúdo crítico sempre colapsado
- Títulos muito longos (usar 2-3 palavras)
- Excesso de itens (considerar paginação)
- Esconder informações essenciais

## 🎯 Casos de Uso

### FAQ

```tsx
const faqItems = [
  {
    id: '1',
    title: 'Como criar uma conta?',
    content: 'Passo a passo para criar sua conta...',
  },
  {
    id: '2',
    title: 'Como recuperar senha?',
    content: 'Instruções para recuperação de senha...',
  },
];

<Accordion mode="single" variant="minimal" items={faqItems} />
```

### Detalhes de Produto

```tsx
const productDetails = [
  {
    id: 'specs',
    title: 'Especificações',
    icon: InfoIcon,
    content: <ProductSpecs />,
  },
  {
    id: 'shipping',
    title: 'Entrega',
    icon: TruckIcon,
    content: <ShippingInfo />,
  },
];

<Accordion mode="multiple" variant="outlined" items={productDetails} />
```

## 🔄 Versionamento

**v1.0.0** - Versão inicial
