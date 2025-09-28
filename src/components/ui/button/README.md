# Button - Arena UI Component

Componente de botão robusto e acessível com 6 variantes semânticas, animações suaves e suporte completo para diferentes tamanhos e estados.

## 🎯 Quando Usar Cada Variante

### 1. **Primary** - Ações Principais

**Use quando**: Ação mais importante da tela, CTA principal

- ✅ Salvar formulário
- ✅ Finalizar compra
- ✅ Confirmar ação importante
- ✅ Login/Cadastro
- ✅ Enviar dados

```tsx
<Button variant="primary" onPress={handleSave}>
  Salvar Alterações
</Button>
```

### 2. **Secondary** - Ações Secundárias

**Use quando**: Ação importante, mas não a principal da tela

- ✅ Cancelar operação
- ✅ Voltar/Retornar
- ✅ Ação alternativa
- ✅ Visualizar detalhes
- ✅ Editar item

```tsx
<Button variant="secondary" onPress={handleCancel}>
  Cancelar
</Button>
```

### 3. **Subtle** - Ações Discretas

**Use quando**: Ação complementar, não deve chamar muito atenção

- ✅ Filtros e ordenação
- ✅ Configurações opcionais
- ✅ Ações de suporte
- ✅ Links discretos
- ✅ Expandir/Recolher

```tsx
<Button variant="subtle" onPress={handleFilter}>
  Filtrar Resultados
</Button>
```

### 4. **Destructive** - Ações Destrutivas

**Use quando**: Ação que remove, deleta ou destrói dados

- ✅ Excluir item
- ✅ Remover conta
- ✅ Cancelar assinatura
- ✅ Resetar dados
- ✅ Ações irreversíveis

```tsx
<Button variant="destructive" onPress={handleDelete}>
  Excluir Permanentemente
</Button>
```

### 5. **Success** - Confirmações Positivas

**Use quando**: Confirmar ação bem-sucedida ou positiva

- ✅ Confirmar pagamento
- ✅ Aprovar solicitação
- ✅ Finalizar com sucesso
- ✅ Aceitar termos
- ✅ Ativar funcionalidade

```tsx
<Button variant="success" onPress={handleApprove}>
  Aprovar Solicitação
</Button>
```

### 6. **Ghost** - Navegação e Links

**Use quando**: Navegação sutil, links textuais, ações minimais

- ✅ Navegação entre telas
- ✅ Links informativos
- ✅ Ações de menu
- ✅ "Ver mais" / "Mostrar menos"
- ✅ Breadcrumbs

```tsx
<Button variant="ghost" onPress={handleNavigate}>
  Ver Detalhes
</Button>
```

## 📏 Tamanhos Disponíveis

| Tamanho | Altura | Uso Recomendado                 |
| ------- | ------ | ------------------------------- |
| `xs`    | 32px   | Micro ações, tags               |
| `sm`    | 36px   | Ações compactas, cards          |
| `md`    | 44px   | **Padrão** - Touch target ideal |
| `lg`    | 52px   | Destaque, CTAs importantes      |
| `xl`    | 60px   | Hero sections, landing pages    |

## 🚀 Uso Básico

```tsx
import { Button } from '@/components/ui/button';

export const MyComponent = () => {
  const handlePress = () => {
    console.log('Button pressed!');
  };

  return (
    <Button variant="primary" size="md" onPress={handlePress}>
      Clique Aqui
    </Button>
  );
};
```

## 🎨 Exemplos Avançados

### Com Ícones

```tsx
import { ArrowRight, Download } from '@/icons';

// Ícone à esquerda
<Button
  variant="primary"
  leftIcon={Download}
  onPress={handleDownload}
>
  Baixar Arquivo
</Button>

// Ícone à direita
<Button
  variant="secondary"
  rightIcon={ArrowRight}
  onPress={handleNext}
>
  Próximo
</Button>
```

### Estados de Loading

```tsx
// Loading padrão
<Button
  variant="primary"
  loading={isLoading}
  onPress={handleSave}
>
  Salvar
</Button>

// Loading com texto customizado
<Button
  variant="primary"
  loading={isUploading}
  loadingText="Enviando..."
  onPress={handleUpload}
>
  Enviar Arquivo
</Button>
```

### Botão Desabilitado

```tsx
<Button variant="primary" disabled={!isFormValid} onPress={handleSubmit}>
  Enviar Formulário
</Button>
```

### Largura Total

```tsx
<Button variant="primary" fullWidth onPress={handleContinue}>
  Continuar
</Button>
```

### Sem Feedback Háptico

```tsx
<Button variant="subtle" haptic={false} onPress={handleQuietAction}>
  Ação Silenciosa
</Button>
```

## 🎭 Animações e Micro-interações

### Pressionar

- **Scale**: Reduz para 98% do tamanho original
- **Duração**: 100ms com easing suave
- **Haptic**: Vibração leve (Light Impact)

### Soltar

- **Bounce**: Retorna ao tamanho original com bounce sutil
- **Duração**: 150ms com spring animation

### Loading

- **Spinner**: Rotação contínua de 360°
- **Opacity**: Texto e container com 70% de opacidade
- **Transição**: Fade suave entre estados

### Disabled

- **Opacity**: 50% para todo o componente
- **Interação**: Completamente desabilitada
- **Animação**: Transição suave de 200ms

## 🔧 Props Interface

```typescript
interface ButtonProps {
  // Aparência
  variant?:
    | 'primary'
    | 'secondary'
    | 'subtle'
    | 'destructive'
    | 'success'
    | 'ghost';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  // Comportamento
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  haptic?: boolean;

  // Conteúdo
  children: string;
  leftIcon?: React.ComponentType<{ size: number; color: string }>;
  rightIcon?: React.ComponentType<{ size: number; color: string }>;
  loadingText?: string;

  // Layout
  fullWidth?: boolean;

  // Acessibilidade e Teste
  testID?: string;

  // Props do TouchableOpacity
  // Herda todas as props exceto 'style'
}
```

## ♿ Acessibilidade

### Automática

- **Role**: `button`
- **AccessibilityLabel**: Texto do botão
- **AccessibilityState**: `disabled`, `busy` (loading)
- **AccessibilityHint**: Contexto da ação

### Hints por Variante

- **Primary**: "Duplo toque para ação principal"
- **Secondary**: "Duplo toque para ação secundária"
- **Destructive**: "Duplo toque para ação destrutiva"
- **Loading**: "Carregando, aguarde..."
- **Disabled**: "Botão desabilitado"

### Suporte a Screen Readers

- Anuncia estado de loading
- Anuncia quando botão está desabilitado
- Texto claro e descritivo

## 🧪 Testando

```tsx
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '@/components/ui/button';

test('deve chamar onPress quando clicado', () => {
  const handlePress = jest.fn();
  const { getByText } = render(<Button onPress={handlePress}>Teste</Button>);

  fireEvent.press(getByText('Teste'));
  expect(handlePress).toHaveBeenCalledTimes(1);
});

test('não deve chamar onPress quando disabled', () => {
  const handlePress = jest.fn();
  const { getByText } = render(
    <Button disabled onPress={handlePress}>
      Teste
    </Button>
  );

  fireEvent.press(getByText('Teste'));
  expect(handlePress).not.toHaveBeenCalled();
});
```

## 📱 Compatibilidade

- ✅ iOS 11+
- ✅ Android API 21+
- ✅ Expo SDK 49+
- ✅ React Native 0.72+
- ✅ Modo Dark nativo
- ✅ High Contrast
- ✅ Screen Readers

## 🎨 Design Tokens

Todos os estilos utilizam exclusivamente tokens do Arena Design System:

- **Cores**: `ArenaColors.*`
- **Espaçamento**: `ArenaSpacing.*`
- **Tipografia**: `ArenaTypography.*`
- **Bordas**: `ArenaBorders.*`

## 🔄 Versionamento

**v1.0.0** - Versão inicial com todas as funcionalidades
