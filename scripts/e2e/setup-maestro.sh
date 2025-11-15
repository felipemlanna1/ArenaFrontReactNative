#!/bin/bash
set -e

echo "🎭 Arena E2E Testing Setup - Maestro CLI"
echo "========================================"
echo ""

echo "📋 [1/4] Instalando Maestro CLI..."
if command -v maestro &> /dev/null; then
    echo "   ✅ Maestro já está instalado: $(maestro --version)"
else
    echo "   📥 Baixando e instalando Maestro..."
    curl -fsSL https://get.maestro.dev | bash
    echo "   ✅ Maestro instalado com sucesso!"
fi

# Adicionar ao PATH se necessário
if [[ ":$PATH:" != *":$HOME/.maestro/bin:"* ]]; then
    echo "   ⚙️  Adicionando Maestro ao PATH..."
    echo 'export PATH="$HOME/.maestro/bin:$PATH"' >> ~/.zshrc
    echo 'export PATH="$HOME/.maestro/bin:$PATH"' >> ~/.bashrc
    export PATH="$HOME/.maestro/bin:$PATH"
fi

echo ""
echo "✅ Verificando instalação..."
maestro --version
echo ""

echo "📁 [2/4] Criando estrutura de diretórios..."
mkdir -p .maestro/flows/{auth,events,profile,onboarding}
mkdir -p .maestro/shared
echo "   ✅ Estrutura criada:"
echo "      - .maestro/flows/auth/"
echo "      - .maestro/flows/events/"
echo "      - .maestro/flows/profile/"
echo "      - .maestro/flows/onboarding/"
echo "      - .maestro/shared/"
echo ""

echo "⚙️  [3/4] Criando arquivos de configuração..."

# Config global
if [ ! -f .maestro/config.yaml ]; then
    cat > .maestro/config.yaml << 'EOF'
appId: com.arena.app
name: Arena E2E Tests

# Variáveis de ambiente
env:
  TEST_USER_EMAIL: ${TEST_USER_EMAIL:-test@arena.com}
  TEST_USER_PASSWORD: ${TEST_USER_PASSWORD:-Test@123}
  TEST_USER_NAME: "Usuário Teste Arena"
  BASE_URL: ${BASE_URL:-https://api.arena.dev}

# Tags para organização
tags:
  - regression
  - smoke
  - critical

# Timeout padrão (60s)
timeout: 60000
EOF
    echo "   ✅ config.yaml criado"
else
    echo "   ⚠️  config.yaml já existe (não sobrescrevendo)"
fi

# Template de variáveis de ambiente
if [ ! -f .maestro/.env.example ]; then
    cat > .maestro/.env.example << 'EOF'
# Arena E2E Testing - Environment Variables
# Copiar para .maestro/maestro.env e ajustar valores

# Credenciais de Teste
TEST_USER_EMAIL=test@arena.com
TEST_USER_PASSWORD=Test@123
TEST_USER_NAME=Usuario Teste

# Backend
BASE_URL=https://api.arena.dev

# Opcional: Social Auth (para testes futuros)
# GOOGLE_TEST_EMAIL=
# APPLE_TEST_EMAIL=
EOF
    echo "   ✅ .env.example criado"
else
    echo "   ⚠️  .env.example já existe (não sobrescrevendo)"
fi

# .gitignore
if [ ! -f .maestro/.gitignore ]; then
    cat > .maestro/.gitignore << 'EOF'
# Maestro artifacts
*.png
*.mp4
*.log
maestro-report.xml

# Environment secrets (usar .env.example)
.env
maestro.env

# OS files
.DS_Store
EOF
    echo "   ✅ .gitignore criado"
else
    echo "   ⚠️  .gitignore já existe (não sobrescrevendo)"
fi

echo ""
echo "📝 [4/4] Finalizando setup..."
echo ""

echo "🎉 =========================================="
echo "   Setup concluído com sucesso!"
echo "   =========================================="
echo ""
echo "📚 Próximos passos:"
echo ""
echo "   1. Build o app para testes:"
echo "      $ npx expo run:android"
echo "      $ npx expo run:ios"
echo ""
echo "   2. Gravar seu primeiro teste (interface visual):"
echo "      $ maestro studio"
echo ""
echo "   3. Ou rodar testes existentes:"
echo "      $ maestro test .maestro/flows/"
echo ""
echo "   4. Gerar testes com MaestroGPT:"
echo "      Durante gravação no Studio, digite '/gpt criar teste de login'"
echo ""
echo "📖 Documentação: .maestro/README.md"
echo ""
