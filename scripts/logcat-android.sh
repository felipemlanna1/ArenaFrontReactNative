#!/bin/bash

# Arena Android Logcat Helper
# Usage: ./scripts/logcat-android.sh

echo "🔍 Verificando dispositivos Android conectados..."
adb devices

echo ""
echo "🧹 Limpando logs antigos..."
adb logcat -c

echo ""
echo "📱 Monitorando logs do Arena..."
echo "   Procurando por: [Arena Config], [ReactNativeJS]"
echo "   Pressione Ctrl+C para parar"
echo ""
echo "-----------------------------------"

# Filtrar logs relevantes
adb logcat | grep --line-buffered -E "(Arena Config|ReactNativeJS|ARENA|ExpoModules)"
