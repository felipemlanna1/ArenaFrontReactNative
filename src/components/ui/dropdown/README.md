# Dropdown - Arena UI Component

Componente de menu dropdown acessível e versátil com suporte a ícones, múltiplas variantes e posicionamento automático.

## 🎯 Quando Usar

- Menus de navegação
- Menus de ações contextuais
- Menus de perfil de usuário
- Seletores com ações personalizadas
- Listas de opções com ícones

## 🚀 Uso Básico

```tsx
import { Dropdown } from '@/components/ui/dropdown';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';

export const MyComponent = () => {
  const menuItems = [
    {
      id: 'option1',
      label: 'Opção 1',
      onPress: () => console.log('Opção 1 clicada'),
    },
    {
      id: 'option2',
      label: 'Opção 2',
      onPress: () => console.log('Opção 2 clicada'),
    },
  ];

  return (
    <Dropdown
      trigger={<Button variant="secondary">Menu</Button>}
      items={menuItems}
    />
  );
};
```

## 🎨 Variantes

### 1. **Default** - Menu Padrão

```tsx
<Dropdown
  variant="default"
  trigger={<Button variant="secondary">Opções</Button>}
  items={[
    {
      id: 'edit',
      label: 'Editar',
      onPress: handleEdit,
    },
    {
      id: 'share',
      label: 'Compartilhar',
      onPress: handleShare,
    },
  ]}
/>
```

### 2. **Menu** - Menu de Navegação

```tsx
<Dropdown
  variant="menu"
  trigger={<Text variant="bodyPrimary">Menu ▼</Text>}
  items={[
    {
      id: 'home',
      label: 'Início',
      onPress: () => navigation.navigate('Home'),
    },
    {
      id: 'profile',
      label: 'Perfil',
      onPress: () => navigation.navigate('Profile'),
    },
  ]}
/>
```

### 3. **Profile** - Menu de Perfil

```tsx
<Dropdown
  variant="profile"
  trigger={
    <View style={styles.avatar}>
      <Text>👤</Text>
    </View>
  }
  items={[
    {
      id: 'settings',
      label: 'Configurações',
      onPress: handleSettings,
    },
    {
      id: 'logout',
      label: 'Sair',
      onPress: handleLogout,
      destructive: true,
    },
  ]}
/>
```

## 🎨 Exemplos Avançados

### Com Ícones

```tsx
import { Settings, LogOut, User } from '@/icons';

<Dropdown
  trigger={<Button variant="ghost">Perfil</Button>}
  items={[
    {
      id: 'profile',
      label: 'Meu Perfil',
      icon: User,
      onPress: handleProfile,
    },
    {
      id: 'settings',
      label: 'Configurações',
      icon: Settings,
      onPress: handleSettings,
    },
    {
      id: 'logout',
      label: 'Sair',
      icon: LogOut,
      onPress: handleLogout,
      destructive: true,
    },
  ]}
/>
```

### Com Itens Desabilitados

```tsx
<Dropdown
  trigger={<Button variant="secondary">Ações</Button>}
  items={[
    {
      id: 'edit',
      label: 'Editar',
      onPress: handleEdit,
    },
    {
      id: 'delete',
      label: 'Excluir',
      onPress: handleDelete,
      disabled: !canDelete,
    },
  ]}
/>
```

### Posicionamento Customizado

```tsx
<Dropdown
  trigger={<Button variant="subtle">Menu</Button>}
  items={menuItems}
  position="top"
/>
```

### Dropdown Desabilitado

```tsx
<Dropdown
  trigger={<Button variant="secondary">Menu</Button>}
  items={menuItems}
  disabled={!isAuthenticated}
/>
```

## 🔧 Props Interface

```typescript
interface DropdownProps {
  variant?: 'default' | 'menu' | 'profile';
  trigger: ReactNode;
  items: DropdownItem[];
  position?: 'top' | 'bottom';
  testID?: string;
  disabled?: boolean;
}

interface DropdownItem {
  id: string;
  label: string;
  onPress: () => void;
  icon?: React.ComponentType<{ size: number; color: string }>;
  disabled?: boolean;
  destructive?: boolean;
}
```

## 📋 Props Detalhadas

### `variant`
- **Tipo**: `'default' | 'menu' | 'profile'`
- **Padrão**: `'default'`
- **Descrição**: Define o estilo visual do dropdown

### `trigger`
- **Tipo**: `ReactNode`
- **Obrigatório**: ✅
- **Descrição**: Elemento que abre o dropdown quando clicado

### `items`
- **Tipo**: `DropdownItem[]`
- **Obrigatório**: ✅
- **Descrição**: Array de itens do menu

### `position`
- **Tipo**: `'top' | 'bottom'`
- **Padrão**: `'bottom'`
- **Descrição**: Posição do menu em relação ao trigger

### `testID`
- **Tipo**: `string`
- **Descrição**: ID para testes automatizados

### `disabled`
- **Tipo**: `boolean`
- **Padrão**: `false`
- **Descrição**: Desabilita a interação com o dropdown

## ♿ Acessibilidade

### Automática
- **Role**: `button` (trigger), `menuitem` (items)
- **AccessibilityLabel**: Descrições claras
- **AccessibilityState**: `expanded`, `disabled`
- **AccessibilityHint**: Contexto da ação

### Suporte a Screen Readers
- Anuncia estado aberto/fechado
- Anuncia itens desabilitados
- Navegação por teclado (web)

## 🎭 Comportamento

### Abertura/Fechamento
- Clique no trigger abre/fecha
- Clique fora fecha automaticamente
- Seleção de item fecha o menu
- Modal transparente para overlay

### Animações
- Fade in/out suave
- Transições de 200ms
- Feedback visual em press

### Estados
- Normal
- Pressed (feedback visual)
- Disabled (opacity 50%)
- Open/Closed

## 🧪 Testando

```tsx
import { render, fireEvent } from '@testing-library/react-native';
import { Dropdown } from '@/components/ui/dropdown';

test('deve abrir dropdown ao clicar no trigger', () => {
  const items = [
    { id: '1', label: 'Item 1', onPress: jest.fn() },
  ];

  const { getByTestID, getByText } = render(
    <Dropdown
      testID="dropdown"
      trigger={<Text>Menu</Text>}
      items={items}
    />
  );

  fireEvent.press(getByText('Menu'));
  expect(getByTestID('dropdown-modal')).toBeTruthy();
});

test('deve chamar onPress ao selecionar item', () => {
  const handlePress = jest.fn();
  const items = [
    { id: '1', label: 'Item 1', onPress: handlePress },
  ];

  const { getByText } = render(
    <Dropdown trigger={<Text>Menu</Text>} items={items} />
  );

  fireEvent.press(getByText('Menu'));
  fireEvent.press(getByText('Item 1'));

  expect(handlePress).toHaveBeenCalledTimes(1);
});
```

## 📱 Compatibilidade

- ✅ iOS 11+
- ✅ Android API 21+
- ✅ Expo SDK 49+
- ✅ React Native 0.72+
- ✅ Screen Readers

## 🎨 Design Tokens

Todos os estilos utilizam exclusivamente tokens do Arena Design System:

- **Cores**: `ArenaColors.*`
- **Espaçamento**: `ArenaSpacing.*`
- **Tipografia**: `ArenaTypography.*`
- **Bordas**: `ArenaBorders.*`
- **Sombras**: `ArenaShadows.*`

## 💡 Boas Práticas

### ✅ Fazer
- Usar labels descritivos nos itens
- Agrupar ações relacionadas
- Usar ícones para melhor UX
- Limitar a 7-10 itens por menu

### ❌ Evitar
- Menus muito longos (usar scroll se necessário)
- Ações críticas sem confirmação
- Labels genéricos ("Opção 1", "Item 2")
- Dropdown em áreas pequenas

## 🔄 Versionamento

**v1.0.0** - Versão inicial
