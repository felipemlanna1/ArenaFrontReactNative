# 🚀 Quick Start - Publicar Atualizações

Guia rápido para publicar atualizações do Arena para testadores.

## 📱 Método 1: NPM Scripts (Mais Simples)

```bash
# Publicar para PRODUÇÃO (backend de produção)
npm run publish:prod -- --message "feat: nova funcionalidade"

# Publicar para DESENVOLVIMENTO (backend local)
npm run publish:dev -- --message "test: testando feature"

# Ver status dos channels
npm run channel:list

# Ver detalhes do channel production
npm run channel:view
```

## 🔧 Método 2: Script Shell (Interativo)

```bash
# Executar o script interativo
./publish-update.sh "feat: adicionar filtro de eventos"
```

O script vai:
- ✅ Verificar se você está logado
- ✅ Confirmar antes de publicar
- ✅ Mostrar link para testadores
- ✅ Output colorido e claro

## 📋 Método 3: Comando Manual (Completo)

```bash
EXPO_PUBLIC_API_URL=https://backsportpulsemobile-production.up.railway.app \
EXPO_PUBLIC_API_TIMEOUT=30000 \
EXPO_PUBLIC_ENVIRONMENT=production \
npx eas update --branch main --message "sua mensagem aqui"
```

## 🤖 Método 4: Via Claude Code (IA)

Use este prompt no Claude Code:

```
Publique uma atualização EAS do Arena para os testadores.
Mudanças: [descreva suas mudanças aqui]
```

A IA executará automaticamente o comando correto.

## 📱 Link para Testadores

Após publicar, compartilhe este link:

```
exp://u.expo.dev/ae9ae6e3-e3f6-4cda-949f-f073d0b44b3b?channel-name=production&runtime-version=1.0.2
```

## 📖 Guia Completo

Para documentação detalhada, troubleshooting e workflows avançados:

👉 **[EAS_UPDATE_GUIDE.md](./EAS_UPDATE_GUIDE.md)**

## ⚡ Resumo de Comandos

| Comando | O Que Faz |
|---------|-----------|
| `npm run publish:prod -- --message "msg"` | Publica update em produção |
| `npm run publish:dev -- --message "msg"` | Publica update em dev |
| `./publish-update.sh "msg"` | Script interativo |
| `npm run channel:list` | Lista channels |
| `npm run channel:view` | Detalhes do channel production |

---

💡 **Dica**: Use prefixos nas mensagens:
- `feat:` para novas funcionalidades
- `fix:` para correções de bugs
- `perf:` para melhorias de performance
- `refactor:` para refatorações
- `style:` para mudanças visuais
