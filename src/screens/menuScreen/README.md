# MenuScreen

## Descrição

Tela de menu do aplicativo Arena, acessível via BottomTabNavigator. Exibe informações do usuário e lista de opções de navegação e ações.

## Funcionalidades

- Exibição de avatar, nome e email do usuário
- Navegação para telas secundárias (Amigos, Grupos, Notificações, Configurações, Ajuda, Termos)
- Badges com contadores (amigos, grupos, notificações)
- Ação de logout
- Divisores visuais entre seções

## Estrutura

```
menuScreen/
├── index.tsx              # Componente principal
├── useMenuScreen.ts       # Hook com lógica de negócio
├── stylesMenuScreen.ts    # Estilos da tela
├── typesMenuScreen.ts     # Tipos TypeScript
└── README.md              # Documentação
```

## Uso

```tsx
import { MenuScreen } from '@/screens/menuScreen';

// Usado no BottomTabNavigator via MenuStack
<Stack.Screen name="Menu" component={MenuScreen} />
```

## Hook

```typescript
const {
  menuItems,        // Lista de itens do menu
  handleItemPress,  // Handler de clique nos itens
  userName,         // Nome completo do usuário
  userEmail,        // Email do usuário
  userAvatar        // URL do avatar (ou null)
} = useMenuScreen();
```

## Menu Items

1. **Amigos** - Badge com totalFriends → Navigate to Friends
2. **Grupos** - Badge com totalGroups → Navigate to GroupsList
3. **Notificações** - Badge com totalInvites → Navigate to Notifications
4. **Divider**
5. **Configurações** → Navigate to Settings
6. **Ajuda & Suporte** → Navigate to Help
7. **Termos & Privacidade** → Navigate to Terms
8. **Divider**
9. **Sair** (vermelho) → signOut()

## Estilos

- Background: `ArenaColors.neutral.darkest`
- Header com border bottom
- Menu items com efeito pressed
- Badges com `ArenaColors.brand.primary`
- Item "Sair" com cor `ArenaColors.semantic.error`

## TestIDs

- `menu-screen` - Container principal
- `menu-friends` - Item Amigos
- `menu-groups` - Item Grupos
- `menu-notifications` - Item Notificações
- `menu-settings` - Item Configurações
- `menu-help` - Item Ajuda & Suporte
- `menu-terms` - Item Termos & Privacidade
- `menu-logout` - Item Sair
