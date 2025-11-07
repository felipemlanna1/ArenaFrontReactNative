import React from 'react';
import {
  Modal,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArenaColors } from '@/constants';
import { BugReportPriority } from '@/services/bugReport/typesBugReport';
import { BugReportModalProps } from './typesBugReportModal';
import { useBugReportModal } from './useBugReportModal';
import { styles } from './stylesBugReportModal';

const priorityOptions = [
  { value: BugReportPriority.LOW, label: 'Baixa' },
  { value: BugReportPriority.MEDIUM, label: 'Média' },
  { value: BugReportPriority.HIGH, label: 'Alta' },
  { value: BugReportPriority.CRITICAL, label: 'Crítica' },
];

export const BugReportModal: React.FC<BugReportModalProps> = ({
  visible,
  onClose,
  onSuccess,
}) => {
  const {
    formData,
    errors,
    isSubmitting,
    updateFormData,
    handlePickImages,
    handleRemoveScreenshot,
    handleSubmit,
  } = useBugReportModal({ onClose, onSuccess });

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.modalContent}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <View style={styles.modalHeader}>
          <Text variant="titlePrimary">Reportar Bug / Sugestão</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            disabled={isSubmitting}
          >
            <Ionicons
              name="close"
              size={24}
              color={ArenaColors.neutral.light}
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.sectionsContainer}>
            <View style={styles.section}>
              <Text variant="titleSecondary" style={styles.sectionTitle}>
                Informações Básicas
              </Text>

              <Input
                label="Título"
                type="text"
                value={formData.title}
                onChangeText={value => updateFormData('title', value)}
                placeholder="Ex: Botão não responde ao clique"
                error={errors.title}
                maxLength={255}
                required
              />

              <Input
                label="Descrição Detalhada"
                type="textarea"
                value={formData.description}
                onChangeText={value => updateFormData('description', value)}
                placeholder="Descreva o problema ou sugestão em detalhes..."
                error={errors.description}
                rows={4}
                maxRows={10}
                autoGrow
                maxLength={5000}
                required
              />
            </View>

            <View style={styles.section}>
              <Text variant="titleSecondary" style={styles.sectionTitle}>
                Detalhes Adicionais (Opcional)
              </Text>

              <Input
                label="Passos para Reproduzir"
                type="textarea"
                value={formData.steps}
                onChangeText={value => updateFormData('steps', value)}
                placeholder="1. Abrir tela X&#10;2. Clicar no botão Y&#10;3. Bug acontece"
                error={errors.steps}
                rows={3}
                maxRows={6}
                autoGrow
                maxLength={2000}
              />

              <Input
                label="Comportamento Esperado"
                type="textarea"
                value={formData.expectedBehavior}
                onChangeText={value =>
                  updateFormData('expectedBehavior', value)
                }
                placeholder="O que você esperava que acontecesse?"
                error={errors.expectedBehavior}
                rows={2}
                maxRows={4}
                autoGrow
                maxLength={1000}
              />

              <Input
                label="Comportamento Atual"
                type="textarea"
                value={formData.actualBehavior}
                onChangeText={value => updateFormData('actualBehavior', value)}
                placeholder="O que realmente aconteceu?"
                error={errors.actualBehavior}
                rows={2}
                maxRows={4}
                autoGrow
                maxLength={1000}
              />
            </View>

            <View style={styles.section}>
              <Text variant="titleSecondary" style={styles.sectionTitle}>
                Prioridade
              </Text>

              <View style={styles.priorityContainer}>
                {priorityOptions.map(option => (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.priorityButton,
                      formData.priority === option.value &&
                        styles.priorityButtonActive,
                    ]}
                    onPress={() => updateFormData('priority', option.value)}
                  >
                    <Text
                      variant={
                        formData.priority === option.value
                          ? 'bodyBold'
                          : 'bodySecondary'
                      }
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text variant="titleSecondary" style={styles.sectionTitle}>
                Screenshots (Opcional)
              </Text>
              <Text variant="captionSecondary">
                Adicione até 5 imagens para ilustrar o problema
              </Text>

              <View style={styles.screenshotsContainer}>
                <View style={styles.screenshotsGrid}>
                  {formData.screenshots.map((screenshot, index) => (
                    <View key={index} style={styles.screenshotItem}>
                      <Image
                        source={{ uri: screenshot }}
                        style={styles.screenshotImage}
                        resizeMode="cover"
                      />
                      <TouchableOpacity
                        style={styles.removeScreenshotButton}
                        onPress={() => handleRemoveScreenshot(index)}
                      >
                        <Ionicons
                          name="close"
                          size={16}
                          color={ArenaColors.neutral.light}
                        />
                      </TouchableOpacity>
                    </View>
                  ))}

                  {formData.screenshots.length < 5 && (
                    <TouchableOpacity
                      style={styles.addImageButton}
                      onPress={handlePickImages}
                    >
                      <Ionicons
                        name="image-outline"
                        size={32}
                        color={ArenaColors.neutral.medium}
                      />
                      <Text variant="captionSecondary">Adicionar</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.buttonRow}>
            <View style={styles.flex1}>
              <Button
                variant="secondary"
                onPress={onClose}
                disabled={isSubmitting}
                fullWidth
              >
                Cancelar
              </Button>
            </View>
            <View style={styles.flex1}>
              <Button
                variant="primary"
                onPress={handleSubmit}
                disabled={isSubmitting}
                loading={isSubmitting}
                fullWidth
              >
                Enviar Report
              </Button>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
