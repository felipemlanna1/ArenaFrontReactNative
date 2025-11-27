import { useState, useCallback, useEffect } from 'react';
import { useAlert } from '@/contexts/AlertContext';
import { reportsApi, ReportReason } from '@/services/reports';
import { AxiosError } from 'axios';

interface UseReportUserModalReturn {
  selectedReason: ReportReason | null;
  description: string;
  isSubmitting: boolean;
  handleSelectReason: (reason: ReportReason) => void;
  handleDescriptionChange: (text: string) => void;
  handleSubmit: () => Promise<void>;
  resetForm: () => void;
}

export const useReportUserModal = (
  userId: string,
  isOpen: boolean,
  onClose: () => void,
  onReportSuccess?: () => void
): UseReportUserModalReturn => {
  const { showSuccess, showError, showWarning } = useAlert();
  const [selectedReason, setSelectedReason] = useState<ReportReason | null>(
    null
  );
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = useCallback(() => {
    setSelectedReason(null);
    setDescription('');
    setIsSubmitting(false);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  const handleSelectReason = useCallback((reason: ReportReason) => {
    setSelectedReason(reason);
  }, []);

  const handleDescriptionChange = useCallback((text: string) => {
    setDescription(text);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!selectedReason) {
      return;
    }

    setIsSubmitting(true);

    try {
      await reportsApi.reportUser({
        reportedUserId: userId,
        reason: selectedReason,
        description: description.trim() || undefined,
      });

      showSuccess('Denúncia enviada com sucesso');
      resetForm();
      onClose();

      if (onReportSuccess) {
        onReportSuccess();
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;

      if (axiosError.response?.status === 409) {
        showWarning('Você já denunciou este usuário anteriormente');
        onClose();
        resetForm();
      } else if (axiosError.response?.status === 429) {
        showWarning(
          'Limite de 5 denúncias por dia atingido. Tente novamente amanhã'
        );
        onClose();
        resetForm();
      } else if (axiosError.response?.status === 404) {
        showError('Usuário não encontrado');
      } else if (axiosError.response?.status === 400) {
        showError('Você não pode denunciar a si mesmo');
        onClose();
        resetForm();
      } else {
        showError('Não foi possível enviar a denúncia. Tente novamente');
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [
    selectedReason,
    userId,
    description,
    showSuccess,
    showWarning,
    showError,
    resetForm,
    onClose,
    onReportSuccess,
  ]);

  return {
    selectedReason,
    description,
    isSubmitting,
    handleSelectReason,
    handleDescriptionChange,
    handleSubmit,
    resetForm,
  };
};
