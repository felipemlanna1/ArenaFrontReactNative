# Guia de Ícones - Arena Mobile

## 📦 Biblioteca de Ícones

Este projeto usa **@expo/vector-icons**, que inclui as seguintes bibliotecas:

- **Ionicons** (recomendado para iOS/Material)
- **MaterialIcons** (Material Design)
- **MaterialCommunityIcons** (Material Design extendido)
- **FontAwesome** / **FontAwesome5** / **FontAwesome6**
- **AntDesign**
- **Entypo**
- **Feather**
- **Foundation**
- **EvilIcons**
- **Octicons**
- **SimpleLineIcons**
- **Zocial**

## 🎯 Como Usar Ícones

### Importação Básica

```tsx
import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { ArenaColors } from '@/constants';

// Usar diretamente
<Ionicons name="home" size={24} color={ArenaColors.brand.primary} />
<MaterialIcons name="search" size={24} color={ArenaColors.neutral.dark} />
<AntDesign name="google" size={24} color={ArenaColors.neutral.darkest} />
```

### Criar Componente de Ícone Reutilizável

```tsx
// src/components/icons/HomeIcon.tsx
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ArenaColors } from '@/constants';

interface HomeIconProps {
  size?: number;
  color?: string;
  testID?: string;
}

export const HomeIcon: React.FC<HomeIconProps> = ({
  size = 24,
  color = ArenaColors.neutral.darkest,
  testID = 'home-icon',
}) => {
  return <Ionicons name="home" size={size} color={color} testID={testID} />;
};
```

## 🔍 Ícones Mais Usados

### Navegação e Ações

| Ícone | Biblioteca | Nome | Uso |
|-------|-----------|------|-----|
| 🏠 | Ionicons | `home` / `home-outline` | Home |
| 🔍 | Ionicons | `search` / `search-outline` | Busca |
| ⚙️ | Ionicons | `settings` / `settings-outline` | Configurações |
| 👤 | Ionicons | `person` / `person-outline` | Perfil |
| 📊 | Ionicons | `stats-chart` / `stats-chart-outline` | Estatísticas |
| ❤️ | Ionicons | `heart` / `heart-outline` | Favorito |
| ➕ | Ionicons | `add` / `add-circle-outline` | Adicionar |
| ✏️ | Ionicons | `create` / `create-outline` | Editar |
| 🗑️ | Ionicons | `trash` / `trash-outline` | Deletar |
| ↩️ | Ionicons | `arrow-back` | Voltar |
| → | Ionicons | `arrow-forward` | Avançar |
| ☰ | Ionicons | `menu` / `menu-outline` | Menu |
| × | Ionicons | `close` / `close-circle-outline` | Fechar |

### Esportes (Arena específicos)

| Ícone | Biblioteca | Nome | Uso |
|-------|-----------|------|-----|
| ⚽ | Ionicons | `football` / `football-outline` | Futebol |
| 🏀 | Ionicons | `basketball` / `basketball-outline` | Basquete |
| 🏈 | Ionicons | `american-football` / `american-football-outline` | Futebol Americano |
| ⚾ | Ionicons | `baseball` / `baseball-outline` | Beisebol |
| 🏐 | MaterialCommunityIcons | `volleyball` | Vôlei |
| 🎾 | Ionicons | `tennisball` / `tennisball-outline` | Tênis |
| 🏆 | Ionicons | `trophy` / `trophy-outline` | Troféu |
| 🥇 | Ionicons | `medal` / `medal-outline` | Medalha |
| ⏱️ | Ionicons | `stopwatch` / `stopwatch-outline` | Cronômetro |
| 📅 | Ionicons | `calendar` / `calendar-outline` | Calendário |

### Login e Autenticação

| Ícone | Biblioteca | Nome | Uso |
|-------|-----------|------|-----|
| 📧 | Ionicons | `mail` / `mail-outline` | Email |
| 🔒 | Ionicons | `lock-closed` / `lock-closed-outline` | Senha |
| 👁️ | Ionicons | `eye` / `eye-outline` | Mostrar senha |
| 🙈 | Ionicons | `eye-off` / `eye-off-outline` | Ocultar senha |
|  | Ionicons | `logo-google` | Google (use AntDesign) |
|  | Ionicons | `logo-apple` | Apple |
|  | Ionicons | `logo-facebook` | Facebook |
| 🔑 | Ionicons | `key` / `key-outline` | Chave/Acesso |

### Interface e Feedback

| Ícone | Biblioteca | Nome | Uso |
|-------|-----------|------|-----|
| ✓ | Ionicons | `checkmark` / `checkmark-circle` | Sucesso |
| ⚠️ | Ionicons | `warning` / `warning-outline` | Aviso |
| ℹ️ | Ionicons | `information-circle` / `information-circle-outline` | Info |
| ⚡ | Ionicons | `flash` / `flash-outline` | Rápido |
| 🔔 | Ionicons | `notifications` / `notifications-outline` | Notificações |
| ⭐ | Ionicons | `star` / `star-outline` | Estrela |
| 📎 | Ionicons | `attach` / `attach-outline` | Anexo |
| 📤 | Ionicons | `share` / `share-outline` | Compartilhar |
| 🔄 | Ionicons | `refresh` / `refresh-outline` | Recarregar |
| ⬇️ | Ionicons | `download` / `download-outline` | Download |

## 🎨 Padrões Arena

### Tamanhos Recomendados

```tsx
const IconSizes = {
  xs: 16,    // Ícones pequenos em textos
  sm: 20,    // Ícones em botões pequenos
  md: 24,    // Ícone padrão (default)
  lg: 32,    // Ícones de destaque
  xl: 48,    // Ícones grandes em headers
  '2xl': 64, // Ícones de placeholder/estado vazio
};
```

### Cores Recomendadas

```tsx
import { ArenaColors } from '@/constants';

// Ícones primários (ações principais)
color={ArenaColors.brand.primary} // #FF5301

// Ícones secundários (ações secundárias)
color={ArenaColors.neutral.dark} // #20303D

// Ícones neutros (navegação)
color={ArenaColors.neutral.medium} // #B8B8B8

// Ícones claros (fundo escuro)
color={ArenaColors.neutral.light} // #FFFFFF

// Ícones desabilitados
color={ArenaColors.disabled.text}

// Ícones de erro
color={ArenaColors.error.text}

// Ícones de sucesso
color={ArenaColors.success.text}
```

## 📚 Recursos

### Buscar Ícones

- **Ionicons**: https://ionic.io/ionicons
- **Material Icons**: https://fonts.google.com/icons
- **Material Community**: https://pictogrammers.com/library/mdi/
- **FontAwesome**: https://fontawesome.com/icons
- **Expo Icons**: https://icons.expo.fyi/

### Exemplo Completo

```tsx
// src/components/icons/SportIcon.tsx
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ArenaColors } from '@/constants';

export type SportType = 'football' | 'basketball' | 'volleyball' | 'tennis';

interface SportIconProps {
  sport: SportType;
  size?: number;
  color?: string;
}

const sportIconMap: Record<SportType, string> = {
  football: 'football-outline',
  basketball: 'basketball-outline',
  volleyball: 'basketball-outline', // Usar biblioteca alternativa
  tennis: 'tennisball-outline',
};

export const SportIcon: React.FC<SportIconProps> = ({
  sport,
  size = 24,
  color = ArenaColors.brand.primary,
}) => {
  return (
    <Ionicons
      name={sportIconMap[sport] as any}
      size={size}
      color={color}
    />
  );
};
```

## ⚠️ Regras Arena

1. **SEMPRE** usar `@expo/vector-icons` ao invés de SVGs customizados (exceto para branding: Logo, Symbol, AppIcon)
2. **NUNCA** usar valores hardcoded para cores - usar `ArenaColors`
3. **SEMPRE** tipar props do ícone (size, color, testID)
4. **SEMPRE** fornecer `testID` para testes
5. **PREFERIR** Ionicons como biblioteca padrão (melhor suporte iOS/Android)
6. **USAR** `-outline` variants para ícones não preenchidos

## 🔧 Quando Usar SVG Customizado

Use SVG customizado **APENAS** para:
- Logo Arena
- Symbol Arena
- AppIcon Arena
- Ícones de marca de parceiros (quando não disponíveis na lib)
- Ilustrações complexas

Para todos os outros casos, use `@expo/vector-icons`.
