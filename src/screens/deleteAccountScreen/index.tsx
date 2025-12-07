import React from 'react';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AppLayout } from '@/components/AppLayout';
import { ArenaKeyboardAwareScrollView } from '@/components/ui/arenaKeyboardAwareScrollView';
import { ArenaColors } from '@/constants';
import { styles } from './stylesDeleteAccountScreen';
import { DeleteAccountScreenProps } from './typesDeleteAccountScreen';
import { useDeleteAccountScreen } from './useDeleteAccountScreen';

export const DeleteAccountScreen: React.FC<DeleteAccountScreenProps> = ({
  navigation,
}) => {
  const {
    step,
    keyword,
    isDeleting,
    setStep,
    setKeyword,
    handleDeleteAccount,
    isKeywordValid,
  } = useDeleteAccountScreen();

  const renderInfoStep = () => (
    <View style={styles.stepContainer}>
      <View style={styles.iconContainer}>
        <Ionicons
          name="warning-outline"
          size={64}
          color={ArenaColors.semantic.error}
        />
      </View>

      <Text variant="headingPrimary" style={styles.title}>
        Excluir Conta
      </Text>

      <Text variant="bodySecondary" style={styles.description}>
        Esta ação é <Text variant="bodyPrimary">IRREVERSÍVEL</Text>. Ao excluir
        sua conta:
      </Text>

      <View style={styles.bulletList}>
        <View style={styles.bulletItem}>
          <Ionicons
            name="close-circle"
            size={20}
            color={ArenaColors.semantic.error}
            style={styles.bulletIcon}
          />
          <Text variant="bodySecondary" style={styles.bulletText}>
            Você perderá acesso à plataforma imediatamente
          </Text>
        </View>

        <View style={styles.bulletItem}>
          <Ionicons
            name="close-circle"
            size={20}
            color={ArenaColors.semantic.error}
            style={styles.bulletIcon}
          />
          <Text variant="bodySecondary" style={styles.bulletText}>
            Todos os seus dados pessoais serão excluídos
          </Text>
        </View>

        <View style={styles.bulletItem}>
          <Ionicons
            name="close-circle"
            size={20}
            color={ArenaColors.semantic.error}
            style={styles.bulletIcon}
          />
          <Text variant="bodySecondary" style={styles.bulletText}>
            Todas as suas amizades serão removidas
          </Text>
        </View>

        <View style={styles.bulletItem}>
          <Ionicons
            name="close-circle"
            size={20}
            color={ArenaColors.semantic.error}
            style={styles.bulletIcon}
          />
          <Text variant="bodySecondary" style={styles.bulletText}>
            Sua participação em eventos futuros será cancelada
          </Text>
        </View>

        <View style={styles.bulletItem}>
          <Ionicons
            name="checkmark-circle"
            size={20}
            color={ArenaColors.semantic.success}
            style={styles.bulletIcon}
          />
          <Text variant="bodySecondary" style={styles.bulletText}>
            Seu username e email ficarão disponíveis para reutilização
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button variant="destructive" onPress={() => setStep('confirm')}>
          Continuar com Exclusão
        </Button>

        <Button variant="secondary" onPress={() => navigation.goBack()}>
          Cancelar
        </Button>
      </View>
    </View>
  );

  const renderConfirmStep = () => (
    <View style={styles.stepContainer}>
      <View style={styles.iconContainer}>
        <Ionicons
          name="alert-circle-outline"
          size={64}
          color={ArenaColors.semantic.warning}
        />
      </View>

      <Text variant="headingPrimary" style={styles.title}>
        Tem certeza?
      </Text>

      <Text variant="bodySecondary" style={styles.description}>
        Você está prestes a excluir sua conta permanentemente. Esta ação não
        pode ser desfeita.
      </Text>

      <Text variant="bodySecondary" style={styles.lgpdNotice}>
        De acordo com a LGPD (Lei Geral de Proteção de Dados), todos os seus
        dados pessoais serão excluídos conforme Artigo 18, inciso VI.
      </Text>

      <View style={styles.buttonContainer}>
        <Button variant="destructive" onPress={() => setStep('keyword')}>
          Sim, Excluir Minha Conta
        </Button>

        <Button variant="secondary" onPress={() => setStep('info')}>
          Voltar
        </Button>
      </View>
    </View>
  );

  const renderKeywordStep = () => (
    <View style={styles.stepContainer}>
      <View style={styles.iconContainer}>
        <Ionicons
          name="key-outline"
          size={64}
          color={ArenaColors.brand.primary}
        />
      </View>

      <Text variant="headingPrimary" style={styles.title}>
        Confirmação Final
      </Text>

      <Text variant="bodySecondary" style={styles.description}>
        Para confirmar a exclusão, digite exatamente a palavra-chave abaixo:
      </Text>

      <View style={styles.keywordBox}>
        <Text variant="bodyPrimary" style={styles.keywordText}>
          EXCLUIR PERMANENTEMENTE
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <Input
          label="Digite a palavra-chave"
          value={keyword}
          onChangeText={setKeyword}
          placeholder="EXCLUIR PERMANENTEMENTE"
          autoCapitalize="characters"
          error={
            keyword && !isKeywordValid ? 'Palavra-chave incorreta' : undefined
          }
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          variant="destructive"
          onPress={handleDeleteAccount}
          disabled={!isKeywordValid || isDeleting}
          loading={isDeleting}
        >
          Confirmar Exclusão
        </Button>

        <Button
          variant="secondary"
          onPress={() => setStep('confirm')}
          disabled={isDeleting}
        >
          Cancelar
        </Button>
      </View>
    </View>
  );

  return (
    <AppLayout>
      <ArenaKeyboardAwareScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bottomOffset={60}
      >
        {step === 'info' && renderInfoStep()}
        {step === 'confirm' && renderConfirmStep()}
        {step === 'keyword' && renderKeywordStep()}
      </ArenaKeyboardAwareScrollView>
    </AppLayout>
  );
};
