# Safe Area Guide - Arena Mobile

## 🎯 Visão Geral

**TODAS as telas do Arena Mobile respeitam automaticamente as áreas seguras** (safe areas) dos dispositivos via **Wrapper Global no AppNavigator**. O conteúdo **nunca** é sobreposto por notches, status bar, home indicator ou bordas arredondadas.

## 🔧 Comportamento Padrão (GLOBAL)

### 🌟 Proteção Automática via HOC

**TODAS as 32 telas** são automaticamente envolvidas por `withAndroidScreenWrapper` no `AppNavigator.tsx`, que aplica `SafeAreaView` com configuração padrão:

```tsx
// No AppNavigator.tsx
const WrappedMyScreen = withAndroidScreenWrapper(MyScreen);
// Automaticamente aplica edges={['top', 'left', 'right']}
```

### 🚨 REGRA CRÍTICA: NUNCA Adicione SafeAreaView Manualmente

**NUNCA** adicione `<SafeAreaView>` dentro de componentes de tela. A proteção é **automática** via HOC no `AppNavigator.tsx`.

```tsx
// ❌ ERRADO - SafeAreaView manual (REDUNDANTE)
export const MyScreen: React.FC = () => {
  return (
    <SafeAreaView edges={['top', 'left', 'right']}>
      <View style={styles.container}>...</View>
    </SafeAreaView>
  );
};

// ✅ CORRETO - Wrapper HOC no AppNavigator gerencia automaticamente
export const MyScreen: React.FC = () => {
  return (
    <View style={styles.container}>...</View>
  );
};
```

**Por que não incluir 'bottom'?**
- **Telas de abas**: O bottom tab bar já gerencia o bottom inset
- **Telas de stack**: A navegação gerencia o bottom inset
- **Telas com footer fixo**: Usar `useSafeAreaInsets()` para adicionar padding dinâmico

## 📦 Configurações Disponíveis

O Arena fornece constantes padronizadas via `SafeAreaEdges`:

| Configuração | Edges | Uso Recomendado |
|--------------|-------|-----------------|
| `DEFAULT` | `['top', 'left', 'right']` | Maioria das telas |
| `FULL_SCREEN` | `['top', 'bottom', 'left', 'right']` | Map, Camera, Video Player |
| `TAB_SCREEN` | `['top', 'left', 'right']` | Telas em bottom tabs |
| `MODAL` | `['top', 'left', 'right']` | Modais em geral |
| `BOTTOM_MODAL` | `['bottom', 'left', 'right']` | Bottom sheets |
| `AUTH_SCREEN` | `['top', 'left', 'right']` | Login, Register, Onboarding |
| `TOP_ONLY` | `['top']` | Casos especiais |
| `NONE` | `[]` | Controle manual completo |

## ✅ Padrões de Uso

### Padrão 1: Tela Simples (PADRÃO - 90% dos casos)

**SEMPRE usar este padrão**. O `withAndroidScreenWrapper` HOC no `AppNavigator.tsx` gerencia safe area automaticamente.

```tsx
// arquivo: src/screens/myScreen/index.tsx
import React from 'react';
import { View, FlatList } from 'react-native';
import { Text } from '@/components/ui/text';
import { styles } from './stylesMyScreen';

export const MyScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text variant="titlePrimary">Minha Tela</Text>
      <FlatList data={items} renderItem={renderItem} />
    </View>
  );
};
```

```tsx
// arquivo: src/navigation/AppNavigator.tsx
const WrappedMyScreen = withAndroidScreenWrapper(MyScreen, {
  enableScroll: false,
});
// Automaticamente aplica edges={['top', 'left', 'right']}
```

**✅ Benefícios**:
- Sem código adicional na tela
- Safe area gerenciada centralmente
- Consistência automática
- Zero chance de duplicação de SafeAreaView

### Padrão 2: Tela com Footer Fixo

**Usar**: `useSafeAreaInsets()` para padding dinâmico no footer. O wrapper HOC gerencia o top/left/right automaticamente.

```tsx
// arquivo: src/screens/myScreen/index.tsx
import React from 'react';
import { View, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/button';
import { ArenaSpacing } from '@/constants';
import { styles } from './stylesMyScreen';

export const MyScreen: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <FlatList data={items} renderItem={renderItem} />

      <View
        style={[
          styles.footer,
          { paddingBottom: ArenaSpacing.md + (insets.bottom || 0) },
        ]}
      >
        <Button variant="primary" size="lg" onPress={handleSave}>
          Salvar
        </Button>
      </View>
    </View>
  );
};
```

```tsx
// arquivo: src/navigation/AppNavigator.tsx
const WrappedMyScreen = withAndroidScreenWrapper(MyScreen, {
  enableScroll: false,
});
```

**Por que `insets.bottom || 0`?**
- Em dispositivos sem notch: `insets.bottom === 0`
- Em dispositivos com home indicator: `insets.bottom === 34` (iPhone) ou valor similar
- Garante que o botão não fique escondido sob o home indicator
- O HOC já gerencia top/left/right automaticamente

### Padrão 3: Tela com AppLayout

**REGRA**: `AppLayout` já gerencia SafeAreaView internamente. Configure `safeAreaEdges: false` no AppNavigator para evitar duplicação.

```tsx
// arquivo: src/screens/myScreen/index.tsx
import React from 'react';
import { View } from 'react-native';
import { AppLayout } from '@/components/AppLayout';
import { Text } from '@/components/ui/text';
import { styles } from './stylesMyScreen';

export const MyScreen: React.FC = () => {
  return (
    <AppLayout showHeader headerTitle="Minha Tela">
      <View style={styles.content}>
        <Text variant="bodyPrimary">Conteúdo</Text>
      </View>
    </AppLayout>
  );
};
```

```tsx
// arquivo: src/navigation/AppNavigator.tsx
const WrappedMyScreen = withAndroidScreenWrapper(MyScreen, {
  enableScroll: false,
  safeAreaEdges: false, // ← OBRIGATÓRIO para telas com AppLayout
});
```

**⚠️ CRÍTICO**: Sempre use `safeAreaEdges: false` para telas que usam `AppLayout`, caso contrário haverá duplicação de padding.

### Padrão 4: Modal com Bottom Sheet

```tsx
import React from 'react';
import { Modal, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SafeAreaEdges } from '@/constants';

export const MyModal: React.FC = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <SafeAreaView style={styles.overlay} edges={SafeAreaEdges.BOTTOM_MODAL}>
        <View style={styles.modalContainer}>
          {/* Conteúdo do modal */}
        </View>
      </SafeAreaView>
    </Modal>
  );
};
```

## 🔧 Configuração no AppNavigator (PADRÃO ATUAL)

**TODAS as 32 telas** estão configuradas no `AppNavigator.tsx` com o HOC `withAndroidScreenWrapper`. Este é o padrão ATUAL, aplicado em 100% das telas.

### Configuração Padrão (maioria das telas)

```tsx
// arquivo: src/navigation/AppNavigator.tsx
import { withAndroidScreenWrapper } from '@/hocs/withAndroidScreenWrapper';
import { MyScreen } from '@/screens/myScreen';

const WrappedMyScreen = withAndroidScreenWrapper(MyScreen, {
  enableScroll: false,
});
// Automaticamente aplica edges={['top', 'left', 'right']}

<Stack.Screen name="MyScreen" component={WrappedMyScreen} />
```

### Configuração para Telas com AppLayout

Telas que usam `AppLayout` internamente **DEVEM** ter `safeAreaEdges: false` para evitar duplicação:

```tsx
// arquivo: src/navigation/AppNavigator.tsx
import { withAndroidScreenWrapper } from '@/hocs/withAndroidScreenWrapper';
import { ProfileScreen } from '@/screens/profileScreen';

const WrappedProfileScreen = withAndroidScreenWrapper(ProfileScreen, {
  safeAreaEdges: false, // ← OBRIGATÓRIO para AppLayout
});

<Stack.Screen name="Profile" component={WrappedProfileScreen} />
```

**Telas que usam AppLayout** (16 telas):
- CreateEventScreen
- EventDetailsScreen
- GroupDetailsScreen
- ProfileScreen
- EditProfileScreen
- NotificationsScreen
- FriendsScreen
- GroupsListScreen
- SettingsScreen
- HelpScreen
- TermsScreen
- PrivacyPolicyScreen
- DeleteAccountScreen
- (+ 3 telas no BottomTabNavigator: HomeScreen, ExploreScreen, EventsScreen)

### Configuração para Modais

```tsx
// arquivo: src/navigation/AppNavigator.tsx
const WrappedFilterScreen = withAndroidScreenWrapper(FilterScreen, {
  enableScroll: false,
  safeAreaEdges: 'MODAL', // Opcional, usa DEFAULT se não especificado
});

<Stack.Screen
  name="FilterScreen"
  component={WrappedFilterScreen}
  options={{ presentation: 'modal' }}
/>
```

## 📏 Valores de bottomOffset Recomendados

Para `ArenaKeyboardAwareScrollView`:

| Tipo de Tela | bottomOffset | Justificativa |
|--------------|--------------|---------------|
| Sem footer fixo | `60` | Espaço padrão entre input e teclado |
| Com footer fixo | `100` | Espaço adicional para botões |
| Modais complexos | `120` | Múltiplos botões ou elementos |

**Nota**: No iOS, `bottomOffset` é ignorado pois `automaticallyAdjustKeyboardInsets` calcula automaticamente.

## ❌ O Que NÃO Fazer

### 1. Nunca Duplicar SafeAreaView

```tsx
// ❌ ERRADO - Dupla safe area causa padding excessivo
<SafeAreaView edges={['top', 'left', 'right']}>
  <AppLayout> {/* AppLayout já tem SafeAreaView */}
    <View style={styles.content}>...</View>
  </AppLayout>
</SafeAreaView>
```

```tsx
// ✅ CORRETO
<AppLayout>
  <View style={styles.content}>...</View>
</AppLayout>
```

### 2. Nunca Hardcoded Insets

```tsx
// ❌ ERRADO - Valor fixo não funciona em todos os devices
<View style={{ paddingBottom: 34 }}>
  <Button>Salvar</Button>
</View>
```

```tsx
// ✅ CORRETO - Valor dinâmico
const insets = useSafeAreaInsets();
<View style={{ paddingBottom: ArenaSpacing.md + (insets.bottom || 0) }}>
  <Button>Salvar</Button>
</View>
```

### 3. Nunca Omitir SafeAreaView em Telas Standalone

```tsx
// ❌ ERRADO - Conteúdo pode ficar sob notch
export const MyScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <FlatList data={items} renderItem={renderItem} />
    </View>
  );
};
```

```tsx
// ✅ CORRETO
export const MyScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        <FlatList data={items} renderItem={renderItem} />
      </View>
    </SafeAreaView>
  );
};
```

## 🧪 Checklist de Testes

Testar em simuladores/dispositivos com:

### Dispositivos de Teste Obrigatórios

- [ ] **iPhone 14 Pro** - Notch + home indicator
- [ ] **iPhone SE** - Sem notch, botão físico
- [ ] **Android com notch** - Samsung S10+, Pixel 5
- [ ] **Android sem notch** - Dispositivos antigos

### Verificações por Tela

- [ ] **Top edge**: Conteúdo não sobrepõe status bar/notch
- [ ] **Left/Right edges**: Conteúdo não é cortado em bordas arredondadas
- [ ] **Bottom edge** (full screen apenas): Conteúdo não sobrepõe home indicator
- [ ] **Tab screens**: Bottom tab bar visível e acessível
- [ ] **Modais**: Espaçamento correto das bordas
- [ ] **Footer fixo**: Botões não ficam sob home indicator
- [ ] **Keyboard**: Input não fica escondido sob teclado

## 📚 Referências

- [React Native Safe Area Context Docs](https://github.com/th3rdwave/react-native-safe-area-context)
- [CLAUDE.md](./CLAUDE.md) - Regras gerais do Arena
- [ArenaKeyboardAwareScrollView Guide](./CLAUDE.md#%EF%B8%8F-keyboard-handling---arenakeyboardawarescrollview) - Gerenciamento de teclado

## 🆘 Troubleshooting

### Problema: Conteúdo ainda fica sob notch

**Solução**: Verificar se a tela tem SafeAreaView com edges corretos.

```tsx
// Adicionar SafeAreaView
<SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
  {/* conteúdo */}
</SafeAreaView>
```

### Problema: Botão do footer fica escondido

**Solução**: Usar `useSafeAreaInsets()` para adicionar padding dinâmico.

```tsx
const insets = useSafeAreaInsets();

<View style={[styles.footer, { paddingBottom: ArenaSpacing.md + (insets.bottom || 0) }]}>
  <Button>Salvar</Button>
</View>
```

### Problema: Padding excessivo (dobrado)

**Solução**: Verificar se não há SafeAreaView duplicado.

```tsx
// Se usar AppLayout, NÃO adicionar SafeAreaView adicional
<AppLayout>
  {/* Não adicionar <SafeAreaView> aqui */}
  <View style={styles.content}>...</View>
</AppLayout>
```

### Problema: Edges não funciona no Android

**Solução**: A biblioteca `react-native-safe-area-context` requer configuração no `MainActivity.java` (Android) e `AppDelegate.mm` (iOS). Verificar se está configurada corretamente.

---

**Última atualização**: 2025-12-08
**Versão**: 1.0.0
