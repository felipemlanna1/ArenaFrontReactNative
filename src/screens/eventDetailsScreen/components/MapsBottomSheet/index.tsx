import React, { useState, useEffect, useCallback } from 'react';
import { View, Modal, Pressable, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Haptics from 'expo-haptics';
import { Text } from '@/components/ui/text';
import { SportsLoading } from '@/components/ui/sportsLoading';
import { ArenaColors } from '@/constants';
import { styles } from './stylesMapsBottomSheet';
import type { MapsBottomSheetProps, MapApp } from './typesMapsBottomSheet';

/**
 * Componente MapsBottomSheet
 *
 * Bottom sheet para seleção de app de mapas (Google Maps, Waze, Apple Maps, Uber).
 * Exibe apenas apps disponíveis/instalados no dispositivo do usuário.
 *
 * Segue princípios de UX/UI:
 * - Touch targets mínimo 64px (Material Design + HIG)
 * - Feedback háptico em interações
 * - Estados de loading/empty/error
 * - Acessibilidade completa
 *
 * @example
 * <MapsBottomSheet
 *   visible={showMapsSheet}
 *   onClose={() => setShowMapsSheet(false)}
 *   onSelectApp={handleAppSelect}
 *   getAvailableApps={getAvailableApps}
 * />
 */
export const MapsBottomSheet: React.FC<MapsBottomSheetProps> = ({
  visible,
  onClose,
  onSelectApp,
  getAvailableApps,
  testID = 'maps-bottom-sheet',
}) => {
  const [apps, setApps] = useState<MapApp[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar apps disponíveis quando modal abre
  useEffect(() => {
    if (visible) {
      loadAvailableApps();
    }
  }, [visible]);

  const loadAvailableApps = useCallback(async () => {
    try {
      setIsLoading(true);
      const availableApps = await getAvailableApps();
      setApps(availableApps);
    } catch (error) {
      console.error('[MapsBottomSheet] Error loading available apps:', error);
      setApps([]);
    } finally {
      setIsLoading(false);
    }
  }, [getAvailableApps]);

  // Handler para seleção de app
  const handleSelectApp = useCallback(
    async (app: MapApp) => {
      if (!app.available) {
        return;
      }

      // Feedback háptico
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      // Chama callback
      onSelectApp(app.id);
    },
    [onSelectApp]
  );

  // Handler para fechar modal
  const handleClose = useCallback(async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onClose();
  }, [onClose]);

  // Renderizar ícone de cada app
  const renderAppIcon = (app: MapApp) => {
    const iconMap: Record<MapApp['id'], string> = {
      google: 'logo-google',
      waze: 'navigate-circle',
      apple: 'map',
      uber: 'car',
    };

    return (
      <View style={styles.appIcon}>
        <Ionicons name={iconMap[app.id] as any} size={24} color={ArenaColors.brand.primary} />
      </View>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      presentationStyle="overFullScreen"
      onRequestClose={handleClose}
      testID={testID}
    >
      <Pressable style={styles.modalOverlay} onPress={handleClose}>
        <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <Text variant="titlePrimary">Abrir no mapa</Text>
            <TouchableOpacity
              onPress={handleClose}
              style={styles.closeButton}
              testID={`${testID}-close`}
              hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Fechar"
            >
              <Ionicons name="close" size={24} color={ArenaColors.neutral.light} />
            </TouchableOpacity>
          </View>

          {/* Lista de Apps */}
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <SportsLoading size="md" animationSpeed="normal" />
            </View>
          ) : (
            <View style={styles.appsList}>
              {apps.map((app) => (
                <TouchableOpacity
                  key={app.id}
                  style={[styles.appItem, !app.available && styles.appItemDisabled]}
                  onPress={() => handleSelectApp(app)}
                  disabled={!app.available}
                  testID={`${testID}-app-${app.id}`}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel={`Abrir no ${app.name}`}
                  accessibilityState={{ disabled: !app.available }}
                >
                  {/* Ícone do App */}
                  {renderAppIcon(app)}

                  {/* Nome do App */}
                  <View style={styles.appInfo}>
                    <Text variant="bodyPrimary">{app.name}</Text>
                    {!app.available && (
                      <Text variant="captionSecondary">App não instalado</Text>
                    )}
                  </View>

                  {/* Ícone de Chevron */}
                  {app.available && (
                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color={ArenaColors.neutral.medium}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
};
