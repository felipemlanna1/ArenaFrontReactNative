#!/bin/bash

# Script para carregar variáveis de ambiente do MCP Trello
# Uso: source ./load-mcp-env.sh

ENV_FILE=".env.mcp"

if [ ! -f "$ENV_FILE" ]; then
  echo "❌ Erro: Arquivo $ENV_FILE não encontrado"
  echo "📝 Crie o arquivo a partir do template .env.mcp.example"
  return 1
fi

echo "📦 Carregando variáveis de ambiente do $ENV_FILE..."

export $(grep -v '^#' $ENV_FILE | xargs)

if [ -z "$TRELLO_API_KEY" ] || [ "$TRELLO_API_KEY" = "COLE_SUA_API_KEY_AQUI" ]; then
  echo "⚠️  TRELLO_API_KEY não configurada!"
  echo "   Obtenha em: https://trello.com/app-key"
  return 1
fi

if [ -z "$TRELLO_TOKEN" ]; then
  echo "❌ TRELLO_TOKEN não configurado!"
  return 1
fi

echo "✅ Variáveis carregadas com sucesso:"
echo "   TRELLO_API_KEY: ${TRELLO_API_KEY:0:20}..."
echo "   TRELLO_TOKEN: ${TRELLO_TOKEN:0:20}..."
echo "   TRELLO_BOARD_ID: ${TRELLO_BOARD_ID:-não configurado}"
echo ""
echo "🚀 Você pode agora usar o Claude Code com integração Trello"
