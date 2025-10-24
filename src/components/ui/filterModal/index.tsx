import React from 'react';
import { View, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '../text';
import { Button } from '../button';
import { SportsLoading } from '../sportsLoading';
import { ArenaColors } from '@/constants';
import { FilterModalProps } from './typesFilterModal';
import { styles } from './stylesFilterModal';

export const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  onApply,
  onCancel,
  title,
  children,
  height = '85%',
  isLoading = false,
  applyButtonLabel = 'Aplicar',
  cancelButtonLabel = 'Cancelar',
  applyButtonDisabled = false,
  testID,
  contentContainerStyle,
}) => {
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={handleCancel}
      testID={testID ? `${testID}-modal` : undefined}
    >
      <SafeAreaView style={styles.overlay} edges={['bottom']}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={handleCancel}
          testID={testID ? `${testID}-backdrop` : undefined}
        />

        <View
          style={[styles.modalContainer, { height }]}
          testID={testID ? `${testID}-container` : undefined}
        >
          <View style={styles.header}>
            <Text variant="titlePrimary">{title}</Text>
            <TouchableOpacity
              onPress={handleCancel}
              style={styles.closeButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              testID={testID ? `${testID}-close` : undefined}
            >
              <Ionicons
                name="close"
                size={24}
                color={ArenaColors.neutral.light}
              />
            </TouchableOpacity>
          </View>

          {isLoading ? (
            <View style={styles.loadingContainer}>
              <SportsLoading
                size="md"
                animationSpeed="normal"
                testID={testID ? `${testID}-loading` : undefined}
              />
            </View>
          ) : (
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={[
                styles.scrollContent,
                contentContainerStyle,
              ]}
              showsVerticalScrollIndicator={false}
              testID={testID ? `${testID}-scroll` : undefined}
            >
              {children}
            </ScrollView>
          )}

          <View style={styles.footer}>
            <View style={styles.footerButton}>
              <Button
                variant="secondary"
                onPress={handleCancel}
                size="md"
                fullWidth
                testID={testID ? `${testID}-cancel` : undefined}
              >
                {cancelButtonLabel}
              </Button>
            </View>
            <View style={styles.footerButton}>
              <Button
                variant="primary"
                onPress={onApply}
                size="md"
                disabled={applyButtonDisabled}
                fullWidth
                testID={testID ? `${testID}-apply` : undefined}
              >
                {applyButtonLabel}
              </Button>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export type { FilterModalProps, FilterModalHeight } from './typesFilterModal';
