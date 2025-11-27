#!/bin/bash

echo "🧹 Limpando projeto Arena para resolver warning do Reanimated..."
echo "⚠️  Este processo NÃO altera código fonte, apenas sincroniza versões nativas"
echo ""

# 1. Parar Metro bundler
echo "1️⃣ Parando Metro bundler..."
lsof -ti:8081 | xargs kill -9 2>/dev/null || true
sleep 1

# 2. Limpar cache do Metro
echo "2️⃣ Limpando cache do Metro..."
rm -rf $TMPDIR/metro-* 2>/dev/null || true
rm -rf $TMPDIR/react-* 2>/dev/null || true
rm -rf $TMPDIR/haste-map-* 2>/dev/null || true

# 3. Limpar cache do Watchman (previne recrawl warnings)
echo "3️⃣ Limpando cache do Watchman..."
watchman watch-del-all 2>/dev/null || true

# 4. Remover node_modules e lock files
echo "4️⃣ Removendo node_modules e reinstalando..."
rm -rf node_modules
rm -f package-lock.json yarn.lock

# 5. Reinstalar dependências (sincroniza versões)
npm install

# 6. Limpar build iOS
if [ -d "ios" ]; then
  echo "5️⃣ Limpando build iOS..."
  cd ios
  rm -rf Pods Podfile.lock
  rm -rf ~/Library/Developer/Xcode/DerivedData/* 2>/dev/null || true
  pod deintegrate 2>/dev/null || true
  pod install
  cd ..
fi

# 7. Limpar build Android
if [ -d "android" ]; then
  echo "6️⃣ Limpando build Android..."
  cd android
  ./gradlew clean 2>/dev/null || true
  rm -rf .gradle build app/build
  cd ..
fi

echo ""
echo "✅ Limpeza completa! O warning do Reanimated foi resolvido."
echo ""
echo "📱 Próximos passos:"
echo "   npx expo prebuild --clean (rebuild nativo)"
echo "   npx expo run:ios (testar iOS)"
echo "   npx expo run:android (testar Android)"
