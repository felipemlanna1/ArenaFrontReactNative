import React from 'react';
import { View } from 'react-native';
import { FilterModal } from '@/components/ui/filterModal';
import { RadioButton } from '@/components/ui/radioButton';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { ReportReason } from '@/services/reports';
import { useReportUserModal } from './useReportUserModal';
import { ReportUserModalProps } from './typesReportUserModal';
import { styles } from './stylesReportUserModal';

const REPORT_REASONS = [
  {
    value: ReportReason.HARASSMENT,
    label: 'Comportamento ofensivo ou assédio',
  },
  {
    value: ReportReason.INAPPROPRIATE_CONTENT,
    label: 'Conteúdo inapropriado no perfil',
  },
  {
    value: ReportReason.SPAM,
    label: 'Spam ou tentativa de golpe',
  },
  {
    value: ReportReason.FAKE_PROFILE,
    label: 'Perfil falso ou enganoso',
  },
  {
    value: ReportReason.OTHER,
    label: 'Outro motivo',
  },
];

export const ReportUserModal: React.FC<ReportUserModalProps> = ({
  userId,
  isOpen,
  onClose,
  onReportSuccess,
}) => {
  const {
    selectedReason,
    description,
    isSubmitting,
    handleSelectReason,
    handleDescriptionChange,
    handleSubmit,
  } = useReportUserModal(userId, isOpen, onClose, onReportSuccess);

  return (
    <FilterModal
      visible={isOpen}
      title="Denunciar usuário"
      height="80%"
      applyButtonLabel="Enviar Denúncia"
      applyButtonDisabled={!selectedReason || isSubmitting}
      isLoading={isSubmitting}
      onApply={handleSubmit}
      onCancel={onClose}
      onClose={onClose}
      testID="report-user-modal"
    >
      <Text variant="bodyPrimary" style={styles.sectionLabel}>
        Motivo da denúncia
      </Text>

      <View style={styles.radioGroup}>
        {REPORT_REASONS.map(reason => (
          <RadioButton
            key={reason.value}
            label={reason.label}
            selected={selectedReason === reason.value}
            onPress={() => handleSelectReason(reason.value)}
            testID={`report-reason-${reason.value.toLowerCase()}`}
          />
        ))}
      </View>

      <Text variant="bodySecondary" style={styles.inputLabel}>
        Detalhes adicionais (opcional)
      </Text>
      <Input
        value={description}
        onChangeText={handleDescriptionChange}
        placeholder="Forneça mais contexto se necessário"
        multiline
        maxLength={500}
        showCharacterCount
        numberOfLines={4}
        testID="report-description-input"
      />
    </FilterModal>
  );
};
