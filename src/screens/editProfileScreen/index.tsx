import React, { useState, useCallback } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/datePicker';
import { SportsLoading } from '@/components/ui/sportsLoading';
import { RadioButton } from '@/components/ui/radioButton';
import { MultiSelectSports } from '@/components/ui/multiSelectSports';
import { SkillLevelModal } from '@/components/ui/skillLevelModal';
import { StateDropdown } from '@/components/ui/stateDropdown';
import { CityDropdown } from '@/components/ui/cityDropdown';
import { Switch } from '@/components/ui/switch';
import { SkillLevel } from '@/types/sport';
import { ArenaColors } from '@/constants';
import { useEditProfileScreen } from './useEditProfileScreen';
import { EditProfileScreenProps } from './typesEditProfileScreen';
import { styles } from './stylesEditProfileScreen';

export const EditProfileScreen: React.FC<EditProfileScreenProps> = ({
  navigation,
}) => {
  const {
    formData,
    errors,
    isLoading,
    isSaving,
    availableSports,
    handleFieldChange,
    handleToggleSport,
    handleTogglePrimary,
    handleUpdateSportLevel,
    handlePickProfilePicture,
    handlePickCoverPhoto,
    handleSave,
    handleCancel,
  } = useEditProfileScreen({ navigation });

  const [skillLevelModal, setSkillLevelModal] = useState<{
    visible: boolean;
    sportId: string;
    sportName: string;
    currentLevel: SkillLevel;
  } | null>(null);

  const handleEditLevel = useCallback(
    (sportId: string, sportName: string, currentLevel: SkillLevel) => {
      setSkillLevelModal({
        visible: true,
        sportId,
        sportName,
        currentLevel,
      });
    },
    []
  );

  const handleSelectLevel = useCallback(
    (level: SkillLevel) => {
      if (skillLevelModal) {
        handleUpdateSportLevel(skillLevelModal.sportId, level);
      }
    },
    [skillLevelModal, handleUpdateSportLevel]
  );

  const handleTogglePrimaryInModal = useCallback(
    (isPrimary: boolean) => {
      if (skillLevelModal && isPrimary) {
        handleTogglePrimary(skillLevelModal.sportId);
      } else if (skillLevelModal && !isPrimary) {
        handleTogglePrimary(skillLevelModal.sportId);
      }
    },
    [skillLevelModal, handleTogglePrimary]
  );

  const handleCloseModal = useCallback(() => {
    setSkillLevelModal(null);
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <SportsLoading size="lg" animationSpeed="normal" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleCancel}
          style={styles.headerButton}
          testID="cancel-button"
        >
          <Ionicons name="close" size={24} color={ArenaColors.neutral.light} />
        </TouchableOpacity>

        <Text variant="titlePrimary" style={styles.headerTitle}>
          Editar Perfil
        </Text>

        <TouchableOpacity
          onPress={handleSave}
          style={styles.headerButton}
          disabled={isSaving}
          testID="save-button"
        >
          <Ionicons
            name="checkmark"
            size={24}
            color={
              isSaving ? ArenaColors.neutral.medium : ArenaColors.brand.primary
            }
          />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={styles.scrollContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.section}>
            <Text variant="titleSecondary" style={styles.sectionTitle}>
              Fotos
            </Text>
            <TouchableOpacity
              onPress={handlePickProfilePicture}
              testID="pick-profile-picture"
            >
              <View>
                {formData.profilePicture ? (
                  <Image
                    source={{ uri: formData.profilePicture }}
                    style={styles.profilePictureImage}
                  />
                ) : (
                  <View style={styles.profilePictureContainer}>
                    <Ionicons
                      name="camera"
                      size={32}
                      color={ArenaColors.neutral.medium}
                    />
                  </View>
                )}
                <Text variant="captionSecondary" style={styles.photoLabel}>
                  Foto de Perfil
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handlePickCoverPhoto}
              testID="pick-cover-photo"
              style={styles.coverPhotoButton}
            >
              <View>
                {formData.coverPhoto ? (
                  <Image
                    source={{ uri: formData.coverPhoto }}
                    style={styles.coverPhotoImage}
                  />
                ) : (
                  <View style={styles.coverPhotoContainer}>
                    <Ionicons
                      name="image"
                      size={32}
                      color={ArenaColors.neutral.medium}
                    />
                  </View>
                )}
                <Text variant="captionSecondary" style={styles.photoLabel}>
                  Foto de Capa
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text variant="titleSecondary" style={styles.sectionTitle}>
              Informações Básicas
            </Text>
            <Input
              label="Nome"
              value={formData.firstName}
              onChangeText={value => handleFieldChange('firstName', value)}
              error={errors.firstName}
              placeholder="Digite seu nome"
              autoCapitalize="words"
              testID="input-first-name"
            />

            <Input
              label="Sobrenome"
              value={formData.lastName}
              onChangeText={value => handleFieldChange('lastName', value)}
              error={errors.lastName}
              placeholder="Digite seu sobrenome"
              autoCapitalize="words"
              testID="input-last-name"
            />
          </View>

          <View style={styles.section}>
            <Text variant="titleSecondary" style={styles.sectionTitle}>
              Detalhes Pessoais
            </Text>
            <DatePicker
              label="Data de Nascimento"
              variant="date"
              value={formData.birthDate}
              onChange={date => handleFieldChange('birthDate', date)}
              error={errors.birthDate}
              testID="input-birth-date"
            />

            <Text variant="labelPrimary" style={styles.genderLabel}>
              Gênero
            </Text>
            <RadioButton
              label="Masculino"
              selected={formData.gender === 'male'}
              onPress={() => handleFieldChange('gender', 'male')}
              testID="radio-male"
            />
            <RadioButton
              label="Feminino"
              selected={formData.gender === 'female'}
              onPress={() => handleFieldChange('gender', 'female')}
              testID="radio-female"
            />
            <RadioButton
              label="Outro"
              selected={formData.gender === 'other'}
              onPress={() => handleFieldChange('gender', 'other')}
              testID="radio-other"
            />
          </View>

          <View style={styles.section}>
            <Text variant="titleSecondary" style={styles.sectionTitle}>
              Sobre Mim
            </Text>
            <Input
              label="Bio"
              value={formData.bio}
              onChangeText={value => handleFieldChange('bio', value)}
              error={errors.bio}
              placeholder="Conte um pouco sobre você"
              multiline
              numberOfLines={4}
              maxLength={500}
              testID="input-bio"
            />
            <Text variant="captionSecondary" style={styles.bioCounter}>
              {formData.bio.length}/500 caracteres
            </Text>
          </View>

          <View style={styles.section}>
            <Text variant="titleSecondary" style={styles.sectionTitle}>
              Localização e Privacidade
            </Text>
            <StateDropdown
              value={formData.state}
              onChange={value => handleFieldChange('state', value)}
              label="Estado"
              error={errors.state}
              testID="input-state"
            />

            <CityDropdown
              stateUF={formData.state}
              value={formData.city}
              onChange={value => handleFieldChange('city', value)}
              label="Cidade"
              error={errors.city}
              testID="input-city"
            />

            <Switch
              value={formData.isProfilePrivate}
              onValueChange={value =>
                handleFieldChange('isProfilePrivate', value)
              }
              label="Perfil Privado"
              variant="brand"
              testID="switch-private-profile"
            />
            <Text variant="captionSecondary" style={styles.privacyHelper}>
              Quando ativado, seu perfil não aparecerá em recomendações de
              amigos
            </Text>
          </View>

          <View style={styles.section}>
            <Text variant="titleSecondary" style={styles.sectionTitle}>
              Esportes
            </Text>
            <MultiSelectSports
              sports={availableSports}
              selectedSportIds={formData.selectedSports}
              onToggleSport={handleToggleSport}
              sportLevels={formData.sportLevels}
              primarySportId={formData.primarySportId}
              onEditLevel={handleEditLevel}
              onTogglePrimary={handleTogglePrimary}
              testID="edit-profile-sports"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.footer}>
        <Button
          variant="primary"
          onPress={handleSave}
          disabled={isSaving}
          size="lg"
          testID="save-button-footer"
        >
          {isSaving ? 'Salvando...' : 'Salvar Alterações'}
        </Button>
      </View>

      {skillLevelModal && (
        <SkillLevelModal
          visible={skillLevelModal.visible}
          sportName={skillLevelModal.sportName}
          currentLevel={skillLevelModal.currentLevel}
          isPrimary={formData.primarySportId === skillLevelModal.sportId}
          onSelectLevel={handleSelectLevel}
          onTogglePrimary={handleTogglePrimaryInModal}
          onClose={handleCloseModal}
          testID="skill-level-modal"
        />
      )}
    </SafeAreaView>
  );
};
