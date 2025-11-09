# 🐛 Bug Fixes - Round 3

## Resumo

Este PR resolve 4 bugs críticos de UX identificados no formulário de cadastro e criação de eventos, além de corrigir problemas de Safe Area em múltiplas telas.

---

## 🔧 Correções Implementadas

### 1. **Altura Fixa em Modals de Seleção**
**Problema**: Os componentes `StateDropdown` e `CityDropdown` encolhiam conforme os itens eram filtrados na busca, causando saltos visuais na UI.

**Solução**:
- Adicionada altura fixa (`ArenaSpacing['22xl']`) para `itemsList`, `loadingContainer` e `emptyContainer` no `SelectionModal`
- Mantém consistência visual durante filtragem
- Melhora experiência do usuário ao buscar estados/cidades

**Arquivos modificados**:
- `src/components/ui/selectionModal/stylesSelectionModal.ts`
- `src/constants/spacing.ts` (adicionado token `22xl: 400`)

---

### 2. **DatePicker com Modal Confirmável (iOS)**
**Problema**: No formulário de criação de evento, o seletor datetime fechava automaticamente ao scrollar data/hora, forçando usuário a reabrir várias vezes.

**Solução**:
- Implementado Modal com botões OK/Cancelar para `variant="datetime"` no iOS (mesmo padrão do `variant="date"`)
- Usuário agora pode ajustar data e hora livremente antes de confirmar
- Modal permanece aberto durante todo o scroll
- Apenas fecha ao clicar em "Confirmar" ou "Cancelar"

**Arquivos modificados**:
- `src/components/ui/datePicker/index.tsx`
- `src/components/ui/datePicker/useDatePicker.ts`

**Comportamento**:
```tsx
// iOS datetime agora usa Modal com confirmação
{showPicker && Platform.OS === 'ios' && (variant === 'date' || variant === 'datetime') && (
  <Modal>
    <RNDateTimePicker />
    <Button onPress={handleConfirm}>Confirmar</Button>
  </Modal>
)}
```

---

### 3. **Validação de CEP Bloqueando Criação de Evento**
**Problema**: Evento era criado mesmo com CEP inválido, apesar de mostrar erro visual no campo.

**Causa Raiz**: A validação de múltiplos steps sobrescrevia erros anteriores, perdendo erro do CEP.

**Solução**:
- Implementado parâmetro `preserveOtherErrors` no `validateStep`
- Validação agora **acumula** erros de todos os steps
- Bloqueia submissão se houver qualquer erro (incluindo CEP)

**Arquivos modificados**:
- `src/screens/createEventScreen/hooks/useCreateEventForm.ts`
- `src/screens/createEventScreen/useCreateEventScreen.ts`

**Lógica de Validação**:
```tsx
const validationResults = stepsToValidate.map((step, index) =>
  validateStep(step, index > 0)  // Preserva erros de steps anteriores
);
const allStepsValid = validationResults.every(isValid => isValid);
```

---

### 4. **Redirecionamento Imediato Após Criar Evento**
**Problema**: Usuário permanecia na tela de criação após criar evento, pois navegação dependia de clicar no botão "OK" do alerta.

**Solução**:
- Navegação acontece **imediatamente** após criar evento
- Alerta de sucesso aparece já na tela de detalhes do evento
- Funciona independente de interação com o alerta

**Arquivos modificados**:
- `src/screens/createEventScreen/useCreateEventScreen.ts`

**Antes**:
```tsx
showSuccess('Evento criado!', () => {
  navigation.navigate('EventDetails', { eventId });  // ❌ Depende do callback
});
```

**Depois**:
```tsx
navigation.navigate('EventDetails', { eventId });  // ✅ Imediato
showSuccess('Evento criado!');  // Aparece na nova tela
```

---

### 5. **Safe Area em Telas Críticas**
**Problema**: Elementos ficavam escondidos atrás da câmera frontal (notch) ou barra de navegação inferior.

**Solução**:
- Corrigido import de `SafeAreaView` em `createEventScreen` (de `react-native` → `react-native-safe-area-context`)
- Adicionado `SafeAreaView` em `onboardingSportsScreen`

**Arquivos modificados**:
- `src/screens/createEventScreen/index.tsx`
- `src/screens/onboardingSportsScreen/index.tsx`

**Por que `react-native-safe-area-context`?**
- ✅ Funciona corretamente em iOS, Android e Web
- ✅ Respeita notch, Dynamic Island, display cutouts
- ✅ Valores dinâmicos e precisos
- ❌ `SafeAreaView` do `react-native` é deprecado e não funciona bem no Android

---

## 📊 Impacto

| Categoria | Antes | Depois |
|-----------|-------|--------|
| **UX - Seleção de Local** | Modal encolhe durante busca | Altura fixa consistente |
| **UX - Seleção de Data/Hora** | Fecha ao scrollar (iOS) | Modal com botões OK/Cancelar |
| **Validação** | CEP inválido permitido | Bloqueia criação com erro |
| **Navegação** | Usuário preso na tela de criação | Redireciona automaticamente |
| **Safe Area** | Elementos escondidos | Respeitam áreas seguras |

---

## 🧪 Testes Recomendados

1. **StateDropdown/CityDropdown**: Buscar por "São" e verificar altura fixa
2. **DatePicker iOS**: Selecionar data/hora e scrollar livremente antes de confirmar
3. **Validação CEP**: Tentar criar evento com CEP inválido (ex: `12345-67`)
4. **Navegação**: Criar evento e verificar redirecionamento imediato
5. **Safe Area**: Testar em iPhone com notch e Android com navigation bar

---

## 📱 Plataformas Afetadas

- ✅ iOS (DatePicker modal, Safe Area)
- ✅ Android (Safe Area, validação)
- ✅ Web (validação, navegação)

---

## 🔗 Issues Relacionadas

- Fixes formulário de cadastro UX issues
- Fixes criação de evento UX issues
- Fixes Safe Area em telas críticas

---

## 📝 Notas Adicionais

- Todas as mudanças seguem padrões Arena (SOLID, Clean Code, Design System)
- Nenhuma breaking change
- Mantém compatibilidade com código existente
- TypeScript strict mode mantido
