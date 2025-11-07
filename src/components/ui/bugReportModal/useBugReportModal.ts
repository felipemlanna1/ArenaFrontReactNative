import { useState, useCallback } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useAlert } from '@/contexts/AlertContext';
import { bugReportService } from '@/services/bugReport/bugReportService';
import { BugReportPriority } from '@/services/bugReport/typesBugReport';
import { getDeviceInfo } from '@/utils/deviceInfo';
import { BugReportFormData, BugReportFormErrors } from './typesBugReportModal';

interface UseBugReportModalProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export const useBugReportModal = ({
  onClose,
  onSuccess,
}: UseBugReportModalProps) => {
  const { showSuccess, showError } = useAlert();

  const [formData, setFormData] = useState<BugReportFormData>({
    title: '',
    description: '',
    steps: '',
    expectedBehavior: '',
    actualBehavior: '',
    priority: BugReportPriority.MEDIUM,
    screenshots: [],
    videos: [],
  });

  const [errors, setErrors] = useState<BugReportFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = useCallback(
    <K extends keyof BugReportFormData>(
      field: K,
      value: BugReportFormData[K]
    ) => {
      setFormData(prev => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: undefined }));
      }
    },
    [errors]
  );

  const validateForm = useCallback((): boolean => {
    const newErrors: BugReportFormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Título é obrigatório';
    } else if (formData.title.trim().length < 5) {
      newErrors.title = 'Título deve ter no mínimo 5 caracteres';
    } else if (formData.title.length > 255) {
      newErrors.title = 'Título deve ter no máximo 255 caracteres';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Descrição é obrigatória';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Descrição deve ter no mínimo 10 caracteres';
    } else if (formData.description.length > 5000) {
      newErrors.description = 'Descrição deve ter no máximo 5000 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handlePickImages = useCallback(async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        showError('Precisamos de permissão para acessar suas fotos');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 0.8,
        base64: true,
      });

      if (!result.canceled && result.assets.length > 0) {
        const newScreenshots = result.assets
          .map(asset =>
            asset.base64 ? `data:image/jpeg;base64,${asset.base64}` : null
          )
          .filter(Boolean) as string[];

        setFormData(prev => ({
          ...prev,
          screenshots: [...prev.screenshots, ...newScreenshots].slice(0, 5),
        }));
      }
    } catch {
      showError('Erro ao selecionar imagens');
    }
  }, [showError]);

  const handleRemoveScreenshot = useCallback((index: number) => {
    setFormData(prev => ({
      ...prev,
      screenshots: prev.screenshots.filter((_, i) => i !== index),
    }));
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!validateForm()) {
      showError('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    setIsSubmitting(true);

    try {
      const deviceInfo = getDeviceInfo();

      await bugReportService.submitBugReport({
        title: formData.title.trim(),
        description: formData.description.trim(),
        steps: formData.steps.trim() || undefined,
        expectedBehavior: formData.expectedBehavior.trim() || undefined,
        actualBehavior: formData.actualBehavior.trim() || undefined,
        priority: formData.priority,
        screenshots:
          formData.screenshots.length > 0 ? formData.screenshots : undefined,
        videos: formData.videos.length > 0 ? formData.videos : undefined,
        deviceInfo,
      });

      showSuccess('Bug report enviado com sucesso! Obrigado pelo feedback.');
      onSuccess?.();
      onClose();
    } catch (error) {
      showError(
        error instanceof Error
          ? error.message
          : 'Erro ao enviar bug report. Tente novamente.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm, showSuccess, showError, onSuccess, onClose]);

  return {
    formData,
    errors,
    isSubmitting,
    updateFormData,
    handlePickImages,
    handleRemoveScreenshot,
    handleSubmit,
  };
};
