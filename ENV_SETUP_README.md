# ⚙️ Configuração de Ambiente - Quick Start

## 🚀 Início Rápido

### Método 1: Script Interativo (Recomendado)

```bash
./setup-env.sh
```

### Método 2: NPM Scripts

```bash
# Desenvolvimento (simulador)
npm run start:dev

# Dispositivo físico
npm run start:device

# Produção
npm run start:prod
```

### Método 3: Manual

```bash
# Escolha o ambiente
npm run env:dev          # localhost
npm run env:device       # IP local
npm run env:prod         # produção

# Depois inicie
npm start
```

---

## 📁 Arquivos de Ambiente

| Arquivo | Uso | Backend | Commit? |
|---------|-----|---------|---------|
| `.env` | Ambiente ativo | Variável | ❌ Não |
| `.env.development` | Template dev | localhost | ✅ Sim |
| `.env.development.device` | Template device | IP local | ✅ Sim |
| `.env.production` | Template prod | Produção | ✅ Sim |
| `.env.example` | Documentação | - | ✅ Sim |

---

## 🎯 Cenários Comuns

### Desenvolvimento Local (Simulador)

```bash
npm run start:dev
```

**O que faz:**
1. Copia `.env.development` para `.env`
2. Configura `API_URL=http://localhost:3000`
3. Inicia o Expo

**Quando usar:** Desenvolvimento no simulador iOS/Android

---

### Teste em Celular Físico

**Opção A: Script Automático**
```bash
./setup-env.sh
# Escolha opção 2 (Device)
# O script detecta seu IP automaticamente
```

**Opção B: Manual**
```bash
# 1. Descubra seu IP
ifconfig | grep "inet " | grep -v 127.0.0.1

# 2. Configure o arquivo
nano .env.development.device
# Substitua 192.168.1.100 pelo seu IP

# 3. Ative o ambiente
npm run env:device

# 4. Inicie
npm start
```

**Quando usar:** Teste em dispositivo físico

---

### Build de Produção

```bash
npm run start:prod
```

**O que faz:**
1. Copia `.env.production` para `.env`
2. Configura URL de produção
3. Inicia com `--no-dev --minify`

**Quando usar:** Build para loja/produção

---

## 🔧 Comandos Úteis

### Verificar Ambiente Atual

```bash
cat .env | grep API_URL
```

### Testar Conexão com Backend

```bash
curl http://localhost:3000/api/v1/health
```

### Limpar Cache

```bash
npm run clean
```

### Ver Logs do Expo

```bash
# Já rodando em background?
npx react-native log-ios     # iOS
npx react-native log-android # Android
```

---

## 🐛 Problemas Comuns

### "Network request failed"

✅ **Solução:**
```bash
# 1. Verifique se backend está rodando
curl http://localhost:3000/api/v1/health

# 2. Reconfigure o ambiente
npm run env:dev

# 3. Limpe o cache
expo start --clear
```

### Dispositivo não conecta

✅ **Checklist:**
- [ ] Backend rodando?
- [ ] Mesma rede Wi-Fi?
- [ ] IP correto no `.env`?
- [ ] Firewall liberado?

```bash
# Verifique IP configurado
grep EXPO_PUBLIC_API_URL .env

# Teste conectividade do celular
# Abra no navegador do celular: http://SEU_IP:3000
```

---

## 📚 Documentação Completa

Para guia detalhado, veja: [DEVELOPMENT_SETUP.md](./DEVELOPMENT_SETUP.md)

---

## 🆘 Ajuda Rápida

```bash
# Script interativo
./setup-env.sh

# Ver ambiente atual
./setup-env.sh info

# Verificar backend
./setup-env.sh check

# Configurar dev
./setup-env.sh dev

# Configurar device
./setup-env.sh device

# Configurar prod
./setup-env.sh prod
```

---

**Última atualização**: 2025-10-01
