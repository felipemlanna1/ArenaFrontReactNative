# Header - Arena Component

Componente de cabeçalho global e reutilizável para exibir em todas as páginas após o usuário estar autenticado. Inclui logo, menu de navegação e dropdown de perfil.

## 🎯 Quando Usar

- Tela principal após login
- Todas as telas autenticadas
- Dashboard e home screens
- Aplicações multi-página com navegação persistente

## 🚀 Uso Básico

```tsx
import { Header } from '@/components/header';

export const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Header userName="João Silva" />
      {/* Conteúdo da página */}
    </View>
  );
};
```

## 🎨 Exemplos

### Header Completo (Padrão)

```tsx
<Header
  showLogo={true}
  showMenu={true}
  showProfile={true}
  userName="João Silva"
  onLogoPress={() => navigation.navigate('Home')}
/>
```

### Header Sem Menu

```tsx
<Header
  showMenu={false}
  userName="Maria Santos"
/>
```

### Header Apenas com Logo

```tsx
<Header
  showMenu={false}
  showProfile={false}
/>
```

### Header com Itens de Menu Customizados

```tsx
import { Home, Search, Bell } from '@/icons';

const customMenuItems = [
  {
    id: 'home',
    label: 'Início',
    icon: Home,
    onPress: () => navigation.navigate('Home'),
  },
  {
    id: 'search',
    label: 'Buscar',
    icon: Search,
    onPress: () => navigation.navigate('Search'),
  },
  {
    id: 'notifications',
    label: 'Notificações',
    icon: Bell,
    onPress: () => navigation.navigate('Notifications'),
  },
];

<Header menuItems={customMenuItems} userName="João Silva" />
```

### Header com Itens de Perfil Customizados

```tsx
import { User, Settings, LogOut } from '@/icons';

const customProfileItems = [
  {
    id: 'profile',
    label: 'Meu Perfil',
    icon: User,
    onPress: () => navigation.navigate('Profile'),
  },
  {
    id: 'settings',
    label: 'Configurações',
    icon: Settings,
    onPress: () => navigation.navigate('Settings'),
  },
  {
    id: 'logout',
    label: 'Sair',
    icon: LogOut,
    onPress: handleLogout,
    destructive: true,
  },
];

<Header profileItems={customProfileItems} userName="Maria Santos" />
```

### Integração com React Navigation

```tsx
import { Header } from '@/components/header';
import { useAuth } from '@/contexts/AuthContext';

export const HomeScreen = ({ navigation }) => {
  const { user, logout } = useAuth();

  const handleLogoPress = () => {
    navigation.navigate('Home');
  };

  const customProfileItems = [
    {
      id: 'profile',
      label: 'Meu Perfil',
      onPress: () => navigation.navigate('Profile'),
    },
    {
      id: 'settings',
      label: 'Configurações',
      onPress: () => navigation.navigate('Settings'),
    },
    {
      id: 'logout',
      label: 'Sair',
      onPress: logout,
      destructive: true,
    },
  ];

  return (
    <View style={styles.container}>
      <Header
        userName={user.name}
        onLogoPress={handleLogoPress}
        profileItems={customProfileItems}
      />
      <ScrollView>{/* Conteúdo */}</ScrollView>
    </View>
  );
};
```

### Header em Layout Global

```tsx
import { Header } from '@/components/header';

export const AuthenticatedLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Header
        userName={user.name}
        onLogoPress={() => navigation.navigate('Home')}
        profileItems={[
          {
            id: 'profile',
            label: 'Meu Perfil',
            onPress: () => navigation.navigate('Profile'),
          },
          {
            id: 'logout',
            label: 'Sair',
            onPress: logout,
            destructive: true,
          },
        ]}
      />
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
};

export const HomeScreen = () => {
  return (
    <AuthenticatedLayout>
      <Text>Conteúdo da Home</Text>
    </AuthenticatedLayout>
  );
};
```

## 🔧 Props Interface

```typescript
interface HeaderProps {
  showLogo?: boolean;
  showMenu?: boolean;
  showProfile?: boolean;
  menuItems?: DropdownItem[];
  profileItems?: DropdownItem[];
  onLogoPress?: () => void;
  userName?: string;
  userAvatar?: string;
  testID?: string;
}
```

## 📋 Props Detalhadas

### `showLogo`
- **Tipo**: `boolean`
- **Padrão**: `true`
- **Descrição**: Exibe o logo da Arena no header

### `showMenu`
- **Tipo**: `boolean`
- **Padrão**: `true`
- **Descrição**: Exibe o menu dropdown de navegação

### `showProfile`
- **Tipo**: `boolean`
- **Padrão**: `true`
- **Descrição**: Exibe o dropdown de perfil do usuário

### `menuItems`
- **Tipo**: `DropdownItem[]`
- **Opcional**: ✅
- **Descrição**: Itens customizados para o menu (sobrescreve padrão)

### `profileItems`
- **Tipo**: `DropdownItem[]`
- **Opcional**: ✅
- **Descrição**: Itens customizados para o perfil (sobrescreve padrão)

### `onLogoPress`
- **Tipo**: `() => void`
- **Opcional**: ✅
- **Descrição**: Callback ao clicar no logo

### `userName`
- **Tipo**: `string`
- **Padrão**: `'Usuário'`
- **Descrição**: Nome do usuário para exibir no perfil

### `userAvatar`
- **Tipo**: `string`
- **Opcional**: ✅
- **Descrição**: URL do avatar do usuário (em desenvolvimento)

### `testID`
- **Tipo**: `string`
- **Padrão**: `'header'`
- **Descrição**: ID para testes automatizados

## 🎨 Itens Padrão

### Menu Padrão
1. **Início** - Navega para Home
2. **Explorar** - Navega para Explore
3. **Notificações** - Navega para Notifications

### Perfil Padrão
1. **Meu Perfil** - Navega para Profile
2. **Configurações** - Navega para Settings
3. **Sair** - Ação de logout (destructive)

## ♿ Acessibilidade

### Automática
- **Roles**: `button` para logo e triggers
- **Labels**: Descritivos para cada elemento
- **Hints**: Contexto de ação clara
- **States**: Expanded/collapsed nos dropdowns

### Screen Readers
- Anuncia nome do usuário
- Navegação clara entre elementos
- Feedback de estado dos menus

## 🎭 Comportamento

### Logo
- Clicável
- Navega para home por padrão
- Pode ser customizado via `onLogoPress`

### Menu Dropdown
- Abre ao clicar
- Fecha ao selecionar item
- Fecha ao clicar fora

### Perfil Dropdown
- Exibe avatar com iniciais
- Menu com opções de perfil
- Logout destacado como ação destrutiva

## 🧪 Testando

```tsx
import { render, fireEvent } from '@testing-library/react-native';
import { Header } from '@/components/header';

test('deve chamar onLogoPress ao clicar no logo', () => {
  const handleLogoPress = jest.fn();

  const { getByTestID } = render(
    <Header onLogoPress={handleLogoPress} />
  );

  fireEvent.press(getByTestID('header-logo'));
  expect(handleLogoPress).toHaveBeenCalledTimes(1);
});

test('deve exibir nome do usuário', () => {
  const { getByText } = render(
    <Header userName="João Silva" />
  );

  expect(getByText('João Silva')).toBeTruthy();
});

test('deve abrir menu ao clicar', () => {
  const { getByTestID } = render(<Header />);

  fireEvent.press(getByTestID('header-menu-dropdown'));
  expect(getByTestID('header-menu-dropdown-modal')).toBeTruthy();
});
```

## 📱 Compatibilidade

- ✅ iOS 11+
- ✅ Android API 21+
- ✅ Expo SDK 49+
- ✅ React Native 0.72+
- ✅ Screen Readers
- ✅ Safe Area (iOS)

## 🎨 Design Tokens

Usa exclusivamente tokens Arena:

- **Cores**: `ArenaColors.*`
- **Espaçamento**: `ArenaSpacing.*`
- **Bordas**: `ArenaBorders.*`
- **Sombras**: `ArenaShadows.*`

## 💡 Boas Práticas

### ✅ Fazer
- Usar em todas as telas autenticadas
- Customizar itens conforme necessidade
- Integrar com sistema de navegação
- Passar userName do contexto de auth

### ❌ Evitar
- Múltiplos headers na mesma tela
- Muitos itens no menu (limite 5-7)
- Ações críticas sem confirmação
- Hardcode de valores

## 🔄 Versionamento

**v1.0.0** - Versão inicial com Dropdown integrado
