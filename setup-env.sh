#!/bin/bash
# Arena Mobile - Environment Setup Helper
# Este script facilita a configuração do ambiente de desenvolvimento

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
print_header() {
    echo ""
    echo -e "${BLUE}═══════════════════════════════════════════${NC}"
    echo -e "${BLUE}   Arena Mobile - Environment Setup${NC}"
    echo -e "${BLUE}═══════════════════════════════════════════${NC}"
    echo ""
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

get_local_ip() {
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -1
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        ip addr show | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | cut -d'/' -f1 | head -1
    else
        echo "unknown"
    fi
}

setup_dev() {
    print_info "Configurando ambiente de DESENVOLVIMENTO (localhost)..."
    cp .env.development .env
    print_success "Ambiente DEV configurado!"
    print_info "Backend URL: http://localhost:3000"
    echo ""
    print_warning "Use este ambiente quando estiver usando simulador/emulador"
}

setup_device() {
    local_ip=$(get_local_ip)

    print_info "Configurando ambiente para DISPOSITIVO FÍSICO..."

    if [ "$local_ip" == "unknown" ] || [ -z "$local_ip" ]; then
        print_error "Não foi possível detectar o IP local automaticamente"
        echo ""
        read -p "Digite seu IP local manualmente: " manual_ip
        local_ip=$manual_ip
    else
        print_success "IP local detectado: $local_ip"
        read -p "Este IP está correto? (s/n): " confirm
        if [[ $confirm != "s" && $confirm != "S" ]]; then
            read -p "Digite o IP correto: " manual_ip
            local_ip=$manual_ip
        fi
    fi

    # Criar .env com IP dinâmico
    cat > .env << EOF
# Arena Mobile - Development on Physical Device
# Gerado automaticamente por setup-env.sh

# API Configuration
API_URL=http://${local_ip}:3000/api/v1
EXPO_PUBLIC_API_URL=http://${local_ip}:3000
API_TIMEOUT=30000

# Authentication
AUTH_TOKEN_KEY=@arena:auth_token

# Analytics (disabled in development)
ANALYTICS_ENABLED=false
ANALYTICS_KEY=

# Environment
ENVIRONMENT=development
NODE_ENV=development
EOF

    print_success "Ambiente DEVICE configurado!"
    print_info "Backend URL: http://${local_ip}:3000"
    echo ""
    print_warning "Certifique-se de que:"
    echo "  1. Seu backend está rodando"
    echo "  2. Celular e computador estão na mesma rede Wi-Fi"
    echo "  3. Firewall permite conexões na porta 3000"
}

setup_prod() {
    print_info "Configurando ambiente de PRODUÇÃO..."
    cp .env.production .env
    print_success "Ambiente PROD configurado!"
    print_warning "Lembre-se de configurar a URL de produção correta no arquivo .env"
}

check_backend() {
    print_info "Verificando conexão com backend..."

    if grep -q "localhost" .env; then
        backend_url="http://localhost:3000"
    else
        backend_url=$(grep EXPO_PUBLIC_API_URL .env | cut -d '=' -f2)
    fi

    if curl -s "${backend_url}/api/v1/health" > /dev/null 2>&1; then
        print_success "Backend está respondendo!"
        echo ""
        curl -s "${backend_url}/api/v1/health" | jq . 2>/dev/null || echo ""
    else
        print_error "Backend não está respondendo em ${backend_url}"
        print_warning "Certifique-se de que o backend está rodando"
    fi
}

show_info() {
    if [ -f .env ]; then
        echo ""
        print_info "Ambiente atual:"
        echo ""
        grep -E "API_URL|EXPO_PUBLIC_API_URL|ENVIRONMENT" .env | sed 's/^/  /'
        echo ""
    else
        print_warning "Nenhum ambiente configurado ainda"
    fi
}

# Main menu
print_header

if [ $# -eq 0 ]; then
    show_info
    echo "Escolha o ambiente:"
    echo ""
    echo "  1) Development (localhost - simulador/emulador)"
    echo "  2) Device (IP local - dispositivo físico)"
    echo "  3) Production"
    echo "  4) Verificar conexão com backend"
    echo "  5) Mostrar informações do ambiente atual"
    echo "  0) Sair"
    echo ""
    read -p "Opção: " option

    case $option in
        1)
            setup_dev
            ;;
        2)
            setup_device
            ;;
        3)
            setup_prod
            ;;
        4)
            check_backend
            ;;
        5)
            show_info
            ;;
        0)
            echo "Saindo..."
            exit 0
            ;;
        *)
            print_error "Opção inválida"
            exit 1
            ;;
    esac
else
    case $1 in
        dev|development)
            setup_dev
            ;;
        device|physical)
            setup_device
            ;;
        prod|production)
            setup_prod
            ;;
        check|verify)
            check_backend
            ;;
        info|show)
            show_info
            ;;
        *)
            echo "Uso: ./setup-env.sh [dev|device|prod|check|info]"
            echo ""
            echo "Ou execute sem argumentos para modo interativo"
            exit 1
            ;;
    esac
fi

echo ""
print_success "Configuração concluída!"
echo ""
print_info "Próximos passos:"
echo "  1. Inicie o backend: cd ../BackArena && npm run start:dev"
echo "  2. Inicie o app: npm run start"
echo ""
