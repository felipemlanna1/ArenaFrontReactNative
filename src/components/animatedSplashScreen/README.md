# AnimatedSplashScreen

Componente de splash screen animada para o aplicativo Arena com bolas de esportes flutuando no fundo.

## 🎯 Objetivo

Criar uma experiência visual atraente durante o carregamento inicial do app, com animações suaves de bolas de esportes flutuando como estrelas em um céu noturno.

## 🎨 Design

- **Fundo**: Azul escuro Arena (`#1B1D29`)
- **Logo**: Logo Arena branco centralizado com animação de entrada
- **Animações**: Bolas de esportes flutuando de baixo para cima com rotação
- **Cores**: Laranja Arena (`#FF5301`) para as bolas com opacidade reduzida

## 📦 Props

```typescript
interface AnimatedSplashScreenProps {
  onAnimationComplete?: () => void; // Callback quando a animação termina
}
```

## 💻 Uso

```tsx
import { AnimatedSplashScreen } from '@/components/animatedSplashScreen';

// No App.tsx ou tela inicial
const [splashVisible, setSplashVisible] = useState(true);

if (splashVisible) {
  return (
    <AnimatedSplashScreen onAnimationComplete={() => setSplashVisible(false)} />
  );
}
```

## 🎮 Animações

### Bolas de Esportes

- **Movimento**: Translação vertical de baixo para cima
- **Rotação**: 360 graus durante o movimento
- **Duração**: Entre 18-25 segundos (variável por bola)
- **Delay**: Escalonado para criar movimento orgânico
- **Opacidade**: 0.11 - 0.15 para efeito sutil

### Logo

- **Fade In**: 1 segundo
- **Scale**: De 0.8 para 1 com spring animation
- **Posição**: Centralizado na tela

## 🏀 Esportes Incluídos

1. Futebol
2. Basquete
3. Vôlei
4. Tênis
5. Baseball
6. Soccer
7. Golf
8. Rugby

## ⚡ Performance

- Usa `useNativeDriver: true` para todas as animações
- Animações otimizadas para 60 FPS
- Componentes leves com ícones vetoriais

## 🔧 Personalização

Para adicionar novos esportes ou ajustar animações, edite o array `SPORT_BALLS` no componente principal.
