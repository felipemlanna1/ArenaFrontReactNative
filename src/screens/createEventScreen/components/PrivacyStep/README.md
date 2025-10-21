# PrivacyStep Component

## 📋 Visão Geral

Componente step do formulário multi-etapas de criação de eventos, responsável pela seleção do tipo de privacidade do evento. Apresenta 4 opções de privacidade em cards interativos com ícones e descrições.

## 🎯 Funcionalidade

### Tipos de Privacidade

| Tipo | Label | Descrição | Ícone | Cor |
|------|-------|-----------|-------|-----|
| `PUBLIC` | Público | Qualquer pessoa pode ver e participar diretamente | globe-outline | Success (verde) |
| `GROUP_ONLY` | Apenas Grupo | Apenas membros do grupo podem ver e participar | people-outline | Primary (laranja) |
| `APPROVAL_REQUIRED` | Requer Aprovação | Você precisa aprovar cada solicitação de participação | checkmark-done-outline | Warning (amarelo) |
| `INVITE_ONLY` | Apenas Convidados | Apenas pessoas que você convidar podem participar | mail-outline | Error (vermelho) |

### Comportamento

1. **Seleção Única**: Apenas um tipo de privacidade pode ser selecionado
2. **Visual Feedback**: Card selecionado tem borda laranja e background sutil
3. **Radio Button**: Cada card mostra um radio button customizado
4. **Grupo Condicional**: Quando `GROUP_ONLY` é selecionado, mostra seção para selecionar grupo (em desenvolvimento)
5. **Validação**: Exibe mensagens de erro abaixo das opções

## 📦 Props

```typescript
interface PrivacyStepProps {
  formData: CreateEventFormData;      // Dados do formulário
  errors: CreateEventFormErrors;       // Erros de validação
  onUpdate: (updates: Partial<CreateEventFormData>) => void; // Callback para atualizar dados
}
```

## 🎨 Estrutura Visual

```
┌─────────────────────────────────────┐
│ Privacidade do Evento *             │
│ Escolha quem pode ver e participar  │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │ 🌐            ○                 │ │ ← Card não selecionado
│ │ Público                         │ │
│ │ Qualquer pessoa pode ver...     │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 👥            ●                 │ │ ← Card selecionado
│ │ Apenas Grupo (bold)             │ │
│ │ Apenas membros do grupo...      │ │
│ └─────────────────────────────────┘ │
│                                     │
│ [Mais opções...]                    │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Grupo *                         │ │ ← Seção condicional
│ │ Seleção de grupo será...        │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

## 🔧 Implementação

### Uso Básico

```tsx
import { PrivacyStep } from './components/PrivacyStep';

<PrivacyStep
  formData={formData}
  errors={errors}
  onUpdate={updateFormData}
/>
```

### Estrutura de Dados

```typescript
// formData
{
  privacy: 'PUBLIC' | 'GROUP_ONLY' | 'APPROVAL_REQUIRED' | 'INVITE_ONLY',
  groupId?: string,
  // ... outros campos
}

// errors
{
  privacy?: string,
  groupId?: string,
  // ... outros erros
}
```

### Callback onUpdate

Quando usuário seleciona uma opção:
```typescript
onUpdate({
  privacy: 'PUBLIC' // ou outro tipo
  // groupId é resetado automaticamente se não for GROUP_ONLY
});
```

## 🎨 Estilos

### Tokens Utilizados

- **Espaçamento**:
  - `ArenaSpacing.md`: Gap entre cards
  - `ArenaSpacing.lg`: Margem entre seções
  - `ArenaSpacing.xs`: Espaçamento interno pequeno

- **Cores**:
  - `ArenaColors.neutral.dark`: Background dos cards
  - `ArenaColors.neutral.darkSubtleBorder`: Borda padrão
  - `ArenaColors.brand.primary`: Borda e radio selecionado
  - `ArenaColors.brand.primarySubtle`: Background do card selecionado

- **Bordas**:
  - `ArenaBorders.radius.lg`: Cards de opção
  - `ArenaBorders.radius.circle`: Radio buttons e ícones

### Card States

1. **Normal**:
   - Border: `darkSubtleBorder` (2px)
   - Background: `neutral.dark`

2. **Selecionado**:
   - Border: `brand.primary` (2px)
   - Background: `brand.primarySubtle`
   - Label: `bodyBoldAccent` variant

## 🔄 Fluxo de Dados

```
User tap → handlePrivacyChange → onUpdate({privacy, groupId?})
                                      ↓
                                 formData updated
                                      ↓
                                 Re-render com nova seleção
```

### Reset de GroupId

Quando usuário muda de `GROUP_ONLY` para outro tipo:
```typescript
const updates = { privacy };
if (privacy !== 'GROUP_ONLY') {
  updates.groupId = undefined; // Reset automático
}
onUpdate(updates);
```

## ✅ Validação

### Regras
- Privacy é obrigatório (default: 'PUBLIC')
- GroupId é obrigatório quando privacy === 'GROUP_ONLY'

### Mensagens de Erro
```typescript
errors: {
  privacy: 'Selecione o tipo de privacidade do evento',
  groupId: 'Selecione um grupo para eventos privados'
}
```

## 📱 Responsividade

- Cards ocupam 100% da largura
- Gap consistente entre cards (12px)
- Touch area otimizada (mínimo 44x44px)

## ♿ Acessibilidade

- `testID` para cada card: `privacy-option-{type}`
- Labels descritivas com ícones visuais
- Feedback tátil no toque (activeOpacity: 0.7)

## 🚧 Pendências

1. **Seletor de Grupo**: Implementar dropdown para selecionar grupo quando `GROUP_ONLY`
2. **Validação Avançada**: Verificar se usuário é membro/admin do grupo selecionado
3. **Ícones de Ajuda**: Adicionar tooltips explicando cada tipo de privacidade

## 🔗 Relacionados

- [CreateEventScreen](../../README.md) - Tela principal
- [PrivacyBadge](../../../../components/ui/privacyBadge/README.md) - Badge de privacidade
- [EVENT_PRIVACY_SPEC.md](../../../../../EVENT_PRIVACY_SPEC.md) - Especificação completa

## 📏 Métricas

- **Total de Linhas**: ~145 linhas
- **Componentes Reutilizados**: Label, Text, TouchableOpacity, Ionicons
- **Estados Gerenciados**: Nenhum (stateless)
- **Complexidade**: Baixa (lógica simples de seleção)
