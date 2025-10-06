# FilterBar Component

Barra de filtros responsiva que aparece abaixo do Header e se esconde durante o scroll.

## Características

- **Input de Pesquisa**: Campo de texto com ícone de lupa e botão de limpar
- **Ordenação**: Botão para alternar ordem ascendente/descendente
- **Filtros Avançados**: Botão para abrir modal de filtros com badge de contagem
- **Animação de Scroll**: Some suavemente ao rolar a página para baixo
- **Design Limpo**: Hierarquia visual clara com foco no input de pesquisa

## Uso Básico

```tsx
import { FilterBar } from '@/components/FilterBar';
import { useFilterBarScroll } from '@/components/FilterBar/useFilterBarScroll';

const MyScreen = () => {
  const [searchValue, setSearchValue] = useState('');
  const { handleScroll, filterBarTranslateY } = useFilterBarScroll();

  return (
    <View>
      <Animated.View
        style={[{ transform: [{ translateY: filterBarTranslateY }] }]}
      >
        <FilterBar
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          onSortPress={() => console.log('Sort')}
          onFilterPress={() => console.log('Filter')}
          sortOrder="desc"
          filterCount={3}
        />
      </Animated.View>

      <Animated.ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
        {/* Conteúdo */}
      </Animated.ScrollView>
    </View>
  );
};
```

## Props

| Prop           | Tipo                    | Obrigatório | Padrão      | Descrição                           |
| -------------- | ----------------------- | ----------- | ----------- | ----------------------------------- |
| searchValue    | string                  | Sim         | -           | Valor do input de pesquisa          |
| onSearchChange | (value: string) => void | Sim         | -           | Callback ao mudar texto de pesquisa |
| onSortPress    | () => void              | Sim         | -           | Callback ao pressionar ordenação    |
| onFilterPress  | () => void              | Sim         | -           | Callback ao pressionar filtros      |
| sortOrder      | 'asc' \| 'desc'         | Não         | 'desc'      | Ordem de classificação atual        |
| sortField      | SortField               | Não         | -           | Campo de ordenação                  |
| filterCount    | number                  | Não         | 0           | Quantidade de filtros ativos        |
| placeholder    | string                  | Não         | 'Buscar...' | Placeholder do input                |
| testID         | string                  | Não         | -           | ID para testes                      |

## Hooks

### useFilterBar

Hook interno para gerenciar estado do input de pesquisa.

### useFilterBarScroll

Hook para animação de scroll que esconde/mostra o FilterBar.

**Retorno**:

- `scrollY`: Animated.Value do scroll
- `handleScroll`: Handler para onScroll do ScrollView
- `filterBarTranslateY`: Valor interpolado para translateY

## Design System

- **Cores**: Usa `neutral.dark` no background e `neutral.darkest` nos inputs
- **Espaçamento**: `lg` horizontal, `md` vertical
- **Bordas**: Pills no input, `md` nos botões de ação
- **Hierarquia**: Input em destaque (maior), botões compactos (40x40px)
- **Badge**: Laranja primário com contador de filtros ativos

## Acessibilidade

- Labels apropriados para screen readers
- Áreas de toque de 40px mínimo
- Contraste adequado de cores
- Feedback visual ao pressionar

## Estrutura de Arquivos

```
FilterBar/
├── index.tsx                 # Componente principal
├── typesFilterBar.ts        # Tipos TypeScript
├── useFilterBar.ts          # Hook de estado
├── useFilterBarScroll.ts    # Hook de animação
├── stylesFilterBar.ts       # Estilos
└── README.md                # Documentação
```
