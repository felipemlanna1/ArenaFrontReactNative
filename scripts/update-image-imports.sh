#!/bin/bash

# Script para atualizar imports de imagens PNG → WebP
# Execute este script APÓS converter as imagens para WebP

echo "🔄 Atualizando imports de imagens PNG → WebP..."

# Atualizar sportIcons.ts
echo "📝 Atualizando /src/config/sportIcons.ts..."
sed -i '' "s/\.png')/\.webp')/g" ./src/config/sportIcons.ts

# Atualizar App.tsx
echo "📝 Atualizando App.tsx..."
sed -i '' "s/\.png')/\.webp')/g" ./App.tsx

# Atualizar WelcomeScreen
echo "📝 Atualizando WelcomeScreen..."
sed -i '' "s/\.png')/\.webp')/g" ./src/screens/welcomeScreen/index.tsx

# Atualizar LoginBackground
echo "📝 Atualizando LoginBackground..."
sed -i '' "s/\.png')/\.webp')/g" ./src/screens/loginScreen/components/LoginBackground/useLoginBackground.ts

# Atualizar RegisterBackground
echo "📝 Atualizando RegisterBackground..."
sed -i '' "s/\.png')/\.webp')/g" ./src/screens/registerScreen/components/RegisterBackground/useRegisterBackground.ts

# Atualizar SportsLoading icons
echo "📝 Atualizando SportsLoading icons..."
sed -i '' "s/\.png')/\.webp')/g" ./src/components/ui/sportsLoading/sports-icons.ts

echo "✅ Imports atualizados com sucesso!"
echo ""
echo "📋 Próximos passos:"
echo "1. Verificar se todas as imagens WebP estão nas pastas corretas"
echo "2. Testar o app: yarn start"
echo "3. Se tudo funcionar, remover PNGs antigos"
echo "4. Commit: git add . && git commit -m 'feat: optimize images to WebP format'"
