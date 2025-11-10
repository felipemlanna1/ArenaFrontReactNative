# ArenaKeyboardAwareScrollView

Wrapper customizado para gerenciar o teclado de forma otimizada em iOS e Android.

## 🎯 Objetivo

Este componente resolve problemas de plataforma com gerenciamento de teclado:
- **iOS**: Usa `ScrollView` nativo com `automaticallyAdjustKeyboardInsets={true}` (solução nativa e estável)
- **Android**: Usa `KeyboardAwareScrollView` da lib `react-native-keyboard-controller` (funciona perfeitamente)

## 🚀 Uso

```tsx
import { ArenaKeyboardAwareScrollView } from '@/components/ui/arenaKeyboardAwareScrollView';

<ArenaKeyboardAwareScrollView
  contentContainerStyle={styles.scrollContent}
  showsVerticalScrollIndicator={false}
  keyboardShouldPersistTaps="handled"
  bottomOffset={60}
>
  <Input label="Nome" value={name} onChangeText={setName} />
  <Input label="Email" value={email} onChangeText={setEmail} />
</ArenaKeyboardAwareScrollView>
```

## 📋 Props

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `children` | `ReactNode` | - | Conteúdo do scroll |
| `contentContainerStyle` | `StyleProp<ViewStyle>` | - | Estilos do container de conteúdo |
| `showsVerticalScrollIndicator` | `boolean` | `false` | Exibir indicador de scroll |
| `keyboardShouldPersistTaps` | `'always' \| 'never' \| 'handled'` | `'handled'` | Comportamento de toque com teclado aberto |
| `bottomOffset` | `number` | `60` | Espaço entre input e teclado (apenas Android) |
| `testID` | `string` | - | ID para testes |

## 🔧 bottomOffset - Valores Recomendados

- **60px**: Telas sem footer fixo (RegisterScreen, LoginScreen)
- **100px**: Telas com footer fixo (EditProfileScreen, FilterScreen)
- **120px**: Modais complexos com múltiplos botões (SelectionModal, FilterModal)

**Nota**: No iOS, `bottomOffset` é ignorado pois `automaticallyAdjustKeyboardInsets` calcula automaticamente o espaço necessário.

## ✅ Benefícios

1. **Cross-platform**: Comportamento idêntico em iOS e Android
2. **iOS estável**: Usa solução nativa sem bugs conhecidos
3. **Android otimizado**: Usa lib testada e funcional
4. **Simples**: API única para ambas plataformas
5. **Mantível**: Centraliza lógica de plataforma em um componente

## 🚫 Regras

- **NUNCA** use `KeyboardAwareScrollView` diretamente
- **SEMPRE** use `ArenaKeyboardAwareScrollView` para telas com inputs
- **SEMPRE** defina `keyboardShouldPersistTaps="handled"`
- Use `bottomOffset` apropriado para o tipo de tela

## 🔍 Implementação Interna

### iOS
```tsx
<ScrollView
  automaticallyAdjustKeyboardInsets={true}
  keyboardDismissMode="interactive"
  keyboardShouldPersistTaps="handled"
>
  {children}
</ScrollView>
```

### Android
```tsx
<KeyboardAwareScrollView
  disableScrollOnKeyboardHide={false}
  bottomOffset={60}
  keyboardShouldPersistTaps="handled"
>
  {children}
</KeyboardAwareScrollView>
```

## 📚 Contexto Técnico

### Por que não usar KeyboardAwareScrollView em ambos?

A lib `react-native-keyboard-controller` tem um **bug conhecido no iOS** (Issue #338) onde o scroll não funciona no primeiro launch após instalação. Funciona apenas após reload do app.

### Por que automaticallyAdjustKeyboardInsets no iOS?

É a solução nativa do React Native que:
- Funciona perfeitamente com a New Architecture
- Não tem bugs conhecidos
- Calcula automaticamente o espaço necessário
- Usa iOS Keyboard Layout Guide (iOS 15+)

## 🧪 Testes

```tsx
import { render } from '@testing-library/react-native';
import { ArenaKeyboardAwareScrollView } from '@/components/ui/arenaKeyboardAwareScrollView';

it('should render children', () => {
  const { getByText } = render(
    <ArenaKeyboardAwareScrollView>
      <Text>Test Content</Text>
    </ArenaKeyboardAwareScrollView>
  );
  expect(getByText('Test Content')).toBeTruthy();
});
```
