# 🚀 Arena Mobile - Guia de Configuração de Desenvolvimento

## 📋 Índice

1. [Ambientes Disponíveis](#ambientes-disponíveis)
2. [Scripts NPM](#scripts-npm)
3. [Configuração do Backend Local](#configuração-do-backend-local)
4. [Uso com Dispositivos Físicos](#uso-com-dispositivos-físicos)
5. [Troubleshooting](#troubleshooting)

---

## 🌍 Ambientes Disponíveis

O projeto Arena Mobile possui 3 ambientes pré-configurados:

### 1. **Development (Simulador/Emulador)**
- Arquivo: `.env.development`
- Backend: `http://localhost:3000`
- Uso: Desenvolvimento em simulador iOS/Android
- Analytics: Desabilitado

### 2. **Development Device (Dispositivo Físico)**
- Arquivo: `.env.development.device`
- Backend: `http://SEU_IP_LOCAL:3000`
- Uso: Teste em celular físico na mesma rede
- Analytics: Desabilitado

### 3. **Production**
- Arquivo: `.env.production`
- Backend: URL de produção configurável
- Uso: Build para produção
- Analytics: Habilitado

---

## 🛠️ Scripts NPM

### Comandos de Início Rápido

```bash
# Desenvolvimento padrão (localhost)
npm run start:dev

# Desenvolvimento em dispositivo físico (tunnel)
npm run start:device

# Produção
npm run start:prod
```

### Comandos por Plataforma

```bash
# Android
npm run android              # Normal
npm run android:dev          # Com ambiente dev

# iOS
npm run ios                  # Normal
npm run ios:dev              # Com ambiente dev

# Web
npm run web                  # Web development
npm run start:web            # Web com PLATFORM=web
```

### Comandos de Ambiente

```bash
# Trocar ambiente manualmente
npm run env:dev              # Configura localhost
npm run env:device           # Configura IP local (você precisa editar o IP)
npm run env:prod             # Configura produção
```

### Outros Comandos

```bash
# Linting e formatação
npm run lint                 # Verifica erros
npm run lint:fix             # Corrige erros automaticamente
npm run format               # Formata código com Prettier

# Testes
npm run test                 # Roda testes
npm run test:watch           # Modo watch

# Limpeza
npm run clean                # Limpa node_modules e reinstala
```

---

## 🖥️ Configuração do Backend Local

### Pré-requisitos

1. Clone o backend Arena:
```bash
cd ~/Documents/GitHub
git clone <url-do-backend-arena>
cd BackArena
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o `.env` do backend:
```bash
cp .env.example .env
# Edite o .env com suas configurações
```

4. Inicie o backend:
```bash
npm run start:dev
```

### Verificar se o Backend está Rodando

```bash
# Teste o endpoint de health
curl http://localhost:3000/api/v1/health
```

### Uso no Mobile

**Simulador/Emulador:**
```bash
# Usa localhost automaticamente
npm run start:dev
```

**Dispositivo Físico:**
```bash
# 1. Descubra seu IP local
ifconfig | grep "inet " | grep -v 127.0.0.1

# 2. Edite .env.development.device
# Substitua 192.168.1.100 pelo seu IP real

# 3. Inicie com tunnel
npm run start:device
```

---

## 📱 Uso com Dispositivos Físicos

### Passo a Passo

#### 1. **Descobrir seu IP Local**

**Mac/Linux:**
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
# Resultado: inet 192.168.1.100 netmask ...
```

**Windows:**
```bash
ipconfig | findstr "IPv4"
# Resultado: IPv4 Address. . . . . . . . . . . : 192.168.1.100
```

#### 2. **Configurar o Arquivo de Ambiente**

Edite `.env.development.device`:
```bash
# Substitua pelo SEU IP
API_URL=http://192.168.1.100:3000/api/v1
EXPO_PUBLIC_API_URL=http://192.168.1.100:3000
```

#### 3. **Iniciar o App**

```bash
npm run start:device
```

#### 4. **Conectar o Dispositivo**

- **Android**: Escaneie o QR code com o app Expo Go
- **iOS**: Escaneie o QR code com a câmera

### Requisitos para Dispositivo Físico

✅ Celular e computador na **mesma rede Wi-Fi**
✅ Backend rodando no computador
✅ IP local configurado corretamente
✅ Porta 3000 acessível (firewall liberado)

### Testar Conexão

No dispositivo, abra o navegador e acesse:
```
http://SEU_IP_LOCAL:3000/api/v1/health
```

Se responder, está tudo certo!

---

## 🐛 Troubleshooting

### Problema: "Network request failed"

**Causa**: App não consegue se conectar ao backend

**Soluções:**

1. **Verifique se o backend está rodando:**
```bash
curl http://localhost:3000/api/v1/health
```

2. **Verifique o ambiente configurado:**
```bash
cat .env | grep API_URL
```

3. **Se usar dispositivo físico, verifique o IP:**
```bash
# Deve ser o IP da sua máquina, não localhost
grep EXPO_PUBLIC_API_URL .env
```

4. **Verifique a rede Wi-Fi:**
- Celular e computador devem estar na **mesma rede**
- Não use VPN durante o desenvolvimento

---

### Problema: "Unable to resolve module @env"

**Causa**: Configuração do react-native-dotenv

**Solução:**
```bash
# 1. Limpe o cache
npm run clean

# 2. Reinicie o bundler
npm run start:dev
```

---

### Problema: Mudanças no .env não aparecem

**Causa**: Cache do Metro Bundler

**Solução:**
```bash
# Limpe o cache e reinicie
expo start --clear
```

---

### Problema: Erro de TypeScript no config.ts

**Causa**: O arquivo `src/services/config.ts` usa `process.env`

**Isso é normal!** O TypeScript pode reclamar mas funciona. O código está preparado para:
- Usar `process.env` (padrão Expo)
- Fallback para valores default
- Suportar tanto desenvolvimento quanto produção

---

### Problema: App não conecta no celular

**Checklist:**

1. ✅ Backend rodando?
```bash
curl http://localhost:3000/api/v1/health
```

2. ✅ Mesma rede Wi-Fi?
```bash
# Verifique o IP do computador
ifconfig | grep "inet "
# Verifique o IP do celular (Configurações > Wi-Fi)
```

3. ✅ IP correto no .env?
```bash
cat .env | grep EXPO_PUBLIC_API_URL
# Deve ser: http://SEU_IP:3000
```

4. ✅ Firewall liberado?
```bash
# Mac: System Preferences > Security > Firewall
# Libere a porta 3000
```

---

## 📝 Notas Importantes

### Variáveis de Ambiente

O projeto usa `process.env` através do Expo. Arquivos `.env` são carregados automaticamente.

### Prioridade de Arquivos

1. `.env` (arquivo ativo)
2. `.env.development` (template dev)
3. `.env.development.device` (template device)
4. `.env.production` (template prod)

### Segurança

⚠️ **NUNCA** commite o arquivo `.env` com valores reais!

Os arquivos de template (`.env.development`, etc) podem ser commitados pois não contêm valores sensíveis.

---

## 🎯 Workflow Recomendado

### Desenvolvimento Local (Simulador)

```bash
npm run start:dev
```

### Teste em Dispositivo Físico

```bash
# 1. Configure o IP
nano .env.development.device

# 2. Ative o ambiente
npm run env:device

# 3. Inicie com tunnel
npm run start:device
```

### Build de Produção

```bash
# 1. Configure produção
npm run env:prod

# 2. Build
npm run start:prod
```

---

## 🔗 Links Úteis

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Arena Backend Repository](https://github.com/...)

---

## 🆘 Precisa de Ajuda?

1. Verifique o [Troubleshooting](#troubleshooting)
2. Consulte o [CLAUDE.md](./CLAUDE.md) para padrões do projeto
3. Abra uma issue no GitHub

---

**Última atualização**: 2025-10-01
