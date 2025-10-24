# FilterModal Component

Modal padronizado Arena para filtros e formulários que precisam de confirmação (botões Cancelar/Aplicar).

## 📋 Quando Usar

**✅ Use FilterModal para:**
- Modais de filtro com confirmação (botões Cancelar/Aplicar)
- Formulários dentro de modais que precisam confirmação
- Seleções que exigem múltiplas etapas antes de aplicar
- Conteúdo customizável que precisa de footer com ações

**❌ NÃO use FilterModal para:**
- Seleção direta sem confirmação → Use `SelectionModal`
- Alertas/notificações → Use `Alert`
- Dropdowns simples → Use `Dropdown`

## 🎯 Props

| Prop | Tipo | Padrão | Obrigatório | Descrição |
|------|------|--------|-------------|-----------|
| `visible` | `boolean` | - | ✅ | Controla visibilidade do modal |
| `onClose` | `() => void` | - | ✅ | Callback ao fechar modal (X ou backdrop) |
| `onApply` | `() => void` | - | ✅ | Callback ao clicar "Aplicar" |
| `onCancel` | `() => void` | `onClose` | ❌ | Callback ao clicar "Cancelar" (padrão: chama onClose) |
| `title` | `string` | - | ✅ | Título do modal |
| `children` | `ReactNode` | - | ✅ | Conteúdo do modal |
| `height` | `'80%' \| '85%' \| '90%'` | `'85%'` | ❌ | Altura do modal |
| `isLoading` | `boolean` | `false` | ❌ | Exibe loading spinner |
| `applyButtonLabel` | `string` | `'Aplicar'` | ❌ | Texto do botão Aplicar |
| `cancelButtonLabel` | `string` | `'Cancelar'` | ❌ | Texto do botão Cancelar |
| `applyButtonDisabled` | `boolean` | `false` | ❌ | Desabilita botão Aplicar |
| `testID` | `string` | - | ❌ | ID para testes automatizados |
| `contentContainerStyle` | `ViewStyle` | - | ❌ | Estilos customizados do ScrollView |

## 💡 Exemplos

### Filtro de Esportes

```tsx
import { FilterModal } from '@/components/ui/filterModal';
import { MultiSelectSports } from '@/components/ui/multiSelectSports';

const [visible, setVisible] = useState(false);
const [tempSportId, setTempSportId] = useState<string | undefined>();

const handleApply = () => {
  onSelectSport(tempSportId);
  setVisible(false);
};

const handleCancel = () => {
  setTempSportId(selectedSportId); // Reverte mudanças
  setVisible(false);
};

<FilterModal
  visible={visible}
  onClose={() => setVisible(false)}
  onApply={handleApply}
  onCancel={handleCancel}
  title="Filtrar por Esporte"
  height="85%"
  isLoading={isLoadingSports}
>
  <MultiSelectSports
    sports={sports}
    selectedSportIds={tempSportId ? [tempSportId] : []}
    onToggleSport={setTempSportId}
  />
</FilterModal>
```

### Filtro de Localização

```tsx
<FilterModal
  visible={visible}
  onClose={() => setVisible(false)}
  onApply={handleApply}
  title="Filtrar por Localização"
  height="80%"
>
  <View style={{ gap: ArenaSpacing.lg }}>
    <StateDropdown
      value={tempState}
      onChange={setTempState}
      label="Estado"
    />
    {tempState && (
      <CityDropdown
        value={tempCity}
        onChange={setTempCity}
        stateUF={tempState}
        label="Cidade"
      />
    )}
  </View>
</FilterModal>
```

### Com Labels Customizados

```tsx
<FilterModal
  visible={visible}
  onClose={() => setVisible(false)}
  onApply={handleSave}
  title="Editar Configurações"
  applyButtonLabel="Salvar"
  cancelButtonLabel="Descartar"
  applyButtonDisabled={!hasChanges}
>
  {/* Formulário */}
</FilterModal>
```

## 🎨 Variantes de Altura

```tsx
height="80%"  // Padrão para filtros simples (1-2 campos)
height="85%"  // Padrão (recomendado) para filtros médios
height="90%"  // Para filtros complexos (muitos campos)
```

## ♿ Acessibilidade

- ✅ SafeAreaView para áreas seguras do dispositivo
- ✅ testID em todos os elementos interativos
- ✅ hitSlop no botão de fechar (X)
- ✅ Backdrop clicável para fechar

## 🔒 Regras ESLint

**NUNCA** use `<Modal>` do React Native diretamente para filtros. Use `FilterModal`:

```tsx
// ❌ ERRADO - ESLint vai bloquear
import { Modal } from 'react-native';
<Modal visible={visible}>...</Modal>

// ✅ CORRETO
import { FilterModal } from '@/components/ui/filterModal';
<FilterModal visible={visible} onApply={handleApply}>...</FilterModal>
```

**Regra ESLint:** `arena/arena-use-filter-modal`

## 🆚 FilterModal vs SelectionModal

| Feature | FilterModal | SelectionModal |
|---------|-------------|----------------|
| **Uso** | Filtros com confirmação | Seleção direta |
| **Footer** | Cancelar + Aplicar | Nenhum (fecha ao selecionar) |
| **Conteúdo** | `children` customizável | Lista de items com `renderItem` |
| **Busca** | Manual (via children) | Integrada com Input |
| **Loading** | Sim | Sim |
| **Estado temporário** | Gerenciado pelo parent | Não aplicável |

## 📝 Notas

- O FilterModal **não gerencia estado interno** - você deve gerenciar o estado temporário no componente pai
- Use `useEffect` para sincronizar estado temporário quando o modal abrir
- Sempre reverta mudanças no `onCancel` se o usuário cancelar
- O botão "Aplicar" pode ser desabilitado com `applyButtonDisabled`
