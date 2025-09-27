# Arena - React Native App

Arena é uma plataforma mobile moderna para esportes, desenvolvida com React Native e Expo.

## 🚀 Como Testar o Projeto

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Expo CLI
- Expo Go app no seu dispositivo móvel

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/felipemlanna1/ArenaFrontReactNative.git
cd ArenaFrontReactNative

# 2. Instale as dependências
npm install

# 3. Inicie o projeto
npm start
```

### Testando no Dispositivo

1. **Escaneie o QR Code** que aparece no terminal com o app Expo Go
2. **Ou acesse via navegador**: O Expo irá abrir uma aba no navegador com opções de teste

### Scripts Disponíveis

```bash
# Desenvolvimento
npm start          # Inicia o Expo
npm run android    # Roda no Android
npm run ios        # Roda no iOS
npm run web        # Roda no navegador

# Qualidade de Código
npm run lint       # Executa ESLint
npm run format     # Formata código com Prettier
```

## 🎨 Design System Arena

O projeto utiliza um design system próprio com tokens semânticos:

### Cores
- **Primary**: `#FF5301` (Laranja Arena)
- **Dark**: `#1B1D29` (Azul Escuro)
- **Medium**: `#B8B8B8` (Cinza)
- **Light**: `#FFFFFF` (Branco)

### Uso dos Tokens

```tsx
import { ArenaColors, ArenaSpacing, ArenaTypography } from '@/constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: ArenaColors.neutral.darkest,
    padding: ArenaSpacing.lg,
  },
  title: {
    fontSize: ArenaTypography.size['4xl'],
    color: ArenaColors.brand.primary,
  }
});
```

## 📱 Estrutura do Projeto

```
src/
├── screens/          # Telas do app
│   └── welcome-screen/
├── components/       # Componentes reutilizáveis
├── constants/        # Tokens de design Arena
├── hooks/           # Hooks customizados
├── services/        # APIs e serviços
└── utils/           # Utilitários
```

## 🎯 Funcionalidades Atuais

- ✅ Tela de Boas-vindas Arena
- ✅ Design System implementado
- ✅ TypeScript strict configurado
- ✅ ESLint + Prettier configurados
- ✅ Path aliases funcionando

## 🔜 Próximos Passos

- [ ] Implementar navegação
- [ ] Criar telas de autenticação
- [ ] Adicionar funcionalidades esportivas
- [ ] Integrar APIs

---

**Arena v1.0.0** - Desenvolvido com React Native e ❤️