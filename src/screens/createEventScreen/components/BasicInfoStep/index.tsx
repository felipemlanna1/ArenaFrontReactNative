import React, { useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ArenaKeyboardAwareScrollView } from '@/components/ui/arenaKeyboardAwareScrollView';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { DatePicker } from '@/components/ui/datePicker';
import { Checkbox } from '@/components/ui/checkbox';
import { SportsLoading } from '@/components/ui/sportsLoading';
import { Label } from '@/components/ui/label';
import { MultiSelectSports } from '@/components/ui/multiSelectSports';
import { DURATION_OPTIONS } from '@/screens/createEventScreen/typesCreateEventScreen';
import { BasicInfoStepProps } from './typesBasicInfoStep';
import { useBasicInfoStep } from './useBasicInfoStep';
import { styles } from './stylesBasicInfoStep';

export const BasicInfoStep: React.FC<BasicInfoStepProps> = ({
  formData,
  errors,
  onUpdate,
  isEditMode = false,
}) => {
  const {
    sports,
    isLoadingSports,
    sportsError,
    showDescriptionField,
    setShowDescriptionField,
  } = useBasicInfoStep();

  const handleSportToggle = useCallback(
    (sportId: string) => {
      onUpdate({ sportId });
    },
    [onUpdate]
  );

  return (
    <ArenaKeyboardAwareScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      bottomOffset={60}
    >
      <View style={styles.section}>
        <Input
          label="Título do evento"
          placeholder="Ex: Racha de Futebol"
          value={formData.title}
          onChangeText={title => onUpdate({ title })}
          error={errors.title}
          maxLength={100}
        />
      </View>

      <View style={styles.section}>
        <Label variant="section" required>
          Esporte
        </Label>

        {isLoadingSports ? (
          <SportsLoading size="sm" />
        ) : sportsError ? (
          <Text variant="captionError" style={styles.errorText}>
            {sportsError}
          </Text>
        ) : isEditMode && formData.sportId ? (
          <View>
            <MultiSelectSports
              sports={sports.filter(sport => sport.id === formData.sportId)}
              selectedSportIds={[formData.sportId]}
              onToggleSport={() => {}}
              testID="basic-info-sports-disabled"
            />
            <Text variant="captionSecondary" style={styles.editModeText}>
              Esporte não pode ser alterado após criação
            </Text>
          </View>
        ) : (
          <MultiSelectSports
            sports={sports}
            selectedSportIds={formData.sportId ? [formData.sportId] : []}
            onToggleSport={handleSportToggle}
            testID="basic-info-sports"
          />
        )}
        {errors.sportId && (
          <Text variant="captionError" style={styles.errorText}>
            {errors.sportId}
          </Text>
        )}
      </View>

      <View style={styles.section}>
        <DatePicker
          label="Data e Hora"
          variant="datetime"
          value={formData.startDate}
          onChange={date => onUpdate({ startDate: date })}
          error={errors.startDate}
          minimumDate={new Date()}
          placeholder="Selecione data e hora do evento"
        />
      </View>

      <View style={styles.section}>
        <Label variant="section" required>
          Duração
        </Label>
        <View style={styles.durationContainer}>
          {DURATION_OPTIONS.map(option => (
            <Checkbox
              key={option.value}
              variant="card"
              label={option.label}
              checked={formData.duration === option.value}
              onPress={() => onUpdate({ duration: option.value })}
              testID={`duration-${option.value}`}
            />
          ))}
        </View>
        {errors.duration && (
          <Text variant="captionError" style={styles.errorText}>
            {errors.duration}
          </Text>
        )}
      </View>

      {showDescriptionField ? (
        <View style={styles.section}>
          <Input
            label="Descrição (opcional)"
            placeholder="Detalhes sobre o evento..."
            value={formData.description || ''}
            onChangeText={description => onUpdate({ description })}
            multiline
            numberOfLines={4}
            maxLength={1000}
          />
        </View>
      ) : (
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setShowDescriptionField(true)}
        >
          <Text variant="labelPrimary" style={styles.toggleText}>
            + Adicionar descrição
          </Text>
        </TouchableOpacity>
      )}
    </ArenaKeyboardAwareScrollView>
  );
};
