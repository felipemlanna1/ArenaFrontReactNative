import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { AppLayout } from '@/components/AppLayout';
import { ArenaColors } from '@/constants';
import { styles } from './stylesSettingsScreen';
import { SettingsScreenProps } from './typesSettingsScreen';

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  navigation,
}) => {
  return (
    <AppLayout showHeader={false}>
      <ScrollView style={styles.container} testID="settings-screen">
        <View style={styles.scrollContent}>
          <View style={styles.section}>
            <Text variant="titlePrimary" style={styles.sectionTitle}>
              Dados e Privacidade
            </Text>

            <TouchableOpacity
              style={styles.settingItem}
              onPress={() => navigation.navigate('DeleteAccount')}
            >
              <Ionicons
                name="trash-outline"
                size={24}
                color={ArenaColors.semantic.error}
              />
              <Text
                variant="bodyPrimary"
                style={[styles.settingLabel, styles.destructive]}
              >
                Excluir Conta
              </Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={ArenaColors.semantic.error}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </AppLayout>
  );
};
