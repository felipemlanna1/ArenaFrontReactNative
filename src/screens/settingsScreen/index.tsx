import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { RadioButton } from '@/components/ui/radioButton';
import { AppLayout } from '@/components/AppLayout';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useTheme } from '@/contexts/ThemeContext';
import { useSettingsScreen } from './useSettingsScreen';
import { createStyles } from './stylesSettingsScreen';
import { SettingsScreenProps } from './typesSettingsScreen';

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  navigation,
}) => {
  const { colors } = useTheme();
  const styles = useThemedStyles(createStyles);
  const { theme, handleThemeChange } = useSettingsScreen();

  return (
    <AppLayout showHeader={false}>
      <ScrollView style={styles.container} testID="settings-screen">
        <View style={styles.scrollContent}>
          <View style={styles.section}>
            <Text variant="titlePrimary" style={styles.sectionTitle}>
              Aparência
            </Text>

            <View style={styles.themeOptions}>
              <RadioButton
                label="Tema Preto"
                selected={theme === 'black'}
                onPress={() => handleThemeChange('black')}
                testID="theme-black"
              />
              <Text variant="captionSecondary" style={styles.helperText}>
                Fundo preto puro (#000000)
              </Text>

              <RadioButton
                label="Tema Azul"
                selected={theme === 'blueGray'}
                onPress={() => handleThemeChange('blueGray')}
                testID="theme-blue-gray"
              />
              <Text variant="captionSecondary" style={styles.helperText}>
                Fundo azul-cinza (#1B1D29) - versão produção
              </Text>

              <RadioButton
                label="Tema Claro"
                selected={theme === 'light'}
                onPress={() => handleThemeChange('light')}
                testID="theme-light"
              />
              <Text variant="captionSecondary" style={styles.helperText}>
                Fundo claro para uso durante o dia
              </Text>
            </View>
          </View>

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
                color={colors.semantic.error}
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
                color={colors.semantic.error}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </AppLayout>
  );
};
