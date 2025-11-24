import React from 'react';
import { View, Modal } from 'react-native';
import { Text } from '@/components/ui/text';
import { SportsLoading } from '@/components/ui/sportsLoading';
import { LoadingOverlayProps } from './typesLoadingOverlay';
import { styles } from './stylesLoadingOverlay';

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  visible,
  mode = 'overlay',
  message = 'Carregando...',
  progress,
  onCancel,
  testID = 'loading-overlay',
}) => {
  if (!visible) return null;

  const renderContent = () => (
    <View
      style={[
        styles.contentContainer,
        mode === 'backdrop' && styles.backdropContainer,
        mode === 'fullscreen' && styles.fullscreenContainer,
      ]}
      testID={`${testID}-content`}
    >
      <SportsLoading
        size={mode === 'fullscreen' ? 'lg' : 'md'}
        testID={`${testID}-spinner`}
      />
      {message && (
        <Text
          variant="bodyPrimary"
          style={styles.messageText}
          testID={`${testID}-message`}
        >
          {message}
        </Text>
      )}
      {progress !== undefined && (
        <View style={styles.progressContainer} testID={`${testID}-progress`}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text variant="captionSecondary" style={styles.progressText}>
            {Math.round(progress)}%
          </Text>
        </View>
      )}
      {onCancel && (
        <Text
          variant="bodyAccent"
          onPress={onCancel}
          style={styles.cancelButton}
          testID={`${testID}-cancel`}
        >
          Cancelar
        </Text>
      )}
    </View>
  );

  if (mode === 'backdrop') {
    return (
      <View style={styles.backdropOverlay} testID={testID}>
        {renderContent()}
      </View>
    );
  }

  if (mode === 'fullscreen') {
    return (
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        statusBarTranslucent
        testID={testID}
      >
        <View style={styles.fullscreenOverlay}>{renderContent()}</View>
      </Modal>
    );
  }

  return null;
};
