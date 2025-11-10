# 🚀 Guia de Atualização EAS - Arena App

Este documento contém os passos completos para publicar atualizações do Arena para testadores iOS/Android via Expo Go.

## 📋 Pré-requisitos

- Node.js instalado
- Expo CLI configurado
- Login no EAS feito (`npx eas whoami` para verificar)

## 🔄 Como Publicar Atualizações

### Opção 1: Atualização Rápida (Recomendada)

Para publicar uma atualização apontando para o **backend de produção**:

```bash
EXPO_PUBLIC_API_URL=https://backsportpulsemobile-production.up.railway.app \
EXPO_PUBLIC_API_TIMEOUT=30000 \
EXPO_PUBLIC_ENVIRONMENT=production \
npx eas update --branch main --message "Descrição da atualização"
```

### Opção 2: Atualização para Desenvolvimento/Testes

Para publicar apontando para **backend local** ou de desenvolvimento:

```bash
EXPO_PUBLIC_API_URL=http://localhost:3000 \
EXPO_PUBLIC_API_TIMEOUT=30000 \
EXPO_PUBLIC_ENVIRONMENT=development \
npx eas update --branch main --message "Versão de testes"
```

## 📱 Informações para Testadores

### Link Direto (mais fácil)

```
exp://u.expo.dev/ae9ae6e3-e3f6-4cda-949f-f073d0b44b3b?channel-name=production&runtime-version=1.0.2
```

### Instruções para Testadores

1. Instalar **Expo Go** da App Store: https://apps.apple.com/app/expo-go/id982107779
2. Abrir o link acima no Safari do iPhone
3. O app abrirá automaticamente no Expo Go

**OU**

1. Abrir o Expo Go
2. Fazer login com: `felipemlanna1`
3. Tocar no projeto "Arena"

## 🔧 Comandos Úteis

### Verificar Status dos Channels

```bash
npx eas channel:list
```

### Verificar Quem Está Logado

```bash
npx eas whoami
```

### Criar Nova Branch

```bash
npx eas update --branch nome-da-branch --message "Mensagem"
```

### Mudar Channel de Branch

```bash
npx eas channel:edit production --branch nome-da-outra-branch
```

## 📊 Estrutura Atual

- **Channel**: `production`
- **Branch**: `main` (referência principal)
- **Runtime Version**: `1.0.2` (vinculada à versão no app.json)
- **Backend**: `https://backsportpulsemobile-production.up.railway.app`

## ⚙️ Configurações Importantes

### app.json

```json
{
  "expo": {
    "version": "1.0.2",
    "runtimeVersion": {
      "policy": "appVersion"
    },
    "updates": {
      "url": "https://u.expo.dev/ae9ae6e3-e3f6-4cda-949f-f073d0b44b3b"
    }
  }
}
```

### eas.json

O projeto já possui o `eas.json` configurado com 3 profiles:

- **development**: Build de desenvolvimento
- **preview**: Build preview (APK) com backend de produção
- **production**: Build de produção (store)

## 🚨 Troubleshooting

### Erro: "There is no channel named production"

**Solução**: Criar o channel primeiro

```bash
npx eas channel:create production
```

### Erro: "Hermes is not enabled"

**Solução**: Verificar arquivos de configuração

- Android: `/android/gradle.properties` → `hermesEnabled=true`
- iOS: `/ios/Podfile.properties.json` → `"expo.jsEngine": "hermes"`

### Build não funciona no Expo Go

**Motivo**: O app tem dependências nativas não suportadas pelo Expo Go.

**Solução**: Criar uma **Development Build**:

```bash
npx eas build --platform ios --profile development
```

Distribuir o link da build para os testadores instalarem.

## 📦 Quando Usar Cada Método

| Método                | Uso                       | Vantagens                  | Limitações                       |
| --------------------- | ------------------------- | -------------------------- | -------------------------------- |
| **EAS Update**        | Atualizações de código JS | Instantâneo, sem rebuild   | Só código JS/assets              |
| **Expo Go**           | Testes rápidos            | Gratuito, sem build        | Bibliotecas limitadas            |
| **Development Build** | Código nativo customizado | Funcionalidades completas  | Precisa fazer build              |
| **TestFlight**        | Testes oficiais iOS       | Distribuição oficial Apple | Requer conta Developer ($99/ano) |

## 🔄 Fluxo de Trabalho Recomendado

### Para Mudanças de Código JS (UI, lógica, etc.)

1. Fazer as alterações no código
2. Testar localmente: `npm start`
3. Publicar update:
   ```bash
   EXPO_PUBLIC_API_URL=https://backsportpulsemobile-production.up.railway.app \
   EXPO_PUBLIC_API_TIMEOUT=30000 \
   EXPO_PUBLIC_ENVIRONMENT=production \
   npx eas update --branch main --message "fix: correção no login"
   ```
4. Testadores abrem o app → update automático

### Para Mudanças Nativas (bibliotecas, configs, etc.)

1. Fazer as alterações
2. Atualizar versão no `app.json`: `"version": "1.0.3"`
3. Criar nova build:
   ```bash
   npx eas build --platform ios --profile preview
   ```
4. Distribuir novo link de instalação

## 📝 Template de Mensagem de Update

Para facilitar, use este template ao publicar updates:

**Fix/Correção**:

```bash
npx eas update --branch main --message "fix: correção no carregamento de eventos"
```

**Feature/Funcionalidade**:

```bash
npx eas update --branch main --message "feat: adicionar filtro de esportes"
```

**Performance**:

```bash
npx eas update --branch main --message "perf: otimização no FlatList de eventos"
```

## 🔗 Links Úteis

- **EAS Dashboard**: https://expo.dev/accounts/felipemlanna1/projects/arena-app
- **Documentação EAS Update**: https://docs.expo.dev/eas-update/introduction/
- **Documentação Expo Go**: https://docs.expo.dev/get-started/expo-go/
- **Project ID**: `ae9ae6e3-e3f6-4cda-949f-f073d0b44b3b`

## 🤖 Prompt para IA (Claude Code)

Quando quiser que a IA publique uma atualização, use este prompt:

```
Publique uma atualização EAS do Arena para os testadores usando o backend de produção.
A atualização inclui: [descreva as mudanças].
Use a branch main e gere uma mensagem de commit apropriada.
```

A IA executará automaticamente:

```bash
EXPO_PUBLIC_API_URL=https://backsportpulsemobile-production.up.railway.app \
EXPO_PUBLIC_API_TIMEOUT=30000 \
EXPO_PUBLIC_ENVIRONMENT=production \
npx eas update --branch main --message "[mensagem gerada]"
```

---

**Última Atualização**: 2025-11-07
**Versão Atual**: 1.0.2
**Maintainer**: @felipemlanna1
