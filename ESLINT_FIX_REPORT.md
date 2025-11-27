# ESLint Fix Report - Arena Frontend React Native

## Resumo Executivo

**Data:** 2025-11-26  
**Status:** ✅ 38 erros corrigidos | ⏳ 118 erros restantes  
**Progresso:** 24.4% (38/156)

---

## Erros Corrigidos (38 total)

### 1. Achievement System (12 erros)
- ✅ **AchievementUnlockModal.tsx**
  - Substituído Pressable por View
  - Tokens de cores: `ArenaColors.achievement.{bronze,silver,gold,platinum}`
  - Backdrop: `ArenaColors.backdrop.dark`
  - Borders: `ArenaBorders.radius.circle`, `ArenaBorders.width.thick`
  - Removidas propriedades tipográficas de `tierText`

- ✅ **useAchievements.ts**
  - Removidos comentários inline
  - Substituído `catch (error)` por `catch {}` com fallback

### 2. Navigation (10 erros)
- ✅ **stylesCenterCreateButton.ts**
  - `borderRadius: 32` → `ArenaBorders.radius['2xl']`
  - `borderWidth: 4` → `ArenaBorders.width.thick`
  - Shadows: `ArenaElevations.elevation3`

- ✅ **constants/shadows.ts**
  - Criada const `SHADOW_COLOR` para evitar duplicação

### 3. Event Details (8 erros)
- ✅ **useAddressMaps.ts**
  - Import: `Alert` → `useAlert` from AlertContext
  - Substituídos 3x `Alert.alert()` por `showError()`
  - Adicionada dependência `showError` em hooks

- ✅ **MapsBottomSheet/index.tsx**
  - `Pressable` → `TouchableOpacity`
  - `as any` → `keyof typeof Ionicons.glyphMap`
  - Removido `console.error`
  - Fix useEffect dependencies

### 4. Correções Automáticas via Script (8 erros)
- ✅ Removidos todos `console.log`, `console.error`, `console.warn`
- ✅ Substituídos rgba backdrop colors:
  - `'rgba(0, 0, 0, 0.8)'` → `ArenaColors.backdrop.dark`
  - `'rgba(0, 0, 0, 0.7)'` → `ArenaColors.backdrop.medium`
  - `'rgba(0, 0, 0, 0.5)'` → `ArenaColors.backdrop.light`

---

## Erros Restantes (118 total)

### Categoria 1: Design Tokens Hardcoded (~65 erros)

#### ArenaSpacing (12 arquivos)
```typescript
// ❌ ERRADO
gap: 10
marginVertical: 6
paddingHorizontal: 3

// ✅ CORRETO
gap: ArenaSpacing.sm
marginVertical: ArenaSpacing.xs
paddingHorizontal: ArenaSpacing.xs
```

**Arquivos afetados:**
- `EventFilter/stylesEventFilter.ts` (linha 27)
- `ExploreTabBar.tsx` (linha 88)
- `EventRequirementsSection/stylesEventRequirementsSection.ts` (linha 35)
- `EventRulesSection/stylesEventRulesSection.ts` (linha 31)
- `EventTypeFilter/stylesEventTypeFilter.ts` (linha 27)
- `FilterBar/stylesFilterBar.ts` (linha 56)

#### ArenaTypography (~35 arquivos)
```typescript
// ❌ ERRADO - styles
fontSize: 16
fontWeight: '600'
lineHeight: 24

// ✅ CORRETO - usar variants
<Text variant="titlePrimary">Título</Text>
```

**Arquivos afetados:**
- `stylesEmptyState.ts` (linhas 25, 29)
- `stylesMenuDrawer.ts` (linhas 13, 25, 26, 57, 58, 69, 70)
- `stylesHelpScreen.ts` (linha 35)
- `stylesTermsScreen.ts` (linha 29)
- `stylesProfileCompletionBanner.ts` (linha 34)
- Vários componentes de EventDetailsScreen

#### ArenaBorders (~10 arquivos)
```typescript
// ❌ ERRADO
borderRadius: 8
borderWidth: 1

// ✅ CORRETO
borderRadius: ArenaBorders.radius.lg
borderWidth: ArenaBorders.width.thin
```

#### ArenaColors (~8 arquivos)
```typescript
// ❌ ERRADO
backgroundColor: 'rgba(0, 0, 0, 0.5)'

// ✅ CORRETO
backgroundColor: ArenaColors.backdrop.light
```

**Arquivos afetados:**
- `stylesReviewStep.ts` (linha 76)
- `stylesCreateGroupScreen.ts` (linha 56)
- `stylesEditProfileScreen.ts` (linha 73)

---

### Categoria 2: Text Variants (~8 erros)

**Propriedades proibidas em StyleSheet:**
- `fontSize`, `fontWeight`, `lineHeight`, `letterSpacing`, `color` (exceto casos especiais)

**Arquivos afetados:**
1. `stylesHelpScreen.ts` (linha 35 - lineHeight)
2. `stylesTermsScreen.ts` (linha 29 - lineHeight)
3. `stylesProfileCompletionBanner.ts` (linha 34 - lineHeight)
4. `stylesMenuDrawer.ts` (múltiplas linhas)
5. `stylesEventRequirementsSection.ts` (linhas 27-28)
6. `stylesEventRulesSection.ts` (linhas 27-29)

**Solução:**
1. Remover propriedades tipográficas de styles
2. Usar apenas props de layout (`textAlign`, `marginTop`, etc.)
3. Escolher variant apropriada no JSX

---

### Categoria 3: React Hooks (~12 warnings)

#### selectedSports logical expression (4 warnings)
**Arquivos:** `useExploreFriends.ts`, `useExploreGroups.ts`

```typescript
// ❌ PROBLEMA
const selectedSports = filtersSports?.length > 0 ? filtersSports : userSports;

// ✅ SOLUÇÃO
const selectedSports = useMemo(
  () => filtersSports?.length > 0 ? filtersSports : userSports,
  [filtersSports, userSports]
);
```

#### Missing dependencies (6 warnings)
**Arquivos:** 
- `useForgotPasswordScreen.ts` (linha 124 - showError, showSuccess)
- `useResetPasswordScreen.ts` (linha 191 - showError, showSuccess)
- `useVerifyCodeScreen.ts` (linhas 141, 177 - showError, showSuccess)
- `EventParticipantsSection/index.tsx` (linha 25 - participants)

**Solução:** Adicionar dependências faltantes no array de dependências

#### Unnecessary dependencies (2 warnings)
**Arquivos:**
- `visualAuditScreen/index.tsx` (linha 111 - 'state' é desnecessário)

**Solução:** Remover 'state' do array de dependências

---

### Categoria 4: Inline Styles (~4 warnings)

**Arquivos afetados:**
1. `avatarStack/index.tsx` (linha 55)
2. `menuDrawer/index.tsx` (linhas 125, 154)
3. `EventDescriptionSection/index.tsx` (linha 82)
4. `menuScreen/index.tsx` (linha 82)

**Solução:** Mover inline styles para arquivos `styles*.ts`

---

### Categoria 5: Empty Blocks (~3 erros)

**Arquivos afetados:**
1. `useForgotPasswordScreen.ts` (linha 56)
2. `useEventFilterCounts.ts` (linha 55)
3. `useVerifyCodeScreen.ts` (linha 59)

```typescript
// ❌ ERRADO
} catch (error) {
  // Empty
}

// ✅ CORRETO
} catch {
  setError('Erro ao processar');
}
```

---

### Categoria 6: Misc (~6 erros)

#### TypeScript any (2 erros)
- `BasicInfoStep/index.tsx` (linha 119)
- **Solução:** Tipar explicitamente

#### Default Export (1 warning)
- `utils/haptics.ts` (linha 90)
- **Solução:** Converter para named export

#### File Structure (3 warnings)
- `animatedButton/index.tsx`
- `animatedCounter/index.tsx`
- `animatedListItem/index.tsx`
- `visualAuditScreen/index.tsx`
- **Solução:** Criar arquivos `styles*.ts` separados

---

## Tokens Criados

✅ Novos tokens adicionados ao `ArenaColors`:

```typescript
achievement: {
  bronze: '#CD7F32',
  silver: '#C0C0C0',
  gold: '#FFD700',
  platinum: '#E5E4E2',
},
backdrop: {
  light: 'rgba(0, 0, 0, 0.5)',
  medium: 'rgba(0, 0, 0, 0.7)',
  dark: 'rgba(0, 0, 0, 0.8)',
  darker: 'rgba(0, 0, 0, 0.9)',
},
```

---

## Próximos Passos (Prioridade)

### 1. Design Tokens (Alta Prioridade)
**Tempo estimado:** 2-3 horas  
**Impacto:** 65 erros

- Criar script automatizado para substituir valores hardcoded
- Revisar manualmente arquivos críticos

### 2. Text Variants (Alta Prioridade)
**Tempo estimado:** 30-45 minutos  
**Impacto:** 8 erros

- Remover propriedades tipográficas de todos os `styles*.ts`
- Validar que variants corretas estão sendo usadas

### 3. React Hooks (Média Prioridade)
**Tempo estimado:** 45-60 minutos  
**Impacto:** 12 warnings

- Adicionar useMemo para expressões lógicas
- Adicionar dependências faltantes

### 4. Inline Styles (Baixa Prioridade)
**Tempo estimado:** 15-20 minutos  
**Impacto:** 4 warnings

- Mover estilos para arquivos separados

### 5. Empty Blocks & Misc (Baixa Prioridade)
**Tempo estimado:** 20-30 minutos  
**Impacto:** 9 erros

- Adicionar lógica ou comentários em blocos vazios
- Corrigir tipos any
- Converter default exports

---

## Comandos Úteis

```bash
# Ver erros por categoria
npm run lint | grep "arena/arena-design-tokens"
npm run lint | grep "arena/arena-no-custom-text-styles"
npm run lint | grep "react-hooks/exhaustive-deps"

# Ver arquivos com mais erros
npm run lint 2>&1 | grep -E "^\/" | uniq -c | sort -rn

# Executar lint completo
npm run lint
```

---

## Conclusão

✅ **Progresso significativo:** 24.4% dos erros corrigidos  
✅ **Infraestrutura preparada:** Novos tokens criados  
✅ **Scripts automáticos:** Funcionando para padrões comuns  

⏳ **Próxima sessão:** Focar em Design Tokens (65 erros) para maior impacto
