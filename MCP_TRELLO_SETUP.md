# Integração Trello + Claude Code via MCP

Este guia documenta o setup completo da integração do Trello com Claude Code usando Model Context Protocol (MCP).

## 📋 Checklist de Tarefas Manuais

### ✅ 1. Obter Credenciais do Trello

**Link**: https://trello.com/app-key

1. **API Key**: Copie sua chave de API (fica visível na página)
2. **Token**: Clique no botão "Token" e autorize o acesso (token permanente)
3. **Board ID** (opcional): Copie da URL da board desejada
   - Exemplo: `https://trello.com/b/AbCd1234/nome-da-board`
   - Board ID = `AbCd1234`

Guarde essas informações em local seguro (ex: gerenciador de senhas).

---

### ✅ 2. Verificar se existe MCP Server do Trello

Execute no terminal:

```bash
npm search trello-mcp-server
```

**Status Atual** (dezembro 2024): Não há servidor oficial do Trello pela Anthropic.

**Opções**:

#### **Opção A: Servidor Community** (se encontrar)
- Use o package npm encontrado
- Siga as instruções do README do package

#### **Opção B: Criar seu próprio servidor** (recomendado para produção)
- Clone um template MCP: https://github.com/anthropics/mcp-servers-examples
- Implemente usando a Trello REST API: https://developer.atlassian.com/cloud/trello/rest/
- Publique como `npx` package ou use localmente

#### **Opção C: Usar API REST diretamente** (temporário)
- Configure como HTTP MCP server
- Chamadas diretas à API do Trello

---

### ✅ 3. Configurar Variáveis de Ambiente

#### **macOS/Linux** (bash/zsh):

Adicione ao arquivo `~/.zshrc` ou `~/.bashrc`:

```bash
# MCP - Trello Integration
export TRELLO_API_KEY="sua_api_key_aqui"
export TRELLO_TOKEN="seu_token_aqui"
export TRELLO_BOARD_ID="seu_board_id_aqui"
```

Recarregue o shell:

```bash
source ~/.zshrc
```

#### **Windows** (PowerShell):

```powershell
[System.Environment]::SetEnvironmentVariable('TRELLO_API_KEY', 'sua_api_key_aqui', 'User')
[System.Environment]::SetEnvironmentVariable('TRELLO_TOKEN', 'seu_token_aqui', 'User')
[System.Environment]::SetEnvironmentVariable('TRELLO_BOARD_ID', 'seu_board_id_aqui', 'User')
```

#### **Verificar se funcionou**:

```bash
echo $TRELLO_API_KEY
echo $TRELLO_TOKEN
```

Deve exibir os valores configurados (não vazio).

---

### ✅ 4. Instalar MCP Server

#### **Método 1: Via comando CLI** (se houver package npm)

```bash
claude mcp add --transport stdio trello \
  --env TRELLO_API_KEY=${TRELLO_API_KEY} \
  --env TRELLO_TOKEN=${TRELLO_TOKEN} \
  --env TRELLO_BOARD_ID=${TRELLO_BOARD_ID} \
  -- npx -y trello-mcp-server
```

#### **Método 2: Arquivo .mcp.json** (já configurado neste projeto)

O arquivo `.mcp.json` já foi criado na raiz do projeto com a seguinte configuração:

```json
{
  "mcpServers": {
    "trello": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "trello-mcp-server"],
      "env": {
        "TRELLO_API_KEY": "${TRELLO_API_KEY}",
        "TRELLO_TOKEN": "${TRELLO_TOKEN}",
        "TRELLO_BOARD_ID": "${TRELLO_BOARD_ID:-}"
      }
    }
  }
}
```

**⚠️ Importante**: Este arquivo está no `.gitignore` para evitar commit acidental de credenciais.

---

### ✅ 5. Configurar Permissões no Claude Code

O arquivo `.claude/settings.json` já foi criado com permissões para o Trello:

```json
{
  "permissions": {
    "allow": [
      "mcp__trello"
    ]
  }
}
```

Isso permite que o Claude Code use **todos** os tools do servidor Trello.

Para permissões mais granulares:

```json
{
  "permissions": {
    "allow": [
      "mcp__trello__list_boards",
      "mcp__trello__create_card",
      "mcp__trello__update_card",
      "mcp__trello__get_lists"
    ]
  }
}
```

---

### ✅ 6. Testar a Integração

#### **Listar servidores MCP configurados**:

```bash
claude mcp list
```

Deve exibir `trello` na lista.

#### **Ver detalhes do servidor Trello**:

```bash
claude mcp get trello
```

#### **Dentro do Claude Code**:

Use o comando slash:

```
/mcp
```

Isso abrirá uma interface para:
- Ver servidores conectados
- Status de autenticação
- Tools disponíveis

#### **Testar tools do Trello**:

Exemplo de comandos (ajustar conforme os tools disponíveis):

```
/mcp__trello__list_boards
/mcp__trello__create_card "Título do Card" "Descrição"
/mcp__trello__get_lists
```

Ou simplesmente peça ao Claude Code:

```
"Liste minhas boards do Trello"
"Crie um card no Trello com título 'Bug: Login não funciona'"
```

O Claude Code automaticamente usará os tools MCP configurados.

---

## 🔧 Troubleshooting

### Erro: "Server not found"

```bash
claude mcp list
```

Verifique se o nome está correto (deve ser exatamente `trello`).

### Erro: "Invalid credentials"

Verifique se as variáveis de ambiente estão definidas:

```bash
echo $TRELLO_API_KEY
echo $TRELLO_TOKEN
```

Se retornar vazio, recarregue o shell:

```bash
source ~/.zshrc
```

### Erro: "Command not found: npx"

**Windows**: Use `cmd /c npx` no arquivo `.mcp.json`:

```json
{
  "command": "cmd",
  "args": ["/c", "npx", "-y", "trello-mcp-server"]
}
```

**macOS/Linux**: Instale Node.js e npm:

```bash
brew install node
```

### Erro: "Package not found: trello-mcp-server"

O package não existe no npm. Opções:

1. Criar seu próprio MCP server
2. Usar API REST diretamente (HTTP MCP)
3. Aguardar servidor oficial da Anthropic

### MCP Server não carrega ao iniciar Claude Code

Verifique logs:

```bash
claude mcp get trello --debug
```

Verifique se o package existe:

```bash
npx trello-mcp-server --version
```

---

## 📚 Recursos

- **Documentação Oficial MCP**: https://code.claude.com/docs/en/mcp.md
- **Trello API Documentation**: https://developer.atlassian.com/cloud/trello/rest/
- **MCP Servers Examples**: https://github.com/anthropics/mcp-servers-examples
- **Obter Credenciais Trello**: https://trello.com/app-key

---

## 🔒 Segurança

**NUNCA** commite:
- `.env` com credenciais reais
- `.mcp.json` com tokens hardcoded
- Tokens ou API Keys em código

**Sempre use**:
- Variáveis de ambiente (`${TRELLO_API_KEY}`)
- `.gitignore` para arquivos sensíveis
- Gerenciador de senhas para guardar credenciais

**Revise periodicamente**:
- Tokens ativos em https://trello.com/app-key
- Remova tokens não utilizados
- Rotacione credenciais a cada 90 dias (recomendado)

---

## 📝 Notas

- O arquivo `.mcp.json` está no `.gitignore` deste projeto
- Use `.env.mcp.example` como template (copie para `.env` e preencha)
- Permissões MCP estão em `.claude/settings.json`
- Este setup é **local** - cada desenvolvedor precisa configurar suas próprias credenciais

---

**Última atualização**: 2024-12-07
**Status**: Aguardando disponibilidade de MCP server oficial do Trello
