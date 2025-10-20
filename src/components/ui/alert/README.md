# Alert Component

Componente de alerta modal do Arena Design System. **NUNCA use `Alert.alert` do React Native diretamente** - sempre use o `useAlert` hook do `AlertContext`.

## 📋 Uso via Context (OBRIGATÓRIO)

```tsx
import { useAlert } from '@/contexts/AlertContext';

function MyScreen() {
  const { showError, showSuccess, showConfirm } = useAlert();

  const handleError = () => {
    showError('Não foi possível salvar os dados');
  };

  const handleSuccess = () => {
    showSuccess('Dados salvos com sucesso!');
  };

  const handleDelete = () => {
    showConfirm({
      title: 'Confirmar exclusão',
      message: 'Tem certeza que deseja excluir este item?',
      confirmText: 'Excluir',
      cancelText: 'Cancelar',
      destructive: true,
      onConfirm: () => {
        // Executar exclusão
      },
    });
  };

  return (
    // ...
  );
}
```

## 🎨 Variants

### Success
```tsx
showSuccess('Operação concluída com sucesso!');
```

### Error
```tsx
showError('Erro ao processar solicitação');
```

### Warning
```tsx
showWarning('Atenção: Esta ação não pode ser desfeita');
```

### Info
```tsx
showInfo('Atualize o aplicativo para a versão mais recente');
```

### Confirm
```tsx
showConfirm({
  title: 'Confirmar ação',
  message: 'Deseja continuar?',
  onConfirm: () => console.log('Confirmado'),
  onCancel: () => console.log('Cancelado'),
});
```

## 🎯 API do useAlert Hook

### Métodos Simples

```typescript
showSuccess(message: string, onConfirm?: () => void): void;
showError(message: string, onRetry?: () => void): void;
showWarning(message: string, onConfirm?: () => void): void;
showInfo(message: string, onConfirm?: () => void): void;
```

### Método Confirm

```typescript
showConfirm(config: ConfirmConfig): void;

interface ConfirmConfig {
  title: string;
  message: string;
  confirmText?: string;      // Default: "Confirmar"
  cancelText?: string;        // Default: "Cancelar"
  onConfirm: () => void;
  onCancel?: () => void;
  destructive?: boolean;      // Se true, botão confirmar fica vermelho
}
```

### Método Avançado

```typescript
showAlert(config: AlertConfig): void;

interface AlertConfig {
  variant: 'success' | 'error' | 'warning' | 'info' | 'confirm';
  title: string;
  message: string;
  primaryButton: {
    text: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'destructive';
  };
  secondaryButton?: {
    text: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'destructive';
  };
  dismissible?: boolean;      // Default: true
}
```

## ✅ Boas Práticas

### ✅ CORRETO

```tsx
import { useAlert } from '@/contexts/AlertContext';

const { showError } = useAlert();

try {
  await saveData();
} catch (error) {
  showError(error.message);
}
```

### ❌ ERRADO - ESLint vai bloquear!

```tsx
import { Alert } from 'react-native';

Alert.alert('Erro', 'Mensagem');  // ❌ PROIBIDO!
```

## 🎨 Tokens Arena Utilizados

- **Cores**: `ArenaColors.semantic.*`, `ArenaColors.brand.primary`
- **Espaçamento**: `ArenaSpacing['2xl']`, `ArenaSpacing.lg`, `ArenaSpacing.md`
- **Tipografia**: `ArenaTypography.size.lg/md`, `ArenaTypography.weight.bold/regular`
- **Borders**: `ArenaBorders.radius.lg`
- **Shadows**: `ArenaShadows.xl`

## 🔧 Recursos

- ✅ Animação suave com Reanimated
- ✅ Haptic feedback em todos os botões
- ✅ Backdrop dismissible (configurável)
- ✅ 1 ou 2 botões
- ✅ Ícones contextuais por variant
- ✅ Acessibilidade completa
- ✅ TypeScript strict mode

## 📱 Acessibilidade

- ✅ `accessibilityRole="alert"`
- ✅ `accessibilityLabel` em todos os elementos
- ✅ Contraste WCAG AAA
- ✅ Touch targets ≥44px
- ✅ Screen reader support

## 🚫 Regras ESLint

A regra `arena/arena-use-alert-context` bloqueia:
- `Alert.alert` do React Native
- `alert()` do browser
- Imports de `Alert` de `'react-native'`

**Mensagem de erro:**
```
Uso direto de Alert.alert é proibido. Use o hook useAlert() do AlertContext.
Exemplo: const { showError } = useAlert(); showError('Mensagem');
```
