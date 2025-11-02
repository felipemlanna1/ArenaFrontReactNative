import React from 'react';
import { View } from 'react-native';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useAlert } from '@/contexts/AlertContext';
import { ComponentSection } from '../componentSection';
import { ShowcaseItem } from '../showcaseItem';
import { styles } from '../stylesComponentsShowcaseScreen';

interface AlertSectionProps {
  onCopyCode: (code: string) => void;
}

const ALERT_SETUP_CODE = `// 1. Wrap your app with AlertProvider
import { AlertProvider } from '@/contexts/AlertContext';

<AlertProvider>
  <YourApp />
</AlertProvider>

// 2. Use the useAlert hook in any component
import { useAlert } from '@/contexts/AlertContext';

const MyComponent = () => {
  const { showSuccess, showError, showWarning, showInfo, showConfirm } = useAlert();

  // Use the helper methods...
};`;

const SUCCESS_CODE = `const { showSuccess } = useAlert();

showSuccess({
  title: 'Sucesso!',
  message: 'Operação concluída com sucesso.',
  primaryButton: {
    text: 'OK',
  },
});`;

const ERROR_CODE = `const { showError } = useAlert();

showError({
  title: 'Erro',
  message: 'Não foi possível completar a operação.',
  primaryButton: {
    text: 'Tentar Novamente',
    onPress: handleRetry,
  },
  secondaryButton: {
    text: 'Cancelar',
  },
});`;

const WARNING_CODE = `const { showWarning } = useAlert();

showWarning({
  title: 'Atenção',
  message: 'Esta ação não pode ser desfeita.',
  primaryButton: {
    text: 'Entendi',
  },
});`;

const INFO_CODE = `const { showInfo } = useAlert();

showInfo({
  title: 'Informação',
  message: 'Novos recursos disponíveis! Confira as atualizações.',
  primaryButton: {
    text: 'Ver Novidades',
    onPress: () => navigate('/updates'),
  },
});`;

const CONFIRM_CODE = `const { showConfirm } = useAlert();

showConfirm({
  title: 'Confirmar Exclusão',
  message: 'Tem certeza que deseja excluir este item?',
  onConfirm: async () => {
    await deleteItem();
    showSuccess({ title: 'Excluído', message: 'Item removido com sucesso.' });
  },
  onCancel: () => {
  },
  confirmText: 'Excluir',
  cancelText: 'Cancelar',
});`;

const DISMISSIBLE_CODE = `showInfo({
  title: 'Notificação',
  message: 'Toque fora do alerta para fechar.',
  dismissible: true, // Permite fechar tocando no backdrop
});`;

export const AlertSection: React.FC<AlertSectionProps> = ({ onCopyCode }) => {
  const { showSuccess, showError, showWarning, showInfo, showConfirm } =
    useAlert();

  const handleShowSuccess = () => {
    showSuccess('Operação concluída com sucesso.');
  };

  const handleShowError = () => {
    showError('Não foi possível completar a operação.');
  };

  const handleShowWarning = () => {
    showWarning('Esta ação pode ter consequências importantes.');
  };

  const handleShowInfo = () => {
    showInfo('Novos recursos disponíveis! Confira as atualizações.');
  };

  const handleShowConfirm = () => {
    showConfirm({
      title: 'Confirmar Ação',
      message: 'Tem certeza que deseja continuar com esta ação?',
      onConfirm: () => {
        showSuccess('Ação executada com sucesso.');
      },
      confirmText: 'Sim, Continuar',
      cancelText: 'Cancelar',
    });
  };

  return (
    <ComponentSection title="Alert System">
      <ShowcaseItem
        label="Setup Required"
        description="AlertProvider deve envolver a aplicação. Use useAlert() para acessar os métodos."
        onCopyCode={onCopyCode}
        code={ALERT_SETUP_CODE}
      >
        <View style={styles.column}>
          <Text variant="bodySecondary">
            O sistema de alertas usa Context API. Veja o código para setup
            completo.
          </Text>
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="Success Alert"
        description="Alerta de sucesso para confirmar operações bem-sucedidas"
        onCopyCode={onCopyCode}
        code={SUCCESS_CODE}
      >
        <Button variant="primary" onPress={handleShowSuccess}>
          Mostrar Success
        </Button>
      </ShowcaseItem>

      <ShowcaseItem
        label="Error Alert"
        description="Alerta de erro com opção de retry e cancelamento"
        onCopyCode={onCopyCode}
        code={ERROR_CODE}
      >
        <Button variant="destructive" onPress={handleShowError}>
          Mostrar Error
        </Button>
      </ShowcaseItem>

      <ShowcaseItem
        label="Warning Alert"
        description="Alerta de aviso para ações importantes"
        onCopyCode={onCopyCode}
        code={WARNING_CODE}
      >
        <Button variant="secondary" onPress={handleShowWarning}>
          Mostrar Warning
        </Button>
      </ShowcaseItem>

      <ShowcaseItem
        label="Info Alert"
        description="Alerta informativo com opção dismissible (toque fora para fechar)"
        onCopyCode={onCopyCode}
        code={INFO_CODE}
      >
        <Button variant="secondary" onPress={handleShowInfo}>
          Mostrar Info
        </Button>
      </ShowcaseItem>

      <ShowcaseItem
        label="Confirm Dialog"
        description="Diálogo de confirmação com callbacks para confirmar/cancelar"
        onCopyCode={onCopyCode}
        code={CONFIRM_CODE}
      >
        <Button variant="outline-primary" onPress={handleShowConfirm}>
          Mostrar Confirm
        </Button>
      </ShowcaseItem>

      <ShowcaseItem
        label="Dismissible Alert"
        description="Alertas podem ser fechados tocando no backdrop (fora do modal)"
        onCopyCode={onCopyCode}
        code={DISMISSIBLE_CODE}
      >
        <View style={styles.column}>
          <Text variant="bodySecondary">
            Use dismissible: true para permitir fechar o alerta tocando fora do
            modal. Experimente no exemplo Info acima.
          </Text>
        </View>
      </ShowcaseItem>
    </ComponentSection>
  );
};
