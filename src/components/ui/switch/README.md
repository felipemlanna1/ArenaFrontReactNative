# Switch Component

Componente toggle Arena branded que encapsula o Switch nativo do React Native.

## Uso Básico

```tsx
import { Switch } from '@/components/ui/switch';

// Switch simples
<Switch value={isEnabled} onValueChange={setIsEnabled} />

// Switch com label
<Switch
  value={isEnabled}
  onValueChange={setIsEnabled}
  label="Notificações"
/>

// Switch com label à esquerda
<Switch
  value={isEnabled}
  onValueChange={setIsEnabled}
  label="Ativar"
  labelPosition="left"
/>
```

## Variantes

### `brand` (padrão)
Switch com cores da marca Arena (laranja quando ativo).

```tsx
<Switch variant="brand" value={true} />
```

### `default`
Switch com cores neutras.

```tsx
<Switch variant="default" value={true} />
```

## Tamanhos

### `sm` - Small
```tsx
<Switch size="sm" value={true} label="Pequeno" />
```

### `md` - Medium (padrão)
```tsx
<Switch size="md" value={true} label="Médio" />
```

### `lg` - Large
```tsx
<Switch size="lg" value={true} label="Grande" />
```

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `variant` | `'default' \| 'brand'` | `'brand'` | Estilo visual do switch |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamanho do switch |
| `value` | `boolean` | `false` | Estado atual (ligado/desligado) |
| `onValueChange` | `(value: boolean) => void` | - | Callback ao mudar estado |
| `label` | `string` | - | Label descritivo opcional |
| `labelPosition` | `'left' \| 'right'` | `'right'` | Posição do label |
| `disabled` | `boolean` | `false` | Desabilita interação |
| `testID` | `string` | - | ID para testes |

## Casos de Uso

### Toggle de Configurações
```tsx
const [settings, setSettings] = useState({
  notifications: true,
  darkMode: false,
  autoSave: true,
});

<View>
  <Switch
    value={settings.notifications}
    onValueChange={(value) =>
      setSettings(prev => ({ ...prev, notifications: value }))
    }
    label="Notificações Push"
    variant="brand"
  />

  <Switch
    value={settings.darkMode}
    onValueChange={(value) =>
      setSettings(prev => ({ ...prev, darkMode: value }))
    }
    label="Modo Escuro"
    variant="brand"
  />
</View>
```

### Limitar Participantes (CreateEvent)
```tsx
const [hasLimit, setHasLimit] = useState(false);
const [maxParticipants, setMaxParticipants] = useState(10);

<Switch
  value={hasLimit}
  onValueChange={setHasLimit}
  label="Limitar número de participantes"
  variant="brand"
  size="md"
/>

{hasLimit && (
  <Input
    label="Máximo de participantes"
    value={maxParticipants.toString()}
    onChangeText={(v) => setMaxParticipants(parseInt(v))}
    keyboardType="numeric"
  />
)}
```

### Filtros com Toggle
```tsx
const [filters, setFilters] = useState({
  freeOnly: false,
  nearbyOnly: false,
});

<View style={styles.filterToggles}>
  <Switch
    value={filters.freeOnly}
    onValueChange={(value) =>
      setFilters(prev => ({ ...prev, freeOnly: value }))
    }
    label="Apenas eventos gratuitos"
    size="sm"
  />

  <Switch
    value={filters.nearbyOnly}
    onValueChange={(value) =>
      setFilters(prev => ({ ...prev, nearbyOnly: value }))
    }
    label="Apenas próximos a mim"
    size="sm"
  />
</View>
```

## Design Tokens Utilizados

- **Cores Track**: `ArenaColors.neutral.medium`, `ArenaColors.brand.primary`
- **Cores Thumb**: `ArenaColors.neutral.light`
- **Espaçamento**: `ArenaSpacing.sm/md/lg` (gap entre switch e label)
- **Tipografia**: `ArenaTypography.size.xs/sm/md`
- **Peso**: `ArenaTypography.weight.medium`

## Acessibilidade

- ✅ Suporte a `accessibilityRole="switch"`
- ✅ Estado `checked` e `disabled` expostos
- ✅ Label usado como `accessibilityLabel`
- ✅ Área de toque nativa do Switch
- ✅ Indicador visual claro de estado (cores contrastantes)

## Boas Práticas

### ✅ Fazer
- Sempre fornecer `label` para contexto
- Usar `variant="brand"` para ações principais
- Agrupar switches relacionados
- Mostrar/esconder conteúdo baseado no estado

### ❌ Evitar
- Switch sem label em formulários complexos
- Muitos switches em sequência (considere Checkbox)
- Mudanças de estado sem feedback visual
- Switches desabilitados sem explicação
