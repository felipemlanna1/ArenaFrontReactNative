import React from 'react';
import { View, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { AppLayout } from '@/components/AppLayout';
import { ArenaColors } from '@/constants';
import { styles } from './stylesHelpScreen';
import { HelpScreenProps } from './typesHelpScreen';

export const HelpScreen: React.FC<HelpScreenProps> = () => {
  return (
    <AppLayout>
      <ScrollView
        contentContainerStyle={styles.container}
        testID="help-screen"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Ionicons
            name="help-circle-outline"
            size={64}
            color={ArenaColors.brand.primary}
          />

          <Text variant="headingPrimary" style={styles.title}>
            Central de Ajuda
          </Text>

          <Text variant="bodySecondary" style={styles.subtitle}>
            Encontre respostas para as perguntas mais frequentes
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titlePrimary" style={styles.sectionTitle}>
            Perguntas Frequentes
          </Text>

          <View style={styles.faqItem}>
            <Text variant="titleSecondary" style={styles.question}>
              Como criar um evento?
            </Text>
            <Text variant="bodySecondary" style={styles.answer}>
              Toque no botão "+" na tela de eventos e preencha as informações do
              evento que deseja criar.
            </Text>
          </View>

          <View style={styles.faqItem}>
            <Text variant="titleSecondary" style={styles.question}>
              Como adicionar amigos?
            </Text>
            <Text variant="bodySecondary" style={styles.answer}>
              Vá para a aba "Amigos", busque pelo nome do usuário e envie uma
              solicitação de amizade.
            </Text>
          </View>

          <View style={styles.faqItem}>
            <Text variant="titleSecondary" style={styles.question}>
              Como participar de um grupo?
            </Text>
            <Text variant="bodySecondary" style={styles.answer}>
              Na tela de grupos, navegue pelas recomendações e toque em "Entrar"
              no grupo desejado.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text variant="titlePrimary" style={styles.sectionTitle}>
            Precisa de mais ajuda?
          </Text>

          <Text variant="bodySecondary" style={styles.contactText}>
            Entre em contato com nosso suporte:
          </Text>

          <Text variant="bodyPrimary" style={styles.email}>
            suporte@arena.com.br
          </Text>
        </View>
      </ScrollView>
    </AppLayout>
  );
};
