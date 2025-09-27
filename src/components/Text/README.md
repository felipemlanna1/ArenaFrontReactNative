# Arena Text Component

Componente base de texto completo com sistema de variantes, presets semânticos e total integração com o design system Arena.

## 🎯 Visão Geral

O componente `Text` é o fundamento tipográfico de toda a aplicação Arena. Ele oferece:

- **7 variantes semânticas** (display, heading, title, subtitle, body, caption, label)
- **Sistema de presets inteligente** que combina automaticamente tamanho, peso, família e espaçamento
- **8 cores semânticas** integradas com o design system Arena
- **Componentes especializados** para casos de uso comuns
- **Acessibilidade completa** com suporte a screen readers e navegação por teclado
- **Performance otimizada** com memoização inteligente

## 📦 Instalação e Uso

### Importação Básica

```tsx
import { Text } from '@/components/Text';

// Uso básico com variante
<Text variant="heading">Título Principal</Text>
```

### Importações Especializadas

```tsx
import {
  DisplayText,
  HeadingText,
  BodyText,
  ErrorText
} from '@/components/Text';

<DisplayText>Hero Title</DisplayText>
<HeadingText>Section Title</HeadingText>
<BodyText>Paragraph content</BodyText>
<ErrorText>Validation error message</ErrorText>
```

## 🎨 Sistema de Variantes

### Variantes Disponíveis

| Variante | Tamanho | Peso | Família | Uso Recomendado |
|----------|---------|------|---------|-----------------|
| `display` | 6xl (48px) | bold | heading | Títulos hero, landing pages |
| `heading` | 4xl (32px) | semibold | heading | Títulos principais de telas |
| `title` | 2xl (22px) | semibold | body | Títulos de seções |
| `subtitle` | xl (19px) | medium | body | Subtítulos, categorias |
| `body` | md (15px) | regular | body | Texto de corpo padrão |
| `caption` | sm (13px) | regular | body | Legendas, metadados |
| `label` | xs (11px) | medium | ui | Labels de formulário |

### Cores Semânticas

| Cor | Valor | Uso |
|-----|-------|-----|
| `primary` | #FFFFFF | Texto principal (padrão) |
| `secondary` | #B8B8B8 | Texto secundário |
| `accent` | #FF5301 | Destaque Arena |
| `muted` | #B8B8B880 | Texto suave com opacity |
| `inverse` | #1B1D29 | Para fundos claros |
| `success` | #10B981 | Mensagens de sucesso |
| `error` | #EF4444 | Mensagens de erro |
| `warning` | #F59E0B | Avisos |

## 📖 Exemplos de Uso

### Exemplo Básico

```tsx
// Usando variantes predefinidas
<Text variant="display">Arena Sports</Text>
<Text variant="heading">Dashboard</Text>
<Text variant="body">Bem-vindo ao seu dashboard esportivo</Text>
<Text variant="caption" color="secondary">Última atualização: hoje</Text>
```

### Override de Propriedades

```tsx
// Sobrescrevendo propriedades do preset
<Text
  variant="heading"     // preset: 4xl, semibold, heading
  size="5xl"           // override: muda para 5xl
  color="accent"       // override: muda para laranja Arena
>
  Título Customizado
</Text>
```

### Propriedades Individuais

```tsx
// Sem usar variante, definindo tudo manualmente
<Text
  size="3xl"
  weight="bold"
  family="mono"
  color="accent"
  align="center"
  transform="uppercase"
>
  Custom Text
</Text>
```

### Texto Interativo

```tsx
// Texto clicável (automaticamente vira Pressable)
<Text
  variant="body"
  color="accent"
  onPress={() => navigation.navigate('Profile')}
>
  Ver meu perfil
</Text>

// Link com feedback visual
<LinkText onPress={handlePress}>
  Clique aqui para mais informações
</LinkText>
```

### Texto com Comportamento

```tsx
// Texto truncado
<Text
  variant="body"
  numberOfLines={2}
  ellipsizeMode="tail"
>
  Este é um texto muito longo que será truncado após duas linhas...
</Text>

// Texto que se ajusta automaticamente
<Text
  variant="title"
  adjustsFontSizeToFit
  minimumFontScale={0.7}
  numberOfLines={1}
>
  Título que se ajusta ao espaço disponível
</Text>
```

### Acessibilidade

```tsx
<Text
  variant="heading"
  accessibilityRole="header"
  accessibilityLabel="Título da seção de atividades"
  accessibilityHint="Duplo toque para expandir"
>
  Minhas Atividades
</Text>
```

## 🧩 Componentes Especializados

### Componentes por Variante

```tsx
// Equivalentes diretos das variantes
<DisplayText>Hero Title</DisplayText>
<HeadingText>Page Title</HeadingText>
<TitleText>Section Title</TitleText>
<SubtitleText>Subsection</SubtitleText>
<BodyText>Regular content</BodyText>
<CaptionText>Small details</CaptionText>
<LabelText>Form label</LabelText>
```

### Componentes de Estado

```tsx
// Textos coloridos para feedback
<ErrorText>Campo obrigatório</ErrorText>
<SuccessText>Salvo com sucesso!</SuccessText>
<WarningText>Atenção: dados serão perdidos</WarningText>

// Link com cor accent por padrão
<LinkText onPress={handlePress}>
  Link para mais informações
</LinkText>
```

## 🎛️ Props Completas

### Props Principais

```tsx
interface TextProps {
  // Conteúdo
  children: React.ReactNode;

  // Sistema de variantes
  variant?: 'display' | 'heading' | 'title' | 'subtitle' | 'body' | 'caption' | 'label';

  // Override de propriedades
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';
  weight?: 'light' | 'regular' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  family?: 'heading' | 'body' | 'ui' | 'mono';
  color?: 'primary' | 'secondary' | 'accent' | 'muted' | 'inverse' | 'success' | 'error' | 'warning';

  // Layout
  align?: 'left' | 'center' | 'right' | 'justify';
  transform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';

  // Comportamento
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  adjustsFontSizeToFit?: boolean;
  minimumFontScale?: number;
  selectable?: boolean;

  // Interação
  onPress?: () => void;
  onLongPress?: () => void;

  // Acessibilidade
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: 'text' | 'button' | 'link' | 'header';

  // Styling
  style?: TextStyle | TextStyle[];
  testID?: string;
}
```

## 🔧 Hook useText

O hook `useText` pode ser usado independentemente para casos avançados:

```tsx
import { useText } from '@/components/Text';

const MyCustomTextComponent = ({ children, ...props }) => {
  const { computedStyle, processedProps, isInteractive } = useText(props);

  return (
    <Text style={[computedStyle, customStyle]} {...processedProps}>
      {children}
    </Text>
  );
};
```

### Retorno do Hook

```tsx
interface UseTextReturn {
  computedStyle: TextStyle;           // Estilo final computado
  processedProps: ProcessedProps;     // Props processadas para o Text
  isInteractive: boolean;             // Tem onPress/onLongPress
  hasEllipsis: boolean;               // Tem numberOfLines > 0
  isHeading: boolean;                 // É variante de heading
}
```

## 🎯 Casos de Uso Comuns

### 1. Hierarquia de Títulos

```tsx
const ProfileScreen = () => (
  <ScrollView>
    <DisplayText>João Silva</DisplayText>
    <CaptionText color="secondary">Atleta profissional</CaptionText>

    <HeadingText style={{ marginTop: 32 }}>Estatísticas</HeadingText>
    <TitleText>Corridas este mês</TitleText>
    <BodyText>15 atividades completadas</BodyText>
  </ScrollView>
);
```

### 2. Formulário com Validação

```tsx
const LoginForm = () => (
  <View>
    <LabelText>Email</LabelText>
    <TextInput placeholder="seu@email.com" />
    <ErrorText>Email inválido</ErrorText>

    <LabelText>Senha</LabelText>
    <TextInput secureTextEntry />
    <CaptionText color="muted">Mínimo 8 caracteres</CaptionText>
  </View>
);
```

### 3. Card de Atividade

```tsx
const ActivityCard = ({ activity }) => (
  <Card>
    <TitleText>{activity.name}</TitleText>
    <BodyText numberOfLines={2}>{activity.description}</BodyText>

    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <CaptionText color="secondary">{activity.date}</CaptionText>
      <CaptionText color="accent" weight="medium">{activity.duration}</CaptionText>
    </View>

    <LinkText onPress={() => viewActivity(activity.id)}>
      Ver detalhes
    </LinkText>
  </Card>
);
```

### 4. Estado Empty/Loading

```tsx
const EmptyState = () => (
  <View style={{ alignItems: 'center', padding: 40 }}>
    <HeadingText color="muted">Nenhuma atividade</HeadingText>
    <BodyText align="center" color="secondary">
      Comece registrando sua primeira atividade esportiva
    </BodyText>
    <LinkText onPress={createActivity}>
      Criar atividade
    </LinkText>
  </View>
);
```

## 🎨 Customização Avançada

### Estilos Customizados

```tsx
// Mesclando com estilos customizados
<Text
  variant="heading"
  style={{
    textShadowColor: 'rgba(255, 83, 1, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  }}
>
  Título com Sombra
</Text>

// Array de estilos
<Text
  variant="body"
  style={[
    styles.baseText,
    isActive && styles.activeText,
    { marginTop: spacing }
  ]}
>
  Texto com múltiplos estilos
</Text>
```

### Responsividade

```tsx
// Ajuste baseado em dimensões da tela
const { width } = useWindowDimensions();
const isTablet = width > 768;

<Text
  variant={isTablet ? "display" : "heading"}
  size={isTablet ? "7xl" : "5xl"}
>
  Título Responsivo
</Text>
```

## 📱 Considerações Mobile

### Performance

- **Memoização automática**: Estilos são memoizados para evitar re-cálculos
- **FlatList otimizada**: Use `getItemLayout` quando possível
- **Fontes pré-carregadas**: Verifique se as fontes customizadas estão carregadas

### Acessibilidade

- **VoiceOver/TalkBack**: Todos os textos são acessíveis por padrão
- **Contrast ratio**: Cores seguem WCAG 2.1 AA (4.5:1)
- **Font scaling**: Respeita configurações de acessibilidade do sistema

### Plataformas

- **iOS**: Suporte completo a todas as features
- **Android**: `includeFontPadding: false` para melhor alinhamento
- **Web**: Suporte a `userSelect` para textos selecionáveis

## 🧪 Testes

O componente inclui testes completos cobrindo:

- ✅ Renderização de todas as variantes
- ✅ Override de propriedades
- ✅ Comportamento interativo
- ✅ Acessibilidade
- ✅ Performance (memoização)
- ✅ Estados de erro

```bash
# Executar testes
npm test Text

# Executar com coverage
npm test Text -- --coverage
```

## 🐛 Troubleshooting

### Problemas Comuns

**Q: Fonte não está aparecendo**
```tsx
// ❌ Problema: Fonte não carregada
<Text family="heading">Título</Text>

// ✅ Solução: Verificar se a fonte está em expo-font
import { useFonts } from 'expo-font';
```

**Q: Texto cortado no Android**
```tsx
// ❌ Problema: includeFontPadding
<Text style={{ includeFontPadding: true }}>Texto</Text>

// ✅ Solução: O componente já resolve isso automaticamente
<Text variant="body">Texto</Text>
```

**Q: Cores não seguem tema**
```tsx
// ❌ Problema: Cor hardcoded
<Text style={{ color: '#FF0000' }}>Erro</Text>

// ✅ Solução: Usar cores semânticas
<Text color="error">Erro</Text>
```

## 🔄 Atualizações e Changelog

### v1.0.0 (Atual)
- ✨ Sistema completo de variantes semânticas
- ✨ Componentes especializados
- ✨ Hook useText para casos avançados
- ✨ Testes completos com 95%+ coverage
- ✨ Documentação completa com exemplos

### Roadmap
- 🔮 Suporte a temas claro/escuro
- 🔮 Animações de texto (fade, slide)
- 🔮 Rich text com markdown
- 🔮 Internacionalização (i18n)

---

**💡 Dica**: Use sempre as variantes semânticas ao invés de propriedades individuais. Isso garante consistência e facilita manutenção futura do design system.