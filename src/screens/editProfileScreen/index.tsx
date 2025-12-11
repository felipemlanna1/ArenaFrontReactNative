import React, { useState, useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AppLayout } from '@/components/AppLayout';
import { ArenaKeyboardAwareScrollView } from '@/components/ui/arenaKeyboardAwareScrollView';
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
import { OptimizedImage } from '@/components/ui/optimizedImage';
import { SkillLevel } from '@/types/sport';
import { ArenaColors, ArenaSpacing } from '@/constants';
import { useEditProfileScreen } from './useEditProfileScreen';
import { EditProfileScreenProps } from './typesEditProfileScreen';
import { styles } from './stylesEditProfileScreen';

export const EditProfileScreen: React.FC<EditProfileScreenProps> = ({
  navigation,
  route,
}) => {
  const insets = useSafeAreaInsets();

  const {
    formData,
    errors,
    isLoading,
    isSaving,
    availableSports,
    isUploadingAvatar,
    isUploadingCover,
    avatarUploadProgress,
    coverUploadProgress,
    calculatedAge,
    isFormComplete,
    handleFieldChange,
    handleToggleSport,
    handleTogglePrimary,
    handleUpdateSportLevel,
    handleRemoveSport,
    handlePickProfilePicture,
    handlePickCoverPhoto,
    handleSave,
    handleCancel,
  } = useEditProfileScreen({ navigation, route });

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

  const handleRemoveSportInModal = useCallback(() => {
    if (skillLevelModal) {
      handleRemoveSport(skillLevelModal.sportId);
    }
  }, [skillLevelModal, handleRemoveSport]);

  if (isLoading) {
    return (
      <AppLayout
        showHeader={true}
        headerVariant="secondary"
        headerTitle="Editar Perfil"
        headerShowBackButton={true}
        headerOnBackPress={handleCancel}
        testID="edit-profile-screen"
      >
        <View style={styles.loadingContainer}>
          <SportsLoading size="lg" animationSpeed="normal" />
        </View>
      </AppLayout>
    );
  }

  return (
    <AppLayout
      showHeader={true}
      headerVariant="secondary"
      headerTitle="Editar Perfil"
      headerShowBackButton={true}
      headerOnBackPress={handleCancel}
      testID="edit-profile-screen"
    >
      <ArenaKeyboardAwareScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bottomOffset={100}
      >
        <View style={styles.section}>
          <Text variant="titleSecondary" style={styles.sectionTitle}>
            Fotos
          </Text>

          <View style={styles.profilePictureSection}>
            <TouchableOpacity
              onPress={handlePickProfilePicture}
              testID="pick-profile-picture"
              style={styles.profilePictureTouchable}
              disabled={isUploadingAvatar || isSaving}
            >
              <View style={styles.profilePictureWrapper}>
                {formData.profilePicture ? (
                  <OptimizedImage
                    source={{ uri: formData.profilePicture }}
                    style={styles.profilePictureImage}
                    contentFit="cover"
                    priority="high"
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
                {isUploadingAvatar ? (
                  <View style={styles.uploadOverlay}>
                    <SportsLoading size="sm" animationSpeed="fast" />
                  </View>
                ) : (
                  <View style={styles.cameraBadge}>
                    <Ionicons
                      name="camera"
                      size={16}
                      color={ArenaColors.neutral.light}
                    />
                  </View>
                )}
              </View>
              <Text variant="captionSecondary" style={styles.photoLabel}>
                {isUploadingAvatar
                  ? `Enviando... ${Math.round(avatarUploadProgress)}%`
                  : 'Foto de Perfil'}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handlePickCoverPhoto}
            testID="pick-cover-photo"
            style={styles.coverPhotoButton}
            disabled={isUploadingCover || isSaving}
          >
            <View style={styles.coverPhotoWrapper}>
              {formData.coverPhoto ? (
                <OptimizedImage
                  source={{ uri: formData.coverPhoto }}
                  style={styles.coverPhotoImage}
                  contentFit="cover"
                  priority="normal"
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
              {isUploadingCover ? (
                <View style={styles.uploadOverlay}>
                  <SportsLoading size="sm" animationSpeed="fast" />
                </View>
              ) : (
                <View style={styles.cameraBadge}>
                  <Ionicons
                    name="camera"
                    size={16}
                    color={ArenaColors.neutral.light}
                  />
                </View>
              )}
            </View>
            <Text variant="captionSecondary" style={styles.photoLabel}>
              {isUploadingCover
                ? `Enviando... ${Math.round(coverUploadProgress)}%`
                : 'Foto de Capa'}
            </Text>
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

          {route?.params?.fromOAuth && (
            <Input
              label="Username"
              value={formData.username}
              onChangeText={value =>
                handleFieldChange('username', value.toLowerCase())
              }
              error={errors.username}
              placeholder="Digite seu username"
              autoCapitalize="none"
              autoCorrect={false}
              helperText="Usado para identificar você no app. Apenas letras minúsculas, números e _"
              required={route?.params?.requireCompletion}
              testID="input-username"
            />
          )}
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

          {calculatedAge !== null && (
            <View style={styles.ageDisplay}>
              <Text variant="bodySecondary">
                {formData.gender
                  ? `${
                      formData.gender === 'male'
                        ? 'Masculino'
                        : formData.gender === 'female'
                          ? 'Feminino'
                          : 'Outro'
                    } - ${calculatedAge} anos`
                  : `${calculatedAge} anos`}
              </Text>
            </View>
          )}
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
            Quando ativado, seu perfil não aparecerá em recomendações de amigos
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
      </ArenaKeyboardAwareScrollView>

      <View
        style={[
          styles.footer,
          { paddingBottom: ArenaSpacing.md + (insets.bottom || 0) },
        ]}
      >
        <Button
          variant="primary"
          onPress={handleSave}
          disabled={!isFormComplete || isSaving}
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
          onRemoveSport={handleRemoveSportInModal}
          onClose={handleCloseModal}
          testID="skill-level-modal"
        />
      )}
    </AppLayout>
  );
};
