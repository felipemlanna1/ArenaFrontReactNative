import React, { useState } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
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
                <TouchableOpacity onPress={onClose} testID={`${testID}-close`}>
                  <Text variant="bodyPrimary">✕</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.section}>
                {SORT_OPTIONS.map(option => (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.optionButton,
                      selectedSort === option.id && styles.optionButtonSelected,
                    ]}
                    onPress={() => setSelectedSort(option.id)}
                    testID={`${testID}-option-${option.id}`}
                  >
                    <Text variant="bodyPrimary">{option.label}</Text>
                    {selectedSort === option.id && (
                      <Text variant="bodyPrimary">✓</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.section}>
                <Text variant="bodySecondary">Ordem</Text>
                <TouchableOpacity
                  style={styles.orderButton}
                  onPress={toggleOrder}
                  testID={`${testID}-order-toggle`}
                >
                  <Text variant="bodyPrimary">
                    {selectedOrder === 'asc' ? 'Crescente ↑' : 'Decrescente ↓'}
                  </Text>
                </TouchableOpacity>
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
