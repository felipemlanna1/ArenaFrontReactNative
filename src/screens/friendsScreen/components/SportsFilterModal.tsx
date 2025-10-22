import React from 'react';
import { View, Modal, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Sport {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface SportsFilterModalProps {
  visible: boolean;
  onClose: () => void;
  selectedSportId: string | undefined;
  onSelectSport: (sportId: string | undefined) => void;
  sports: Sport[];
}

export const SportsFilterModal: React.FC<SportsFilterModalProps> = ({
  visible,
  onClose,
  selectedSportId,
  onSelectSport,
  sports,
}) => {
  const handleSelectSport = (sportId: string) => {
    onSelectSport(sportId);
    onClose();
  };

  const handleClear = () => {
    onSelectSport(undefined);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.overlay} edges={['bottom']}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text variant="titlePrimary">Filtrar por Esporte</Text>
            <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Ionicons
                name="close"
                size={24}
                color={ArenaColors.neutral.light}
              />
            </TouchableOpacity>
          </View>

          {/* Sports List */}
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
          >
            {sports.map(sport => (
              <TouchableOpacity
                key={sport.id}
                style={[
                  styles.sportItem,
                  selectedSportId === sport.id && styles.sportItemSelected,
                ]}
                onPress={() => handleSelectSport(sport.id)}
              >
                <View style={styles.sportInfo}>
                  <Text variant="bodyPrimary">{sport.icon}</Text>
                  <Text variant="bodyPrimary">{sport.name}</Text>
                </View>
                {selectedSportId === sport.id && (
                  <Ionicons
                    name="checkmark-circle"
                    size={24}
                    color={ArenaColors.brand.primary}
                  />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Footer Actions */}
          <View style={styles.footer}>
            {selectedSportId && (
              <Button variant="secondary" onPress={handleClear} size="md">
                Limpar filtro
              </Button>
            )}
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
  },
  modalContainer: {
    backgroundColor: ArenaColors.neutral.darkest,
    borderTopLeftRadius: ArenaBorders.radius.xl,
    borderTopRightRadius: ArenaBorders.radius.xl,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.md,
    borderBottomWidth: 1,
    borderBottomColor: ArenaColors.neutral.darkSubtleBorder,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: ArenaSpacing.md,
    gap: ArenaSpacing.sm,
  },
  sportItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: ArenaSpacing.md,
    paddingHorizontal: ArenaSpacing.lg,
    borderRadius: ArenaBorders.radius.md,
    backgroundColor: ArenaColors.neutral.dark,
    borderWidth: 1,
    borderColor: ArenaColors.neutral.darkSubtleBorder,
  },
  sportItemSelected: {
    borderColor: ArenaColors.brand.primary,
    backgroundColor: ArenaColors.brand.primarySubtle,
  },
  sportInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.md,
  },
  footer: {
    padding: ArenaSpacing.lg,
    borderTopWidth: 1,
    borderTopColor: ArenaColors.neutral.darkSubtleBorder,
  },
});
