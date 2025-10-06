# AppLayout Component

Layout base para todas as telas autenticadas (pós-login) do aplicativo Arena.

## Características

- **Header Superior**: Exibe o Header com logo e menu de navegação
- **Área de Conteúdo**: Espaço principal flexível para conteúdo da tela
- **Navegação Inferior (Futura)**: Preparado para adicionar bottom navigation
- **Layout Consistente**: Garante que todas as telas tenham a mesma estrutura base

## Uso Básico

```tsx
import { AppLayout } from '@/components/AppLayout';

const MyScreen = ({ navigation }) => {
  const handleLogout = () => {
    // Lógica de logout
  };

  return (
    <AppLayout onLogout={handleLogout}>
      <View>
        {/* Conteúdo da tela */}
      </View>
    </AppLayout>
  );
};
```

## Com Bottom Navigation (Futuro)

```tsx
<AppLayout onLogout={handleLogout} showBottomNav>
  <View>
    {/* Conteúdo da tela */}
  </View>
</AppLayout>
```

## Props

| Prop           | Tipo       | Obrigatório | Padrão  | Descrição                                    |
| -------------- | ---------- | ----------- | ------- | -------------------------------------------- |
| children       | ReactNode  | Sim         | -       | Conteúdo principal da tela                   |
| onLogout       | () => void | Não         | -       | Callback para ação de logout                 |
| showBottomNav  | boolean    | Não         | `false` | Exibe navegação inferior (futuro)            |
| testID         | string     | Não         | -       | ID para testes                               |

## Estrutura do Layout

```
┌─────────────────────────┐
│       Header            │ <- Logo + Menu
├─────────────────────────┤
│                         │
│                         │
│      Children           │ <- Conteúdo da tela
│      (flex: 1)          │
│                         │
│                         │
├─────────────────────────┤
│   Bottom Nav (futuro)   │ <- Navegação inferior
└─────────────────────────┘
```

## Telas que Devem Usar AppLayout

Todas as telas após o login:

- ✅ HomeScreen
- ✅ Tela de Perfil (futura)
- ✅ Tela de Feed (futura)
- ✅ Tela de Busca (futura)
- ✅ Outras telas autenticadas

## Telas que NÃO Devem Usar AppLayout

Telas de autenticação e onboarding:

- ❌ WelcomeScreen
- ❌ LoginScreen
- ❌ RegisterScreen
- ❌ OnboardingScreen

## Vantagens

1. **Consistência**: Todas as telas autenticadas têm o mesmo layout base
2. **Manutenibilidade**: Mudanças no Header/BottomNav refletem em todas as telas
3. **Reutilização**: Evita duplicação de código de layout
4. **Preparação**: Estrutura pronta para adicionar bottom navigation

## Exemplo Completo (HomeScreen)

```tsx
import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { AppLayout } from '@/components/AppLayout';
import { FilterBar } from './components/FilterBar';

export const HomeScreen = ({ navigation }) => {
  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Welcome' }],
    });
  };

  return (
    <AppLayout onLogout={handleLogout}>
      <FilterBar />

      <ScrollView>
        {/* Conteúdo da home */}
      </ScrollView>
    </AppLayout>
  );
};
```

## Customização Futura

Para adicionar bottom navigation, basta:

1. Criar componente `BottomNav`
2. Importar no AppLayout
3. Renderizar quando `showBottomNav={true}`
4. Ajustar `bottomNavPlaceholder` height nos estilos
