# 🚀 Quick Start: Trello MCP Integration

## ✅ Status Atual

- ✅ Package MCP encontrado: `@delorenj/mcp-server-trello` (Recomendado - Melhor performance)
- ✅ Configuração [.mcp.json](.mcp.json) atualizada
- ✅ Token do Trello já configurado no [.env.mcp](.env.mcp)
- ⚠️ **FALTA APENAS**: API Key do Trello

---

## 🔑 Passo 1: Criar Power-Up e Gerar API Key (5 minutos)

### 1.1 Criar um Power-Up (necessário para gerar API Key)

1. Acesse: https://trello.com/power-ups/admin
2. Clique em **"New"** (ou "Create Power-Up")
3. Preencha:
   - **Name**: `MCP Integration` (ou qualquer nome)
   - **Workspace**: Selecione seu workspace do Trello
4. Clique em **"Create"**

### 1.2 Gerar API Key

1. Ainda em https://trello.com/power-ups/admin
2. Clique no Power-Up que você acabou de criar
3. Vá para a aba **"API Key"**
4. Clique em **"Generate a new API Key"**
5. Copie a **API Key** (32 caracteres)

### 1.3 Gerar Token (se ainda não tiver)

1. Na mesma página da API Key, clique no link **"Token"** (ao lado da API Key)
2. Clique em **"Allow"** para autorizar
3. Copie o **Token** gerado

### 1.4 Atualizar o arquivo .env.mcp

1. Abra o arquivo [.env.mcp](.env.mcp)
2. Cole a API Key e o Token:

```bash
TRELLO_API_KEY=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
TRELLO_TOKEN=ATATT3xFfGF0S63w6qXViZ...
```

---

## 🔄 Passo 2: Carregar Variáveis de Ambiente

**Opção A: No terminal atual** (temporário)

```bash
source ./load-mcp-env.sh
```

**Opção B: Permanente** (adicionar ao `~/.zshrc`)

```bash
echo 'export TRELLO_API_KEY="sua_api_key_aqui"' >> ~/.zshrc
echo 'export TRELLO_TOKEN="ATATT3xFfGF0S63w6qXViZ..."' >> ~/.zshrc
source ~/.zshrc
```

---

## 🔌 Passo 3: Reiniciar Claude Code

**IMPORTANTE**: Claude Code precisa ser reiniciado para reconhecer o novo MCP server.

1. Feche completamente o Claude Code (⌘+Q no Mac)
2. Reabra o Claude Code
3. O servidor Trello será carregado automaticamente

---

## 🧪 Passo 4: Testar Integração

Dentro do Claude Code, use o comando:

```
/mcp
```

Você deve ver o servidor **"trello"** listado com status **"connected"**.

Ou peça ao Claude:

```
"Liste minhas boards do Trello"
"Quais são os cards da minha board principal?"
"Crie um card no Trello com título 'Test MCP Integration'"
```

---

## 🛠️ Ferramentas Disponíveis (19 tools)

O servidor `@delorenj/mcp-server-trello` oferece:

### Boards
- `list_boards` - Listar todas as boards
- `get_board` - Detalhes de uma board específica
- `create_board` - Criar nova board
- `update_board` - Atualizar board
- `delete_board` - Deletar board

### Lists
- `get_lists` - Listar listas de uma board
- `create_list` - Criar nova lista
- `update_list` - Atualizar lista
- `archive_list` - Arquivar lista

### Cards
- `get_cards` - Listar cards de uma lista
- `get_card` - Detalhes de um card
- `create_card` - Criar novo card
- `update_card` - Atualizar card
- `move_card` - Mover card para outra lista
- `archive_card` - Arquivar card
- `delete_card` - Deletar card

### Extras
- `add_comment` - Adicionar comentário em card
- `add_checklist` - Adicionar checklist em card
- `search_cards` - Buscar cards

---

## ⚡ Performance

Este servidor usa **Bun runtime**, resultando em:
- 🚀 **2.8-4.4x mais rápido** que outras implementações
- ✅ **Rate limiting automático** (respeita limites da API Trello)
- ✅ **Type-safe** (TypeScript com validação completa)
- ✅ **Error handling robusto**

---

## 🔍 Troubleshooting

### Servidor não aparece em `/mcp`

1. Verifique se as variáveis de ambiente estão carregadas:
   ```bash
   echo $TRELLO_API_KEY
   echo $TRELLO_TOKEN
   ```

2. Teste o servidor manualmente:
   ```bash
   npx @delorenj/mcp-server-trello
   ```
   Não deve exibir erro de variáveis faltando.

3. Reinicie o Claude Code completamente.

### Erro: "TRELLO_API_KEY environment variable is required"

- As variáveis de ambiente não foram carregadas
- Execute: `source ./load-mcp-env.sh`
- Ou adicione ao `~/.zshrc` permanentemente

### Erro: "Invalid API key or token"

- Verifique se copiou as credenciais corretas em https://trello.com/app-key
- API Key e Token são diferentes - certifique-se de ter ambos

---

## 📚 Documentação Completa

- [MCP Trello Server - GitHub](https://github.com/delorenj/mcp-server-trello)
- [NPM Package](https://www.npmjs.com/package/@delorenj/mcp-server-trello)
- [Trello API Documentation](https://developer.atlassian.com/cloud/trello/rest/)
- [Claude Code MCP Guide](https://code.claude.com/docs/en/mcp.md)

---

**Última atualização**: 2024-12-07
**Package**: `@delorenj/mcp-server-trello`
**Status**: ✅ Pronto para uso (falta apenas API Key)
