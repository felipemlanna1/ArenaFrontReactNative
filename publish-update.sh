#!/bin/bash

# 🚀 Script de Publicação EAS Update - Arena App
# Uso: ./publish-update.sh "mensagem do commit"

set -e  # Parar em caso de erro

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}   🏀 Arena App - EAS Update Publisher    ${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Verificar se mensagem foi fornecida
if [ -z "$1" ]; then
  echo -e "${RED}❌ Erro: Mensagem de commit não fornecida${NC}"
  echo -e "${YELLOW}Uso: ./publish-update.sh \"feat: nova funcionalidade\"${NC}"
  exit 1
fi

MESSAGE="$1"

# Verificar se está logado no EAS
echo -e "${BLUE}🔐 Verificando login no EAS...${NC}"
if ! npx eas whoami > /dev/null 2>&1; then
  echo -e "${RED}❌ Não está logado no EAS${NC}"
  echo -e "${YELLOW}Execute: npx eas login${NC}"
  exit 1
fi

USER=$(npx eas whoami)
echo -e "${GREEN}✅ Logado como: ${USER}${NC}"
echo ""

# Confirmar publicação
echo -e "${YELLOW}📦 Pronto para publicar update:${NC}"
echo -e "   Mensagem: ${MESSAGE}"
echo -e "   Branch: main"
echo -e "   Backend: Production"
echo ""
read -p "Continuar? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo -e "${RED}❌ Publicação cancelada${NC}"
  exit 0
fi

# Publicar update
echo ""
echo -e "${BLUE}🚀 Publicando update...${NC}"
echo ""

EXPO_PUBLIC_API_URL=https://backsportpulsemobile-production.up.railway.app \
EXPO_PUBLIC_API_TIMEOUT=30000 \
EXPO_PUBLIC_ENVIRONMENT=production \
npx eas update --branch main --message "$MESSAGE"

# Verificar sucesso
if [ $? -eq 0 ]; then
  echo ""
  echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  echo -e "${GREEN}   ✅ Update publicado com sucesso!       ${NC}"
  echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  echo ""
  echo -e "${BLUE}📱 Os testadores receberão o update ao reabrir o app!${NC}"
  echo ""
  echo -e "${YELLOW}🔗 Link para testadores:${NC}"
  echo -e "exp://u.expo.dev/ae9ae6e3-e3f6-4cda-949f-f073d0b44b3b?channel-name=production&runtime-version=1.0.2"
  echo ""
  echo -e "${BLUE}📊 Dashboard: https://expo.dev/accounts/felipemlanna1/projects/arena-app${NC}"
  echo ""
else
  echo ""
  echo -e "${RED}❌ Erro ao publicar update${NC}"
  exit 1
fi
