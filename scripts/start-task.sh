#!/bin/bash

# Start Task - Inicia uma nova task de UI improvement
# Uso: ./scripts/start-task.sh {TASK_NUMBER} "{TASK_NAME}"

set -e

if [ -z "$1" ]; then
  echo "❌ Erro: Número da task não fornecido"
  echo "Uso: ./scripts/start-task.sh {TASK_NUMBER} \"{TASK_NAME}\""
  echo "Exemplo: ./scripts/start-task.sh 1 \"Empty State Home\""
  exit 1
fi

TASK_NUMBER=$1
TASK_NAME=${2:-"Task $TASK_NUMBER"}
TASK_SLUG=$(echo "$TASK_NAME" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | tr -cd '[:alnum:]-')
BRANCH_NAME="task/${TASK_NUMBER}-${TASK_SLUG}"
DATE=$(date +"%Y-%m-%d")

echo "🚀 Arena UI Improvements - Iniciando Task $TASK_NUMBER"
echo "========================================="
echo "📝 Task: $TASK_NAME"
echo "🌿 Branch: $BRANCH_NAME"
echo ""

# 1. Verificar se estamos na feature/new-ui-design
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "feature/new-ui-design" ]; then
  echo "⚠️  Você deve estar na branch feature/new-ui-design"
  echo "Branch atual: $CURRENT_BRANCH"
  read -p "Deseja fazer checkout para feature/new-ui-design? (y/n): " CHECKOUT
  if [ "$CHECKOUT" = "y" ]; then
    git checkout feature/new-ui-design
    git pull origin feature/new-ui-design
  else
    echo "❌ Operação cancelada"
    exit 1
  fi
fi

# 2. Criar branch da task
echo "📍 Criando branch $BRANCH_NAME..."
if git show-ref --verify --quiet refs/heads/"$BRANCH_NAME"; then
  echo "⚠️  Branch $BRANCH_NAME já existe"
  read -p "Deseja fazer checkout? (y/n): " CHECKOUT
  if [ "$CHECKOUT" = "y" ]; then
    git checkout "$BRANCH_NAME"
  else
    echo "❌ Operação cancelada"
    exit 1
  fi
else
  git checkout -b "$BRANCH_NAME"
  echo "✅ Branch $BRANCH_NAME criada"
fi

# 3. Criar documento de estudo da task
TASK_DOC="docs/ux-analysis/tasks/task-${TASK_NUMBER}-study.md"
if [ -f "$TASK_DOC" ]; then
  echo "⚠️  Documento $TASK_DOC já existe"
else
  echo "📝 Criando documento de estudo..."
  cp scripts/templates/task-study-template.md "$TASK_DOC"

  # Substituir placeholders
  sed -i '' "s/{TASK_NUMBER}/$TASK_NUMBER/g" "$TASK_DOC"
  sed -i '' "s/{TASK_NAME}/$TASK_NAME/g" "$TASK_DOC"
  sed -i '' "s/{TASK_SLUG}/$TASK_SLUG/g" "$TASK_DOC"
  sed -i '' "s/{DATE}/$DATE/g" "$TASK_DOC"

  echo "✅ Documento criado: $TASK_DOC"
fi

# 4. Instruções de pré-implementação
echo ""
echo "========================================="
echo "✅ Task $TASK_NUMBER iniciada!"
echo ""
echo "📋 Checklist de Pré-Implementação:"
echo ""
echo "1️⃣  Re-estude os princípios UX/UI relevantes"
echo "    📖 Edite: $TASK_DOC"
echo "    - Jakob's Law, Fitts's Law, Hick's Law"
echo "    - Gestalt Principles (Proximity, Similarity, Closure)"
echo "    - Visual Hierarchy, Feedback, Affordance"
echo ""
echo "2️⃣  Analise os screenshots existentes"
echo "    📂 Veja: docs/ux-analysis/screenshots/"
echo "    - Identifique problemas visuais"
echo "    - Liste soluções propostas"
echo ""
echo "3️⃣  Dê uma nota visual PRÉ-implementação (0-10)"
echo "    📊 No documento de estudo, preencha:"
echo "    - Hierarquia Visual"
echo "    - Espaçamento"
echo "    - Feedback Visual"
echo "    - Consistência"
echo "    - Affordance"
echo ""
echo "4️⃣  Planeje a implementação"
echo "    🛠️  Liste:"
echo "    - Componentes afetados"
echo "    - Design tokens a usar (ArenaColors, ArenaSpacing, Text variants)"
echo "    - Estimativa de horas"
echo ""
echo "5️⃣  Quando pronto, IMPLEMENTE as mudanças"
echo "    💻 Siga as regras do CLAUDE.md"
echo "    - TypeScript strict"
echo "    - Componentes < 150 linhas"
echo "    - SEMPRE usar tokens Arena"
echo "    - Text component SEMPRE com variant"
echo ""
echo "6️⃣  Após implementar, finalize a task:"
echo "    ✅ ./scripts/finish-task.sh $TASK_NUMBER"
echo ""
echo "📝 Branch: $BRANCH_NAME"
echo "📖 Estudo: $TASK_DOC"
echo "========================================="
