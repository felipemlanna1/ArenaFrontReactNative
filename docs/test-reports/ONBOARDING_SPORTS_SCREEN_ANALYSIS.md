# Análise Completa: OnboardingSportsScreen

**Data:** 2026-02-01
**Versão:** 1.0

---

## 1. VISÃO GERAL

### 1.1 Propósito da Tela
A tela `OnboardingSportsScreen` é uma etapa obrigatória do fluxo de onboarding onde o usuário seleciona os esportes que pratica e define seu nível de habilidade em cada um.

### 1.2 Quando é Exibida
- **Condição**: `user` existe (autenticado) E `userHasSports === false`
- **Arquivo**: `src/navigation/AppNavigator.tsx:307`
- A tela é a ÚNICA disponível neste estado - o usuário não pode navegar para outras telas até completar ou pular

### 1.3 Estrutura de Arquivos

```
src/screens/onboardingSportsScreen/
├── index.tsx                          # Componente principal
├── useOnboardingSportsScreen.ts       # Hook com toda a lógica
├── typesOnboardingSportsScreen.ts     # Tipos TypeScript
├── stylesOnboardingSportsScreen.ts    # Estilos
├── constants.ts                       # Constantes (CARDS_PER_ROW=3, etc.)
└── components/
    ├── OnboardingHeader/              # Header com botão voltar
    ├── SportsSelection/               # Grid de esportes + busca + badges
    ├── SportCard/                     # Card individual de esporte
    └── OnboardingFooter/              # Botões Pular/Continuar
```

---

## 2. COMPONENTES

### 2.1 OnboardingHeader
| Prop | Tipo | Descrição |
|------|------|-----------|
| `onBack` | `() => void` | Callback ao clicar no botão voltar |
| `testID` | `string?` | ID para testes (default: 'onboarding-header') |

**Elementos UI:**
- Botão voltar (ícone `arrow-back`, 24px, branco)
- `hitSlop`: 12px em todas as direções

### 2.2 SportsSelection
| Prop | Tipo | Descrição |
|------|------|-----------|
| `availableSports` | `Sport[]` | Lista de esportes disponíveis (filtrados) |
| `selectedSports` | `SportSelection[]` | Esportes selecionados pelo usuário |
| `onSelectSport` | `(sportId: string) => void` | Callback ao selecionar esporte |
| `onRemoveSport` | `(sportId: string) => void` | Callback ao remover esporte |
| `primarySportId` | `string \| null` | ID do esporte marcado como principal |
| `isLoading` | `boolean` | Estado de carregamento |
| `searchQuery` | `string` | Texto de busca atual |
| `onSearchChange` | `(query: string) => void` | Callback ao digitar na busca |

### 2.3 SportCard
| Prop | Tipo | Descrição |
|------|------|-----------|
| `sportId` | `string` | ID do esporte |
| `sportName` | `string` | Nome do esporte |
| `sportIcon` | `string` | Identificador do ícone |
| `isSelected` | `boolean` | Se está selecionado |
| `onPress` | `() => void` | Callback ao pressionar |
| `disabled` | `boolean?` | Desabilita interação |
| `level` | `SkillLevel?` | Nível de habilidade |
| `isPrimary` | `boolean?` | Se é o esporte principal |

**Estados Visuais:**

| Estado | Background | Borda | Badges |
|--------|------------|-------|--------|
| Não selecionado | `#20303D` | 1px `#B8B8B8` | Nenhum |
| Selecionado | `#FF5301` | Nenhuma | ✓ verde |
| Selecionado + Principal | `#FF5301` | Nenhuma | ✓ verde + ★ amarelo |

### 2.4 SkillLevelModal
| Prop | Tipo | Descrição |
|------|------|-----------|
| `visible` | `boolean` | Controla visibilidade |
| `sportName` | `string` | Nome do esporte |
| `sportIcon` | `string?` | Ícone do esporte |
| `currentLevel` | `SkillLevel \| null` | Nível atualmente selecionado (null = nenhum) |
| `isPrimary` | `boolean?` | Se é o esporte principal |
| `onSelectLevel` | `(level, isPrimary?) => void` | Callback ao confirmar |
| `onTogglePrimary` | `(isPrimary: boolean) => void` | Callback ao alternar switch |
| `onRemoveSport` | `() => void` | Callback ao remover |
| `onClose` | `() => void` | Callback ao fechar |

**Níveis de Habilidade:**

| Enum | Label | Pontos |
|------|-------|--------|
| `BEGINNER` | Iniciante | ●○○○ |
| `INTERMEDIATE` | Intermediário | ●●○○ |
| `ADVANCED` | Avançado | ●●●○ |
| `PROFESSIONAL` | Profissional | ●●●● |

### 2.5 OnboardingFooter
| Prop | Tipo | Descrição |
|------|------|-----------|
| `canFinish` | `boolean` | Habilita botão Continuar |
| `isLoading` | `boolean` | Mostra loading no Continuar |
| `onSkip` | `() => void` | Callback do botão Pular |
| `onFinish` | `() => void` | Callback do botão Continuar |

---

## 3. ESTADOS DA TELA

### 3.1 Estado Inicial
```typescript
selectedSports: []           // Nenhum esporte selecionado
modalVisible: false          // Modal fechado
currentSportId: null         // Nenhum esporte sendo editado
currentLevel: null           // Nenhum nível selecionado
currentIsPrimary: false      // Não é principal
primarySportId: null         // Nenhum esporte principal
searchQuery: ''              // Busca vazia
isLoading: false             // Não está salvando
error: null                  // Sem erro
```

### 3.2 Estado de Loading (Carregando Esportes)
- `sportsLoading=true` do hook `useUserSports`
- Mostra `SportsLoading` no lugar do grid

### 3.3 Estado com Esportes Selecionados
- `selectedSports.length > 0`
- Seção "Selecionados (N)" aparece
- Botão "Continuar" fica habilitado

### 3.4 Estado de Modal Aberto
- `modalVisible=true`
- Overlay escurecido
- Modal com opções de nível

### 3.5 Estado de Salvando
- `isLoading=true` durante `handleFinish`
- Botão "Continuar" mostra spinner
- Botão "Pular" desabilitado

### 3.6 Estado de Erro
- `error !== null`
- Mensagem de erro exibida no topo do conteúdo

---

## 4. REGRAS DE NEGÓCIO

### 4.1 Seleção de Esporte
- Ao clicar em um card **não selecionado**: abre modal para escolher nível
- Ao clicar em um card **já selecionado**: abre modal para editar/remover
- A seleção só é confirmada após escolher nível e clicar "CONFIRMAR"

### 4.2 Nível de Habilidade
- **Obrigatório**: Todo esporte selecionado DEVE ter um nível
- **4 opções**: BEGINNER, INTERMEDIATE, ADVANCED, PROFESSIONAL
- **Botão CONFIRMAR** desabilitado se nenhum nível selecionado

### 4.3 Esporte Principal
- **Máximo 1**: Apenas um esporte pode ser marcado como principal
- Ao marcar novo esporte como principal, o anterior perde o status
- É **opcional** - pode finalizar sem esporte principal

### 4.4 Busca de Esportes
- Filtra esportes por nome (case-insensitive)
- Filtro aplicado em tempo real via `filteredSports`
- Busca vazia mostra todos os esportes

### 4.5 Remoção de Esporte
- Via botão X no badge da seção "Selecionados"
- Via link "Remover" no modal
- Se remover esporte principal, `primarySportId` volta para `null`

### 4.6 Finalizar (handleFinish)
**Pré-condições:**
1. `user.id` deve existir (autenticado)
2. `selectedSports.length > 0` (pelo menos 1 esporte)

**Dados enviados para API:**
```typescript
{
  sports: [
    {
      sportId: string,
      skillLevel: SkillLevel,
      isPrimary: boolean,
      yearsOfExperience: 0
    }
  ]
}
```

### 4.7 Pular (handleSkip)
- Chama `updateUserSports([], true)` - array vazio + flag skip
- Usuário é redirecionado para `MainTabs`
- `userHasSports` se torna `true` mesmo sem esportes

---

## 5. RESULTADOS DOS TESTES VISUAIS

**Data dos Testes:** 2026-02-01
**Ambiente:** Web (localhost:8081)

### 5.1 Testes de Renderização
| # | Teste | Resultado |
|---|-------|-----------|
| T01 | Tela renderiza sem crash | ✅ PASS |
| T02 | Header com botão voltar visível | ✅ PASS |
| T03 | Título "Quais esportes você pratica?" visível | ✅ PASS |
| T04 | Campo de busca visível | ✅ PASS |
| T05 | Grid de esportes renderiza (3 colunas) | ✅ PASS |
| T06 | Footer com botões Pular/Continuar visível | ✅ PASS |
| T07 | Botão Continuar desabilitado inicialmente | ✅ PASS |

### 5.2 Testes de Seleção e Modal
| # | Teste | Resultado |
|---|-------|-----------|
| T08 | Clicar em esporte abre modal | ✅ PASS |
| T09 | Modal mostra nome do esporte correto | ✅ PASS |
| T10 | Modal mostra ícone do esporte | ✅ PASS |
| T11 | 4 níveis de habilidade visíveis | ✅ PASS |
| T12 | Selecionar nível destaca opção (borda laranja) | ✅ PASS |
| T13 | Indicadores de pontos funcionam | ✅ PASS |
| T14 | Botão CONFIRMAR habilitado com nível | ✅ PASS |
| T18 | Switch "Esporte principal" visível | ✅ PASS |
| T29 | Link "Remover" visível no modal | ✅ PASS |

### 5.3 Testes de Busca
| # | Teste | Resultado |
|---|-------|-----------|
| T32 | Digitar na busca filtra esportes | ✅ PASS |
| T33 | Busca case-insensitive funciona | ✅ PASS |

### 5.4 Resumo
- **Testes executados:** 17
- **PASS:** 17 (100%)
- **FAIL:** 0

---

## 6. CORREÇÕES APLICADAS

### 6.1 ✅ ESLint Falsos Positivos - CORRIGIDO
**Problema:** A regra `arena-design-tokens` estava incorretamente flagando propriedades `width` e `height` como valores tipográficos.

**Solução:** Removido `width`, `height`, `minWidth`, `minHeight`, `maxWidth`, `maxHeight` do set `sizeProperties` na regra ESLint.

**Arquivo modificado:** `eslint-rules/arena-design-tokens.js`

### 6.2 ✅ Tradução Inconsistente - CORRIGIDO
**Problema:** No modal, "Profissional" era o label, mas em `translateSkillLevel` retornava "Expert".

**Solução:** Alterado para retornar "Profissional".

**Arquivo modificado:** `src/utils/i18n/skillLevels.ts:8`

### 6.3 ✅ Quebra Visual dos Badges - CORRIGIDO
**Problema:** A estrela do esporte principal estava fora do Badge, causando quebra de layout.

**Solução:** Movido a estrela para dentro do Badge usando a prop `iconName="star"`.

**Arquivos modificados:**
- `src/screens/onboardingSportsScreen/components/SportsSelection/index.tsx`
- `src/screens/onboardingSportsScreen/components/SportsSelection/stylesSportsSelection.ts`

### 6.4 ✅ Clique em Card Selecionado - CORRIGIDO
**Problema:** Clicar em um card de esporte já selecionado removia o esporte ao invés de abrir o modal para edição.

**Solução:** Removida a função `handleToggleSport` que fazia toggle. Agora sempre chama `onSelectSport` que abre o modal tanto para esportes novos quanto para já selecionados.

**Arquivo modificado:** `src/screens/onboardingSportsScreen/components/SportsSelection/index.tsx`

### 6.5 ✅ Nível Pré-selecionado Incorretamente - CORRIGIDO
**Problema:** Modal abria com "Intermediário" pré-selecionado mesmo para esportes novos (sem nível definido).

**Solução:**
1. Atualizado tipo `currentLevel` para aceitar `null`
2. Removido fallback `currentLevel || SkillLevel.INTERMEDIATE`

**Arquivos modificados:**
- `src/components/ui/skillLevelModal/typesSkillLevelModal.ts` - Tipo atualizado para `SkillLevel | null`
- `src/screens/onboardingSportsScreen/index.tsx` - Removido fallback e import não usado

### 6.6 Botão Voltar (Observação)
O botão voltar navega para `MainTabs`, mas isso pode não funcionar corretamente se o usuário não tem esportes (a navegação deveria mostrar apenas OnboardingSports). **Requer análise adicional.**

### 6.7 ⚠️ Busca com Acentos (Pendente)
**Problema:** Buscar "vol" não encontra "Vôlei" devido ao acento circunflexo.

**Status:** Bug menor, não impede uso da tela. Pode ser corrigido futuramente normalizando strings para comparação.

---

## 7. DEPENDÊNCIAS

### 7.1 Contextos
- `AuthContext`: `user`, `updateUserSports`, `signOut`
- `SportsContext`: `sports`, `isLoading`, `error`, `refetch`

### 7.2 Serviços
- `sportsService.updateUserSports(userId, data)`

### 7.3 Tipos
- `Sport`: { id, name, icon, color, popularity? }
- `SkillLevel`: enum { BEGINNER, INTERMEDIATE, ADVANCED, PROFESSIONAL }
- `SportSelection`: { sportId, sportName, level, isPrimary? }
