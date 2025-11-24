# MenuDrawer Component

Componente de menu lateral (drawer) que desliza da esquerda, fornecendo navegação para seções secundárias do app (Amigos, Grupos, Notificações, Configurações).

## 📋 Overview

O `MenuDrawer` é um componente modal com animação de slide-in da esquerda, seguindo os padrões Arena de design e animações suaves com React Native Reanimated.

## 🎨 Variantes

N/A - Componente único.

## 📐 Props

```typescript
interface MenuDrawerProps {
  isOpen: boolean;          // Estado de abertura do drawer
  onClose: () => void;      // Callback ao fechar
  testID?: string;          // ID para testes
}
```

## 🚀 Uso

```tsx
import { MenuDrawer } from '@/components/ui/menuDrawer';

const MyScreen = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <Button onPress={() => setIsDrawerOpen(true)}>
        Abrir Menu
      </Button>

      <MenuDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  );
};
```

## 🎯 Features

- ✅ Animação suave de slide-in/out (React Native Reanimated)
- ✅ Overlay semi-transparente com fade
- ✅ Header com avatar, nome e email do usuário
- ✅ Badges nos itens (contadores de amigos, grupos, notificações)
- ✅ Navegação para telas secundárias
- ✅ Ação de logout
- ✅ Suporte a Safe Area (iOS/Android)
- ✅ Pressable com feedback visual

## 📱 Menu Items

| Item                 | Ícone           | Badge                  | Ação                       |
|----------------------|-----------------|------------------------|----------------------------|
| Amigos               | people          | totalFriends           | Navega para FriendsTab     |
| Grupos               | people-circle   | totalGroups            | Navega para GroupsTab      |
| Notificações         | notifications   | totalInvites           | Navega para NotificationsTab|
| Configurações        | settings        | -                      | Navega para SettingsTab    |
| Ajuda & Suporte      | help-circle     | -                      | Navega para HelpTab        |
| Termos & Privacidade | document-text   | -                      | Navega para TermsTab       |
| Sair                 | log-out         | -                      | Executa signOut()          |

## 🎨 Design Tokens

- **Cores**: `ArenaColors.neutral.darkest` (background), `ArenaColors.neutral.dark` (divider)
- **Espaçamento**: `ArenaSpacing.lg`, `ArenaSpacing.md`, `ArenaSpacing.sm`
- **Animação**: Spring (damping: 20, stiffness: 90) + Timing (200ms fade)

## 🔒 Regras

1. **SEMPRE** usar estado `isOpen` para controle
2. **SEMPRE** fornecer callback `onClose`
3. **NUNCA** usar diretamente - sempre através de state management
4. Drawer width: 80% da tela (max: 320px)
5. Overlay fecha o drawer ao clicar fora

## ♿ Acessibilidade

- Modal com `onRequestClose` (Android back button)
- `testID` para todos os itens do menu
- Feedback visual (pressed state) em todos os itens

## 🧪 Testing

```tsx
const { getByTestId } = render(
  <MenuDrawer isOpen={true} onClose={mockClose} />
);

fireEvent.press(getByTestId('menu-friends'));
expect(mockNavigate).toHaveBeenCalledWith('FriendsTab');
```

## 📦 Dependencies

- `react-native-reanimated` - Animações
- `react-native-safe-area-context` - Safe area
- `@react-navigation/native` - Navegação
- `@expo/vector-icons/Ionicons` - Ícones

## 🔗 Related

- [Text](../text/README.md)
- [Badge](../badge/README.md)
- [Button](../button/README.md)
