import React from 'react';
import { Modal, View, TouchableWithoutFeedback } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { ConfirmationModalProps } from './typesConfirmationModal';
import { styles } from './stylesConfirmationModal';

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  confirmVariant = 'primary',
  onConfirm,
  onCancel,
  isLoading = false,
  testID = 'confirmation-modal',
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
      testID={testID}
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.container}>
              <View style={styles.header}>
                <Text variant="titlePrimary" style={styles.title}>
                  {title}
                </Text>
                <Text variant="bodySecondary" style={styles.message}>
                  {message}
                </Text>
              </View>

              <View style={styles.buttonRow}>
                <View style={styles.buttonWrapper}>
                  <Button
                    variant="secondary"
                    onPress={onCancel}
                    disabled={isLoading}
                    fullWidth
                    testID={`${testID}-cancel`}
                  >
                    {cancelText}
                  </Button>
                </View>

                <View style={styles.buttonWrapper}>
                  <Button
                    variant={confirmVariant}
                    onPress={onConfirm}
                    loading={isLoading}
                    disabled={isLoading}
                    fullWidth
                    testID={`${testID}-confirm`}
                  >
                    {confirmText}
                  </Button>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
