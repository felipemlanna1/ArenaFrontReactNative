# CityDropdown Component

Componente de seleção de cidades brasileiras com integração à API do IBGE. Depende da seleção de um estado (UF) e carrega dinamicamente as cidades correspondentes.

## Uso Básico

```tsx
import { StateDropdown } from '@/components/ui/stateDropdown';
import { CityDropdown } from '@/components/ui/cityDropdown';

function MyScreen() {
  const [state, setState] = useState('');
  const [city, setCity] = useState('');

  return (
    <>
      <StateDropdown
        value={state}
        onChange={(uf) => {
          setState(uf);
          setCity(''); // Reset city when state changes
        }}
        label="Estado"
      />

      <CityDropdown
        stateUF={state}
        value={city}
        onChange={setCity}
        label="Cidade"
        placeholder="Selecione a cidade"
      />
    </>
  );
}
```

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `stateUF` | `string` | `undefined` | **Obrigatório** - UF do estado para carregar cidades |
| `value` | `string` | `undefined` | Cidade selecionada |
| `onChange` | `(city: string) => void` | **obrigatório** | Callback quando cidade é selecionada |
| `label` | `string` | `undefined` | Label do campo |
| `error` | `string \| boolean` | `undefined` | Mensagem de erro ou estado de erro |
| `required` | `boolean` | `false` | Se o campo é obrigatório (exibe asterisco) |
| `disabled` | `boolean` | `false` | Desabilita interação |
| `placeholder` | `string` | `"Selecione a cidade"` | Texto quando nenhuma cidade selecionada |
| `testID` | `string` | `undefined` | ID para testes |
| `containerStyle` | `ViewStyle` | `undefined` | Estilo customizado do container |

## Features

- ✅ **Integração IBGE API**: Carrega cidades dinamicamente
- ✅ **Busca em tempo real**: Input de busca com filtro local
- ✅ **Estados de carregamento**: Loading spinner durante fetch
- ✅ **Tratamento de erros**: Mensagens de erro amigáveis
- ✅ **Empty states**: Feedback quando não há cidades
- ✅ **Auto-disable**: Desabilita se estado não selecionado
- ✅ **Lista ordenada**: Cidades em ordem alfabética
- ✅ **Helper components**: EmptyState e ModalHeader extraídos
- ✅ **Máximo 140 linhas** (< 150)

## API do IBGE

**Endpoint**: `https://servicodados.ibge.gov.br/api/v1/localidades/estados/{UF}/municipios`

**Exemplo**:
```
GET https://servicodados.ibge.gov.br/api/v1/localidades/estados/SP/municipios

Response: [
  { "id": 3550308, "nome": "São Paulo" },
  { "id": 3509502, "nome": "Campinas" },
  ...
]
```

## Estados do Componente

### 1. Sem Estado Selecionado
- Componente desabilitado
- Placeholder: "Selecione um estado primeiro"
- Não abre modal

### 2. Carregando Cidades
- Loading spinner no ícone direito
- Componente desabilitado temporariamente

### 3. Cidades Carregadas
- Lista scrollável com busca
- Indicador visual de seleção

### 4. Erro ao Carregar
- Ícone de erro no modal
- Mensagem: "Falha ao carregar cidades"

### 5. Lista Vazia (Busca)
- Ícone de busca
- Mensagem: "Nenhuma cidade encontrada"

## Exemplo com Validação

```tsx
import { CityDropdown } from '@/components/ui/cityDropdown';

function AddressForm() {
  const [state, setState] = useState('SP');
  const [city, setCity] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!city) {
      setError('Cidade é obrigatória');
      return;
    }
    // Submit form...
  };

  return (
    <CityDropdown
      stateUF={state}
      value={city}
      onChange={(selectedCity) => {
        setCity(selectedCity);
        setError('');
      }}
      label="Cidade"
      error={error}
      required
    />
  );
}
```

## Design Tokens Utilizados

- **Cores**: `ArenaColors.neutral.*`, `ArenaColors.brand.*`, `ArenaColors.semantic.*`
- **Espaçamento**: `ArenaSpacing.xs|sm|md|lg|2xl`
- **Bordas**: `ArenaBorders.radius.md|lg`
- **Tipografia**: Variantes `bodyPrimary`, `placeholderPrimary`, `titlePrimary`, `errorSecondary`

## Acessibilidade

- Roles: `button` (trigger), `radio` (city items)
- Labels e hints descritivos
- Estados de disabled e selected
- Focus automático no input de busca

## Performance

- Fetch automático ao selecionar estado
- Filtro de busca local (sem requisições adicionais)
- Ordenação alfabética das cidades
- Memoização do filteredCities

## Dependências

- `@expo/vector-icons/Ionicons`
- Componentes Arena: `Text`, `Label`, `Input`, `SportsLoading`
- Hooks customizados: `useCityDropdown`
