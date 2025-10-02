# Filter Screen Implementation Context

## 📋 Status da Implementação

### ✅ Completado
1. **Estrutura de Pastas** - Criada estrutura completa em `src/screens/filterScreen/`
2. **Types & Interfaces** - `typesFilterScreen.ts` com todas interfaces necessárias
3. **Constantes** - `utils/filterConstants.ts` com opções de filtros
4. **Transformers** - `utils/filterTransformers.ts` para conversão API
5. **Hook de Estado** - `hooks/useFilterState.ts` para gerenciar estado dos filtros

### 🔄 Em Progresso
- Componentes de UI (FilterSection, PriceRangeFilter, etc.)

### ⏳ Pendente
- DateRangeFilter component
- ActiveFiltersBar component
- Tela principal FilterScreen
- Hook useFilterSync
- Integração com navegação
- Testes

## 🎯 Arquitetura

### Filtros Implementados
- **Esportes** (`sportIds[]`) - Array de UUIDs
- **Nível de Habilidade** (`skillLevels[]`) - BEGINNER, INTERMEDIATE, ADVANCED, PROFESSIONAL, ALL
- **Preço** (`priceMin`, `priceMax`, `isFree`)
- **Data** (`startDateFrom`, `startDateTo`)
- **Localização** (`city`, `state`)
- **Privacidade** (`privacy[]`) - PUBLIC, PRIVATE, FRIENDS_ONLY
- **Status** (`status[]`) - PUBLISHED, ONGOING, COMPLETED, CANCELLED
- **Tipo de Evento** (`eventTypes[]`) - CASUAL, COMPETITIVE, TRAINING, TOURNAMENT
- **Outros** (`hasAvailableSpots`)
- **Ordenação** (`sortBy`, `sortOrder`)

### Componentes Arena UI Utilizados
- Accordion (para seções expansíveis)
- Checkbox (seleção múltipla)
- CheckboxGroup (grupos de checkboxes)
- Input (campos de texto e numéricos)
- Button (ações)
- Text (labels)
- Badge (contadores)

## 📁 Estrutura de Arquivos

```
filterScreen/
├── components/
│   ├── FilterSection/          ✅ Próximo
│   ├── PriceRangeFilter/       ⏳ Pendente
│   ├── DateRangeFilter/        ⏳ Pendente
│   └── ActiveFiltersBar/       ⏳ Pendente
├── hooks/
│   ├── useFilterState.ts       ✅ Completo
│   ├── useFilterValidation.ts  ⏳ Pendente
│   └── useFilterSync.ts        ⏳ Pendente
├── utils/
│   ├── filterConstants.ts      ✅ Completo
│   └── filterTransformers.ts   ✅ Completo
├── index.tsx                   ⏳ Pendente
├── stylesFilterScreen.ts       ⏳ Pendente
├── typesFilterScreen.ts        ✅ Completo
└── useFilterScreen.ts          ⏳ Pendente
```

## 🔧 Decisões Técnicas

1. **Estado Local vs Global**: Usando estado local na tela com callback para aplicar
2. **Transformação de Dados**: Separado em `filterTransformers.ts` para facilitar testes
3. **Validações**: Serão feitas em hook separado `useFilterValidation.ts`
4. **Performance**: useMemo e useCallback em todos os lugares críticos
5. **Acessibilidade**: Todos componentes com props de acessibilidade

## 🚀 Próximos Commits

1. `feat(filter): add FilterSection component with Accordion integration`
2. `feat(filter): add PriceRangeFilter component with validation`
3. `feat(filter): add DateRangeFilter component with date picker`
4. `feat(filter): add ActiveFiltersBar component with badges`
5. `feat(filter): add main FilterScreen component and navigation`
6. `feat(filter): add useFilterSync hook for API integration`
7. `test(filter): add unit tests for filter components`

## 📝 Notas Importantes

- Máximo 150 linhas por arquivo (regra Arena)
- TypeScript strict mode ativo
- Sem valores hardcoded, apenas tokens Arena
- Todos os filtros suportam o formato da API (com `[]` para arrays)
- Debounce de 300ms em inputs de texto
- Validação de ranges (min <= max para preço e data)

## 🔗 Integrações

### API Endpoints
- `GET /api/v1/events` - Lista eventos com filtros
- Query params com sufixo `[]` para arrays (ex: `sportIds[]=uuid1&sportIds[]=uuid2`)

### Navegação
```typescript
navigation.navigate('FilterScreen', {
  currentFilters: EventsFilter,
  onApplyFilters: (filters: EventsFilter) => void
})
```

### HomeScreen Integration
- FilterBar já existe e chama `onFilterPress`
- Callback `onApplyFilters` atualiza eventos na home
- Contagem de filtros ativos mostrada no badge

---
*Última atualização: Durante implementação*
*Versão: 1.0.0*
