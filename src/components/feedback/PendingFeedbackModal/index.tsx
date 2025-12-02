import React from 'react';
import { Modal, View, TouchableWithoutFeedback } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { ArenaColors } from '@/constants';
import { PendingFeedbackModalProps } from './typesPendingFeedbackModal';
import { styles } from './stylesPendingFeedbackModal';

export const PendingFeedbackModal: React.FC<PendingFeedbackModalProps> = ({
  visible,
  onDismiss,
  onNavigateToPastEvents,
  pendingCount,
  testID = 'pending-feedback-modal',
}) => {
  const eventText = pendingCount === 1 ? 'evento' : 'eventos';
  const title = `Você tem ${pendingCount} ${eventText} para avaliar`;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}
      testID={testID}
    >
      <TouchableWithoutFeedback onPress={onDismiss}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.container}>
              <View style={styles.icon}>
                <Ionicons
                  name="star-outline"
                  size={64}
                  color={ArenaColors.brand.primary}
                />
              </View>

              <Text variant="titlePrimary" style={styles.title}>
                {title}
              </Text>

              <Text variant="bodySecondary" style={styles.description}>
                Avalie seus colegas e ajude a comunidade Arena!
              </Text>

              <View style={styles.buttonRow}>
                <View style={styles.buttonWrapper}>
                  <Button
                    variant="ghost"
                    onPress={onDismiss}
                    fullWidth
                    testID={`${testID}-dismiss`}
                  >
                    Depois
                  </Button>
                </View>

                <View style={styles.buttonWrapper}>
                  <Button
                    variant="primary"
                    onPress={onNavigateToPastEvents}
                    fullWidth
                    testID={`${testID}-navigate`}
                  >
                    Ver Eventos Passados
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
