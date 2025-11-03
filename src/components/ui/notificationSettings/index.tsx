import React, { useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from '@/components/ui/text';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { SportsLoading } from '@/components/ui/sportsLoading';
import { useNotifications } from '@/hooks/useNotifications';
import { useAlert } from '@/contexts/AlertContext';
import { styles } from './stylesNotificationSettings';
import { NotificationSettingsProps } from './typesNotificationSettings';

export const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  showTestButton = false,
}) => {
  const {
    preferences,
    permissionStatus,
    isLoading,
    updatePreferences,
    requestPermissions,
    sendTestNotification,
  } = useNotifications();

  const { showAlert } = useAlert();

  const handleToggle = useCallback(
    async (key: keyof typeof preferences, value: boolean) => {
      try {
        await updatePreferences({ [key]: value });
        showAlert({
          type: 'success',
          title: 'Preferências atualizadas',
          message: 'Suas preferências de notificação foram salvas.',
        });
      } catch (error) {
        showAlert({
          type: 'error',
          title: 'Erro',
          message: 'Não foi possível atualizar suas preferências.',
        });
      }
    },
    [updatePreferences, showAlert]
  );

  const handleRequestPermissions = useCallback(async () => {
    const granted = await requestPermissions();
    if (granted) {
      showAlert({
        type: 'success',
        title: 'Permissão concedida',
        message: 'Você receberá notificações do Arena.',
      });
    } else {
      showAlert({
        type: 'warning',
        title: 'Permissão negada',
        message: 'Habilite notificações nas configurações do dispositivo.',
      });
    }
  }, [requestPermissions, showAlert]);

  const handleTestNotification = useCallback(async () => {
    try {
      await sendTestNotification();
      showAlert({
        type: 'success',
        title: 'Notificação enviada',
        message: 'Você deve receber uma notificação de teste em breve.',
      });
    } catch (error) {
      showAlert({
        type: 'error',
        title: 'Erro',
        message: 'Não foi possível enviar a notificação de teste.',
      });
    }
  }, [sendTestNotification, showAlert]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <SportsLoading size="md" animationSpeed="normal" />
      </View>
    );
  }

  if (!permissionStatus?.granted) {
    return (
      <View style={styles.container}>
        <Text variant="bodyPrimary" style={styles.warningText}>
          Você precisa permitir notificações para receber atualizações sobre
          eventos, grupos e amigos.
        </Text>
        <Button variant="primary" onPress={handleRequestPermissions}>
          Permitir Notificações
        </Button>
      </View>
    );
  }

  if (!preferences) {
    return (
      <View style={styles.container}>
        <Text variant="bodySecondary">
          Não foi possível carregar suas preferências.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.section}>
        <Text variant="titlePrimary" style={styles.sectionTitle}>
          Eventos
        </Text>
        <Switch
          label="Convites para eventos"
          value={preferences.eventInvitations}
          onValueChange={value => handleToggle('eventInvitations', value)}
          variant="brand"
        />
        <Switch
          label="Lembretes de eventos"
          value={preferences.eventReminders}
          onValueChange={value => handleToggle('eventReminders', value)}
          variant="brand"
        />
        <Switch
          label="Atualizações de eventos"
          value={preferences.eventUpdates}
          onValueChange={value => handleToggle('eventUpdates', value)}
          variant="brand"
        />
      </View>

      <View style={styles.section}>
        <Text variant="titlePrimary" style={styles.sectionTitle}>
          Grupos
        </Text>
        <Switch
          label="Convites para grupos"
          value={preferences.groupInvitations}
          onValueChange={value => handleToggle('groupInvitations', value)}
          variant="brand"
        />
      </View>

      <View style={styles.section}>
        <Text variant="titlePrimary" style={styles.sectionTitle}>
          Amigos
        </Text>
        <Switch
          label="Solicitações de amizade"
          value={preferences.friendRequests}
          onValueChange={value => handleToggle('friendRequests', value)}
          variant="brand"
        />
      </View>

      {showTestButton && (
        <View style={styles.testSection}>
          <Button variant="secondary" onPress={handleTestNotification}>
            Enviar notificação de teste
          </Button>
        </View>
      )}
    </ScrollView>
  );
};
