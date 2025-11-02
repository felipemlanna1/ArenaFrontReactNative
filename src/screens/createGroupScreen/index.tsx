import React, { useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { MultiSelectSports } from '@/components/ui/multiSelectSports';
import { AppLayout } from '@/components/AppLayout';
import { useSports } from '@/contexts/SportsContext';
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
  const { formData, errors, isSubmitting, updateField, handleSubmit } =
    useCreateGroupScreen(isEditMode ? groupData : undefined, groupId);

  const handleCreate = useCallback(async () => {
    const success = await handleSubmit();
    if (success) {
      navigation.goBack();
    }
  }, [handleSubmit, navigation]);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <AppLayout onBack={handleGoBack}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
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
          <View style={styles.row}>
            <View style={styles.flex1}>
              <Input
                label="Cidade"
                placeholder="São Paulo"
                value={formData.city}
                onChangeText={value => updateField('city', value)}
                error={errors.city}
              />
            </View>
            <View style={styles.flex1}>
              <Input
                label="Estado"
                placeholder="SP"
                value={formData.state}
                onChangeText={value =>
                  updateField('state', value.toUpperCase())
                }
                error={errors.state}
                maxLength={2}
              />
            </View>
          </View>
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
      </ScrollView>
    </AppLayout>
  );
};
