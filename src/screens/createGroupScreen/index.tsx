import React, { useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ArenaKeyboardAwareScrollView } from '@/components/ui/arenaKeyboardAwareScrollView';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { StateDropdown } from '@/components/ui/stateDropdown';
import { CityDropdown } from '@/components/ui/cityDropdown';
import { MultiSelectSports } from '@/components/ui/multiSelectSports';
import { OptimizedImage } from '@/components/ui/optimizedImage';
import { Label } from '@/components/ui/label';
import { AppLayout } from '@/components/AppLayout';
import { useSports } from '@/contexts/SportsContext';
import { useGroups } from '@/contexts/GroupsContext';
import { useImageUpload } from '@/hooks/useImageUpload';
import { useAlert } from '@/contexts/AlertContext';
import { ArenaColors } from '@/constants';
import { CreateGroupScreenProps } from './typesCreateGroupScreen';
import { useCreateGroupScreen } from './useCreateGroupScreen';
import { styles } from './stylesCreateGroupScreen';

export const CreateGroupScreen: React.FC<CreateGroupScreenProps> = ({
  navigation,
  route,
}) => {
  const mode = route.params?.mode || 'create';
  const groupId = route.params?.groupId;
  const groupData = route.params?.groupData;
  const isEditMode = mode === 'edit';

  const { sports, isLoading: sportsLoading } = useSports();
  const { refetch: refetchGroups } = useGroups();
  const { formData, errors, isSubmitting, updateField, handleSubmit } =
    useCreateGroupScreen(isEditMode ? groupData : undefined, groupId);

  const coverUpload = useImageUpload({
    allowsEditing: true,
    aspect: [16, 9],
    quality: 0.8,
  });
  const { showSuccess, showError } = useAlert();

  const handleCreate = useCallback(async () => {
    const success = await handleSubmit();
    if (success) {
      await refetchGroups();
      navigation.goBack();
    }
  }, [handleSubmit, refetchGroups, navigation]);

  const handlePickGroupCover = useCallback(async () => {
    try {
      const selectedImage = await coverUpload.pickImage();

      if (selectedImage) {
        const url = await coverUpload.uploadImage({
          image: selectedImage,
          folder: `/groups`,
          fileName: `group_cover_${Date.now()}.jpg`,
          tags: ['group', 'cover'],
        });

        if (url) {
          updateField('coverImage', url);
          showSuccess('Imagem de capa adicionada');
        }
      }
    } catch (error) {
      showError(
        error instanceof Error
          ? error.message
          : 'Erro ao fazer upload da imagem'
      );
    }
  }, [coverUpload, updateField, showSuccess, showError]);

  return (
    <AppLayout>
      <ArenaKeyboardAwareScrollView
        contentContainerStyle={styles.scrollContent}
        style={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bottomOffset={60}
      >
        <Text variant="headingPrimary">
          {isEditMode ? 'Editar Grupo' : 'Criar Grupo'}
        </Text>

        <View style={styles.section}>
          <Input
            label="Nome do grupo"
            placeholder="Ex: Futebol aos Sábados"
            value={formData.name}
            onChangeText={value => updateField('name', value)}
            error={errors.name}
            required
          />

          <Input
            label="Descrição"
            placeholder="Descreva o objetivo do grupo..."
            value={formData.description}
            onChangeText={value => updateField('description', value)}
            error={errors.description}
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.section}>
          <Label variant="form">Imagem de Capa (Opcional)</Label>
          <TouchableOpacity
            onPress={handlePickGroupCover}
            disabled={coverUpload.isUploading || isSubmitting}
            style={styles.coverSection}
          >
            <View>
              {formData.coverImage ? (
                <OptimizedImage
                  source={{ uri: formData.coverImage }}
                  style={styles.coverPreview}
                  contentFit="cover"
                  priority="normal"
                />
              ) : (
                <View style={styles.coverPlaceholder}>
                  <Ionicons
                    name="image"
                    size={32}
                    color={ArenaColors.neutral.medium}
                  />
                </View>
              )}
              <Text variant="captionSecondary" style={styles.coverText}>
                {coverUpload.isUploading
                  ? `Fazendo upload... ${Math.round(coverUpload.uploadProgress)}%`
                  : formData.coverImage
                    ? 'Toque para alterar'
                    : 'Toque para adicionar'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text variant="titleSecondary">Esportes</Text>
          <MultiSelectSports
            sports={sports}
            selectedSportIds={formData.sportIds}
            onToggleSport={sportId => {
              const newSportIds = formData.sportIds.includes(sportId)
                ? formData.sportIds.filter(id => id !== sportId)
                : [...formData.sportIds, sportId];
              updateField('sportIds', newSportIds);
            }}
            isLoading={sportsLoading}
          />
          {errors.sportIds && (
            <Text variant="labelError">{errors.sportIds}</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text variant="titleSecondary">Localização</Text>

          <StateDropdown
            value={formData.state}
            onChange={value => {
              updateField('state', value);
              if (formData.state && formData.state !== value) {
                updateField('city', '');
              }
            }}
            label="Estado"
            error={errors.state}
            required
            disabled={isSubmitting}
          />

          {formData.state && (
            <CityDropdown
              value={formData.city}
              onChange={value => updateField('city', value)}
              stateUF={formData.state}
              label="Cidade"
              error={errors.city}
              required
              disabled={isSubmitting}
            />
          )}
        </View>

        <View style={styles.section}>
          <Text variant="titleSecondary">Configurações</Text>
          <Switch
            value={formData.isPublic}
            onValueChange={value => updateField('isPublic', value)}
            label="Grupo público"
            labelPosition="right"
            variant="brand"
          />
          <Input
            label="Máximo de membros (opcional)"
            placeholder="Ex: 50"
            value={formData.maxMembers?.toString() || ''}
            onChangeText={value =>
              updateField('maxMembers', value ? parseInt(value) : undefined)
            }
            keyboardType="numeric"
          />
        </View>

        <View style={styles.actions}>
          <Button
            variant="primary"
            size="lg"
            onPress={handleCreate}
            loading={isSubmitting}
            fullWidth
          >
            {isEditMode ? 'Salvar Alterações' : 'Criar Grupo'}
          </Button>
          <Button
            variant="subtle"
            size="lg"
            onPress={() => navigation.goBack()}
            disabled={isSubmitting}
            fullWidth
          >
            Cancelar
          </Button>
        </View>
      </ArenaKeyboardAwareScrollView>
    </AppLayout>
  );
};
