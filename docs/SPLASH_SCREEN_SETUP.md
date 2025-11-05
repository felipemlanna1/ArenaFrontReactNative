# 🎨 Configuração de Ícones e Splash Screen - Arena

## ✅ O que foi configurado

### 1. **Ícones do Aplicativo**
- **icon.png** (1024x1024): Ícone principal usando o símbolo Arena
- **adaptive-icon.png** (1024x1024): Ícone adaptativo para Android
- **favicon.png** (192x192): Favicon para versão web

### 2. **Splash Screen**
- **splash-icon.png** (1284x2778): Tela de abertura com logo Arena
- **Cor de fundo**: Azul escuro Arena (#1B1D29)
- **Logo**: Branco centralizado

### 3. **Splash Screen Animada (React Native)**
- Componente customizado com animações de bolas flutuando
- Localização: `/src/components/animatedSplashScreen/`

## 🚀 Como usar a Splash Screen Animada

### Passo 1: Importar no App.tsx

```tsx
import React, { useState, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { AnimatedSplashScreen } from '@/components/animatedSplashScreen';

// Previne que a splash screen nativa seja escondida automaticamente
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [showAnimatedSplash, setShowAnimatedSplash] = useState(true);

  useEffect(() => {
    async function prepare() {
      try {
        // Carregue seus recursos aqui (fontes, dados, etc.)
        await loadFonts();
        await loadInitialData();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        // Esconde a splash screen nativa
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  // Mostra a splash animada enquanto carrega
  if (!appIsReady || showAnimatedSplash) {
    return (
      <AnimatedSplashScreen
        onAnimationComplete={() => setShowAnimatedSplash(false)}
      />
    );
  }

  // Seu app normal
  return <Navigation />;
}
```

### Passo 2: Configurar tempo de exibição

Por padrão, a splash animada é exibida por 3 segundos. Para alterar:

```tsx
// Em AnimatedSplashScreen/index.tsx
if (onAnimationComplete) {
  setTimeout(onAnimationComplete, 5000); // 5 segundos
}
```

## 🛠️ Como gerar novos assets

### Script Automático

```bash
# Gera todos os assets automaticamente
node scripts/generate-arena-assets.js
```

### Manualmente

1. Abra `arena-assets-generator.html` em um navegador
2. Clique nos botões de download para cada asset
3. Mova os arquivos para a pasta `/assets/`

## 📱 Aplicar mudanças no build

### Para desenvolvimento

```bash
# Limpar cache e recompilar
npx expo start -c
```

### Para produção

```bash
# Gerar build de desenvolvimento
npx expo prebuild

# iOS
cd ios && pod install
npx expo run:ios

# Android
npx expo run:android
```

### Build de produção com EAS

```bash
# Build para ambas plataformas
eas build --platform all

# Apenas iOS
eas build --platform ios

# Apenas Android
eas build --platform android
```

## 🎨 Personalização

### Cores do tema Arena

```typescript
// constants/arenaTokens.ts
export const ArenaColors = {
  brand: {
    primary: '#FF5301', // Laranja
  },
  neutral: {
    darkest: '#1B1D29', // Azul escuro
    light: '#FFFFFF',   // Branco
  },
};
```

### Adicionar novos esportes na animação

Edite o array `SPORT_BALLS` em `/src/components/animatedSplashScreen/index.tsx`:

```typescript
const SPORT_BALLS: SportBall[] = [
  {
    id: 'swimming',
    icon: 'swim',
    iconFamily: 'MaterialCommunityIcons',
    size: 35,
    left: '45%',
    duration: 20000,
    delay: 2000,
    opacity: 0.13,
  },
  // ... outros esportes
];
```

## 📝 Checklist de Verificação

- [x] Ícone do app configurado
- [x] Ícone adaptativo Android configurado
- [x] Favicon configurado
- [x] Splash screen estática configurada
- [x] Splash screen animada criada
- [x] Cores do tema Arena aplicadas
- [x] Script de geração de assets criado
- [x] Documentação completa

## 🔍 Solução de Problemas

### Ícone não aparece no Android

```bash
# Limpar e reconstruir
cd android
./gradlew clean
cd ..
npx expo run:android
```

### Ícone não aparece no iOS

```bash
# Limpar e reconstruir
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
npx expo run:ios
```

### Splash screen não muda

1. Limpe o cache: `npx expo start -c`
2. Delete o app do dispositivo/emulador
3. Reinstale o app

## 📚 Recursos Adicionais

- [Expo Icons Documentation](https://docs.expo.dev/develop/user-interface/icons/)
- [Expo Splash Screen](https://docs.expo.dev/develop/user-interface/splash-screen/)
- [React Native Animated API](https://reactnative.dev/docs/animated)
- [Arena Design System](../CLAUDE.md)