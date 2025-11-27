import React from 'react';
import { View, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { AppLayout } from '@/components/AppLayout';
import { ArenaColors } from '@/constants';
import { styles } from './stylesTermsScreen';
import { TermsScreenProps } from './typesTermsScreen';

export const TermsScreen: React.FC<TermsScreenProps> = () => {
  return (
    <AppLayout>
      <ScrollView
        contentContainerStyle={styles.container}
        testID="terms-screen"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Ionicons
            name="document-text-outline"
            size={64}
            color={ArenaColors.brand.primary}
          />

          <Text variant="headingPrimary" style={styles.title}>
            Termos de Uso
          </Text>

          <Text variant="captionSecondary" style={styles.date}>
            Última atualização: Janeiro de 2025
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titlePrimary" style={styles.sectionTitle}>
            1. Aceitação dos Termos
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph}>
            Ao acessar e usar o aplicativo Arena, você concorda em cumprir e
            estar vinculado aos seguintes termos e condições de uso.
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titlePrimary" style={styles.sectionTitle}>
            2. Uso do Aplicativo
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph}>
            O Arena é uma plataforma para organização de eventos esportivos e
            conexão entre atletas. Você concorda em usar o aplicativo apenas
            para fins legais e de acordo com estes termos.
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titlePrimary" style={styles.sectionTitle}>
            3. Conta de Usuário
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph}>
            Você é responsável por manter a confidencialidade de sua conta e
            senha e por todas as atividades que ocorram em sua conta.
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titlePrimary" style={styles.sectionTitle}>
            4. Privacidade
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph}>
            Sua privacidade é importante para nós. Consulte nossa Política de
            Privacidade para entender como coletamos, usamos e protegemos suas
            informações pessoais.
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titlePrimary" style={styles.sectionTitle}>
            5. Modificações
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph}>
            Reservamo-nos o direito de modificar estes termos a qualquer
            momento. Alterações significativas serão comunicadas através do
            aplicativo.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text variant="captionSecondary" style={styles.footerText}>
            Para dúvidas sobre estes termos, entre em contato:
          </Text>
          <Text variant="bodyPrimary" style={styles.email}>
            legal@arena.com.br
          </Text>
        </View>
      </ScrollView>
    </AppLayout>
  );
};
