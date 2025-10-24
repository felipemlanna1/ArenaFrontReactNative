# SelectionModal

Componente genérico de modal de seleção que fornece uma interface consistente para listas de seleção com busca, estados de loading e empty state.

## 🎯 Propósito

Centralizar a lógica e UI de modais de seleção, garantindo consistência visual e reduzindo duplicação de código. Usado internamente por componentes como `CityDropdown`, `StateDropdown` e outros dropdowns personalizados.

## 📋 Props

```typescript
interface SelectionModalProps<T = unknown> {
  isOpen: boolean;                    // Controla visibilidade do modal
  onClose: () => void;                // Callback ao fechar modal
  title: string;                      // Título do modal
  searchValue?: string;               // Valor da busca
  onSearchChange?: (value: string) => void;  // Callback de mudança de busca
  searchPlaceholder?: string;         // Placeholder do input de busca
  items: T[];                         // Array de itens a exibir
  renderItem: (item: T) => ReactElement;  // Função de renderização de item
  keyExtractor: (item: T) => string;  // Extrai key única de cada item
  emptyMessage?: string;              // Mensagem quando lista vazia
  errorMessage?: string | null;       // Mensagem de erro
  isLoading?: boolean;                // Estado de carregamento
  testID?: string;                    // ID para testes
  showSearch?: boolean;               // Exibe input de busca (default: true)
}
```

## 🎨 Características

- **Animação**: Slide de baixo para cima
- **Overlay**: Background escuro com 70% de opacidade
- **Layout**: Modal com altura máxima de 85% da tela
- **Busca**: Input de busca opcional com autofocus
- **Estados**: Loading, empty, error
- **Acessibilidade**: TestIDs, hitSlop otimizado

## 💡 Uso

### Exemplo Básico

```tsx
import { SelectionModal } from '@/components/ui/selectionModal';

<SelectionModal
  isOpen={isOpen}
  onClose={closeModal}
  title="Selecione uma opção"
  items={items}
  renderItem={(item) => (
    <Pressable onPress={() => handleSelect(item)}>
      <Text>{item.name}</Text>
    </Pressable>
  )}
  keyExtractor={(item) => item.id}
/>
```

### Com Busca

```tsx
<SelectionModal
  isOpen={isOpen}
  onClose={closeModal}
  title="Selecione uma cidade"
  searchValue={searchQuery}
  onSearchChange={setSearchQuery}
  searchPlaceholder="Buscar cidade..."
  items={filteredCities}
  renderItem={(city) => (
    <Pressable onPress={() => selectCity(city)}>
      <Text>{city}</Text>
    </Pressable>
  )}
  keyExtractor={(city) => city}
/>
```

### Com Estados de Loading/Error

```tsx
<SelectionModal
  isOpen={isOpen}
  onClose={closeModal}
  title="Selecione um estado"
  items={states}
  isLoading={isLoadingStates}
  errorMessage={loadError}
  emptyMessage="Nenhum estado encontrado"
  renderItem={(state) => (
    <Pressable onPress={() => selectState(state)}>
      <Text>{state.name} - {state.uf}</Text>
    </Pressable>
  )}
  keyExtractor={(state) => state.uf}
/>
```

## 🔒 Regra ESLint

A regra `arena/arena-use-selection-modal` força o uso deste componente ao invés de `<Modal>` do React Native diretamente, garantindo consistência visual no projeto.

## 📁 Componentes que usam SelectionModal

- `CityDropdown`
- `StateDropdown`
- Outros dropdowns personalizados

## ⚠️ Restrições

- **NUNCA** usar `<Modal>` do React Native diretamente para seleção
- **SEMPRE** usar `SelectionModal` para garantir consistência
- Items devem ter keys únicas via `keyExtractor`
- `renderItem` deve retornar um ReactElement válido

## 🎯 Quando NÃO usar

- Modais de confirmação → Use `Alert` context
- Modals de formulário → Crie modal customizado se necessário
- Tooltips/Popovers → Use `Dropdown` component
