# 🔑 Gerar Novo Token do Trello

## ⚠️ Problema Detectado

O token atual está **inválido** ou **expirou**. Você precisa gerar um novo token associado à sua API Key.

---

## 🚀 Solução: Gerar Token (1 minuto)

### Passo 1: Clique no link abaixo

**IMPORTANTE**: Cole esta URL completa no navegador:

```
https://trello.com/1/authorize?key=b7a0afd3e74841b6c4387e3b92f040ba&name=MCP+Integration&scope=read,write&expiration=never&response_type=token
```

Ou clique aqui: [Gerar Token do Trello](https://trello.com/1/authorize?key=b7a0afd3e74841b6c4387e3b92f040ba&name=MCP+Integration&scope=read,write&expiration=never&response_type=token)

### Passo 2: Autorizar

1. Você verá uma página pedindo autorização
2. Clique em **"Allow"** (Permitir)

### Passo 3: Copiar Token

1. Após clicar em "Allow", você verá uma página com o **token**
2. Copie o token completo (começa com `ATTA...`)

### Passo 4: Atualizar .env.mcp

1. Abra o arquivo [.env.mcp](.env.mcp)
2. Substitua a linha do token pela nova:

```bash
TRELLO_TOKEN=NOVO_TOKEN_AQUI
```

---

## 📋 Sobre as Permissões

O token gerado terá:
- ✅ **Escopo**: Read + Write (ler e escrever)
- ✅ **Expiração**: Never (nunca expira)
- ✅ **Aplicação**: MCP Integration

---

## 🔄 Depois de atualizar:

```bash
# 1. Carregar variáveis (ou reiniciar terminal)
source ./load-mcp-env.sh

# 2. Reiniciar Claude Code
# Fechar completamente (⌘+Q) e reabrir

# 3. Testar
# Peça ao Claude: "Liste minhas boards do Trello"
```

---

**Última atualização**: 2024-12-07
