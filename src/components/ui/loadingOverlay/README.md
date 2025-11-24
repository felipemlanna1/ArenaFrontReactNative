# LoadingOverlay

**Task #24: Loading States Globais** - Sistema unificado de loading baseado em tempo esperado e criticidade.

## 📋 Quando Usar

### 1. Ações Rápidas (< 2s esperado)

**Padrão**: Loading inline no botão (Button component já suporta)

```tsx
<Button
  variant="primary"
  onPress={handleAddFriend}
  loading={isLoading} // Spinner substituindo ícone + texto "Processando..." + disabled
>
  Adicionar Amigo
</Button>
```

**Exemplos**: Adicionar amigo, dar like, participar de evento

**UX**: Não bloqueia tela, feedback imediato, usuário mantém contexto

---

### 2. Ações Médias (2-5s esperado)

**Padrão**: Loading inline + backdrop translúcido

```tsx
import { LoadingOverlay } from '@/components/ui/loadingOverlay';

<View style={styles.container}>
  {/* Seu conteúdo aqui */}
  <Button
    variant="primary"
    onPress={handleCreateEvent}
    loading={isCreating}
  >
    Criar Evento
  </Button>

  <LoadingOverlay
    visible={isCreating}
    mode="backdrop"
    message="Criando evento..."
  />
</View>
```

**Exemplos**: Criar evento, upload de foto (< 5s)

**UX**: Bloqueia interação mas mantém contexto visual do formulário

---

### 3. Ações Longas (> 5s esperado)

**Padrão**: Overlay full-screen com progress bar (opcional)

```tsx
<LoadingOverlay
  visible={isProcessing}
  mode="fullscreen"
  message="Processando pagamento..."
  progress={uploadProgress} // 0-100 (opcional)
  onCancel={handleCancel} // Botão "Cancelar" (opcional)
/>
```

**Exemplos**: Processar pagamento, sincronizar dados, upload de vídeo

**UX**: Foco total na operação, progress bar mostra andamento

**Timeout**: Após 10s mostrar toast "Isso está demorando mais que o normal" com botão "Cancelar"

---

## 🎨 Props

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `visible` | `boolean` | - | **Required** - Controla visibilidade do overlay |
| `mode` | `'backdrop' \| 'fullscreen' \| 'overlay'` | `'overlay'` | Modo de exibição conforme duração esperada |
| `message` | `string` | `'Carregando...'` | Texto de feedback (ex: "Criando evento...") |
| `progress` | `number` | `undefined` | Progresso 0-100% (opcional, apenas fullscreen) |
| `onCancel` | `() => void` | `undefined` | Callback para botão "Cancelar" (opcional) |
| `testID` | `string` | `'loading-overlay'` | ID para testes automatizados |

---

## 🔧 Modos de Uso

### Modo: `backdrop`

- Background: `rgba(27, 29, 41, 0.8)` - translúcido
- Card: Centralizado com padding, border radius 8px
- Spinner: SportsLoading md
- Uso: Ações médias (2-5s) como criar evento, upload foto

### Modo: `fullscreen`

- Modal full-screen com background `neutral.darkest` sólido
- Spinner: SportsLoading lg
- Progress bar: Opcional para operações determináveis
- Botão cancelar: Opcional para operações que suportam abort
- Uso: Ações longas (> 5s) como pagamento, sincronização

### Modo: `overlay` (legacy)

- Deprecated - use `backdrop` ou `fullscreen`

---

## ✅ Padrão de Consistência

**Spinner**: SEMPRE `<SportsLoading>` (nunca `ActivityIndicator`)
- Cor: `brand.primary` (#FF5301)
- Tamanhos: `md` para backdrop, `lg` para fullscreen

**Texto de Loading**: Gerúndio + contexto
- ✅ "Criando evento..."
- ✅ "Salvando alterações..."
- ✅ "Processando pagamento..."
- ❌ "Loading..."
- ❌ "Please wait"

**Easing/Duration**: Fade in/out 250ms (React Navigation padrão)

---

## 🎯 Decision Tree

```
Ação demora...
├─ < 2s? → Button loading prop (inline)
├─ 2-5s? → LoadingOverlay mode="backdrop"
└─ > 5s? → LoadingOverlay mode="fullscreen" (+ progress se possível)

Operação pode ser cancelada?
└─ Sim → Adicionar onCancel prop
└─ Não → Apenas feedback visual

Progresso é determinável?
└─ Sim (upload, download) → Adicionar progress prop
└─ Não (processamento) → Apenas spinner + texto
```

---

## 📝 Exemplos Completos

### CreateEventScreen (Ação Média)

```tsx
const { isCreating, handleSubmit } = useCreateEventScreen();

return (
  <>
    <Button
      variant="primary"
      onPress={handleSubmit}
      loading={isCreating}
    >
      Criar Evento
    </Button>

    <LoadingOverlay
      visible={isCreating}
      mode="backdrop"
      message="Criando seu evento..."
    />
  </>
);
```

### FileUploadScreen (Ação Longa com Progress)

```tsx
const { uploadProgress, handleUpload, handleCancelUpload } = useFileUpload();

return (
  <>
    <Button onPress={handleUpload}>Upload Vídeo</Button>

    <LoadingOverlay
      visible={uploadProgress > 0 && uploadProgress < 100}
      mode="fullscreen"
      message="Fazendo upload do vídeo..."
      progress={uploadProgress}
      onCancel={handleCancelUpload}
    />
  </>
);
```

### PaymentScreen (Ação Longa sem Cancel)

```tsx
const { isProcessing } = usePayment();

return (
  <LoadingOverlay
    visible={isProcessing}
    mode="fullscreen"
    message="Processando pagamento..."
  />
);
```

---

## 🚨 Anti-Patterns

❌ **NUNCA** usar `ActivityIndicator` diretamente
```tsx
// ❌ ERRADO
<ActivityIndicator size="large" color="#FF5301" />

// ✅ CORRETO
<SportsLoading size="lg" />
```

❌ **NUNCA** usar loading sem feedback textual
```tsx
// ❌ ERRADO
<LoadingOverlay visible={true} message="" />

// ✅ CORRETO
<LoadingOverlay visible={true} message="Processando..." />
```

❌ **NUNCA** usar fullscreen para ações rápidas
```tsx
// ❌ ERRADO (< 2s esperado)
<LoadingOverlay visible={true} mode="fullscreen" message="Adicionando..." />

// ✅ CORRETO
<Button loading={isLoading}>Adicionar Amigo</Button>
```

---

## 🎨 Design Tokens

- Background backdrop: `rgba(27, 29, 41, 0.8)` - translúcido
- Background fullscreen: `ArenaColors.neutral.darkest` - sólido
- Card background: `ArenaColors.neutral.dark`
- Card border radius: `ArenaBorders.radius.lg` (8px)
- Spacing: `ArenaSpacing.md` (12px), `ArenaSpacing.xl` (20px)
- Progress bar height: 4px
- Progress bar color: `ArenaColors.brand.primary`

---

**Task**: #24
**Don Norman Impact**: +1.5 (Behavioral - clareza de tempo esperado)
**Status**: ✅ Complete
