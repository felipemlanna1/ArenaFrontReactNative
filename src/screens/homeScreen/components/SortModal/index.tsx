import React, { useState } from 'react';
import {
  View,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ArenaColors } from '@/constants';
import { SortModalProps, SortOption } from './typesSortModal';
import { styles } from './stylesSortModal';

const SORT_OPTIONS: SortOption[] = [
  { id: 'date', label: 'Data do evento' },
  { id: 'distance', label: 'Distância' },
  { id: 'price', label: 'Preço' },
  { id: 'name', label: 'Nome' },
];

export const SortModal: React.FC<SortModalProps> = ({
  visible,
  currentSort,
  onClose,
  onApply,
  testID = 'sort-modal',
}) => {
  const [selectedSort, setSelectedSort] = useState(currentSort.sortBy);
  const [selectedOrder, setSelectedOrder] = useState(currentSort.sortOrder);

  const handleApply = () => {
    onApply(selectedSort, selectedOrder);
    onClose();
  };

  const toggleOrder = () => {
    setSelectedOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      testID={testID}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <View style={styles.header}>
                <Text variant="headingPrimary">Ordenar por</Text>
                <TouchableOpacity
                  onPress={onClose}
                  testID={`${testID}-close`}
                  style={styles.closeButton}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name="close"
                    size={24}
                    color={ArenaColors.neutral.light}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.section}>
                {SORT_OPTIONS.map(option => (
                  <Checkbox
                    key={option.id}
                    checked={selectedSort === option.id}
                    onPress={() => setSelectedSort(option.id)}
                    label={option.label}
                    variant="card"
                    size="md"
                    testID={`${testID}-option-${option.id}`}
                  />
                ))}
              </View>

              <View style={styles.section}>
                <Text variant="bodySecondary" style={styles.sectionLabel}>
                  Ordem
                </Text>
                <Button
                  variant="secondary"
                  size="md"
                  onPress={toggleOrder}
                  testID={`${testID}-order-toggle`}
                >
                  {selectedOrder === 'asc' ? 'Crescente ↑' : 'Decrescente ↓'}
                </Button>
              </View>

              <View style={styles.footer}>
                <Button
                  variant="primary"
                  onPress={handleApply}
                  testID={`${testID}-apply`}
                >
                  Aplicar
                </Button>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
