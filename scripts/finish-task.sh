#!/bin/bash

# Finish Task - Finaliza uma task de UI improvement
# Uso: ./scripts/finish-task.sh {TASK_NUMBER}

set -e

if [ -z "$1" ]; then
  echo "❌ Erro: Número da task não fornecido"
  echo "Uso: ./scripts/finish-task.sh {TASK_NUMBER}"
  exit 1
fi

TASK_NUMBER=$1
CURRENT_BRANCH=$(git branch --show-current)

echo "✅ Arena UI Improvements - Finalizando Task $TASK_NUMBER"
echo "========================================="
echo "🌿 Branch atual: $CURRENT_BRANCH"
echo ""

# 1. Verificar se estamos em uma branch de task
if [[ ! "$CURRENT_BRANCH" =~ ^task/$TASK_NUMBER- ]]; then
  echo "⚠️  Você não está na branch da task $TASK_NUMBER"
  echo "Branch atual: $CURRENT_BRANCH"
  read -p "Deseja continuar mesmo assim? (y/n): " CONTINUE
  if [ "$CONTINUE" != "y" ]; then
    echo "❌ Operação cancelada"
    exit 1
  fi
fi

# 2. Verificar se o Expo está rodando
echo "🔍 Verificando se o Expo está rodando na porta 8081..."
if ! lsof -i :8081 > /dev/null 2>&1; then
  echo "⚠️  Expo não está rodando na porta 8081"
  echo "Por favor, inicie o Expo:"
  echo "  npx expo start --web --port 8081"
  read -p "Pressione ENTER quando o Expo estiver rodando..."
fi

# 3. Executar testes Playwright para capturar screenshots
echo ""
echo "📸 Capturando screenshots pós-implementação..."
SCREENSHOT_SPEC="scripts/screenshots/task-${TASK_NUMBER}-screenshots.spec.ts"

if [ -f "$SCREENSHOT_SPEC" ]; then
  echo "🧪 Executando teste Playwright..."
  npx playwright test "$SCREENSHOT_SPEC" --project=chromium

  if [ $? -eq 0 ]; then
    echo "✅ Screenshots capturados com sucesso"
  else
    echo "⚠️  Alguns testes falharam, mas screenshots podem ter sido capturados"
    read -p "Deseja continuar? (y/n): " CONTINUE
    if [ "$CONTINUE" != "y" ]; then
      echo "❌ Operação cancelada"
      exit 1
    fi
  fi
else
  echo "⚠️  Spec de teste não encontrado: $SCREENSHOT_SPEC"
  echo "Você precisará capturar os screenshots manualmente ou criar o spec."
  read -p "Deseja continuar mesmo assim? (y/n): " CONTINUE
  if [ "$CONTINUE" != "y" ]; then
    echo "❌ Operação cancelada"
    exit 1
  fi
fi

# 4. Gerar comparações antes/depois
echo ""
echo "🖼️  Gerando comparações antes/depois..."

# Listar arquivos after da task
AFTER_FILES=$(find docs/ux-analysis/comparisons -name "task-${TASK_NUMBER}-after-*.png" 2>/dev/null || echo "")

if [ -z "$AFTER_FILES" ]; then
  echo "⚠️  Nenhum screenshot 'after' encontrado para task $TASK_NUMBER"
  echo "Esperado em: docs/ux-analysis/comparisons/task-${TASK_NUMBER}-after-*.png"
else
  echo "📁 Screenshots 'after' encontrados:"
  echo "$AFTER_FILES"
  echo ""

  # Para cada screenshot after, gerar comparação
  while IFS= read -r AFTER_FILE; do
    if [ -n "$AFTER_FILE" ]; then
      SCREEN_NAME=$(basename "$AFTER_FILE" | sed "s/task-${TASK_NUMBER}-after-//" | sed 's/.png//')
      BEFORE_FILE="docs/ux-analysis/screenshots/${SCREEN_NAME}.png"
      COMPARISON_FILE="docs/ux-analysis/comparisons/task-${TASK_NUMBER}-comparison-${SCREEN_NAME}.png"

      echo "🔄 Gerando comparação para: $SCREEN_NAME"

      if [ -f "$BEFORE_FILE" ]; then
        node scripts/generate-comparison.js "$BEFORE_FILE" "$AFTER_FILE" "$COMPARISON_FILE" "$TASK_NUMBER"

        if [ $? -eq 0 ]; then
          echo "   ✅ $COMPARISON_FILE"
        else
          echo "   ⚠️  Erro ao gerar comparação"
        fi
      else
        echo "   ⚠️  Screenshot 'before' não encontrado: $BEFORE_FILE"
        echo "   💡 Copiando screenshot 'after' como referência..."
        cp "$AFTER_FILE" "$COMPARISON_FILE"
      fi
    fi
  done <<< "$AFTER_FILES"
fi

# 5. Lembrete de scoring pós-implementação
echo ""
echo "========================================="
echo "📊 AÇÃO NECESSÁRIA: Scoring Pós-Implementação"
echo ""
echo "Por favor, complete o documento de estudo:"
echo "📝 docs/ux-analysis/tasks/task-${TASK_NUMBER}-study.md"
echo ""
echo "Preencha a seção 'Pós-Implementação':"
echo "  - Scoring Visual (0-10 para cada critério)"
echo "  - Calcule a melhoria (+X pontos)"
echo "  - Liste os screenshots comparativos gerados"
echo "  - Marque o checklist final"
echo ""

# 6. Próximos passos
echo "========================================="
echo "✅ Task $TASK_NUMBER processada!"
echo ""
echo "📋 Próximos passos:"
echo ""
echo "1️⃣  Complete o scoring pós-implementação"
echo "    📝 docs/ux-analysis/tasks/task-${TASK_NUMBER}-study.md"
echo ""
echo "2️⃣  Revise as comparações geradas"
echo "    📂 docs/ux-analysis/comparisons/task-${TASK_NUMBER}-comparison-*.png"
echo ""
echo "3️⃣  Commit as mudanças"
echo "    git add ."
echo "    git commit -m \"feat(ui): implement task $TASK_NUMBER - {TASK_NAME}"
echo ""
echo "                🤖 Generated with Claude Code"
echo "                Co-Authored-By: Claude <noreply@anthropic.com>\""
echo ""
echo "4️⃣  Push e crie PR para feature/new-ui-design"
echo "    git push origin $CURRENT_BRANCH"
echo "    gh pr create --base feature/new-ui-design \\"
echo "      --title \"Task $TASK_NUMBER: {TASK_NAME}\" \\"
echo "      --body \"Veja comparações em docs/ux-analysis/comparisons/\""
echo ""
echo "5️⃣  Após aprovação, merge para feature/new-ui-design"
echo "    gh pr merge --squash"
echo ""
echo "6️⃣  Volte para feature/new-ui-design e inicie próxima task"
echo "    git checkout feature/new-ui-design"
echo "    git pull origin feature/new-ui-design"
echo "    ./scripts/start-task.sh {NEXT_TASK_NUMBER} \"{NEXT_TASK_NAME}\""
echo ""
echo "========================================="
