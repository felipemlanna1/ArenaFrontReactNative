import React, { useCallback, createElement } from 'react';
import { View, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { DatePicker } from '@/components/ui/datePicker';
import { Checkbox } from '@/components/ui/checkbox';
import { SportsLoading } from '@/components/ui/sportsLoading';
import { Label } from '@/components/ui/label';
import { MultiSelectSports } from '@/components/ui/multiSelectSports';
import { DURATION_OPTIONS } from '@/screens/createEventScreen/typesCreateEventScreen';
import {
  ArenaColors,
  ArenaSpacing,
  ArenaBorders,
  ArenaTypography,
} from '@/constants';
import { BasicInfoStepProps } from './typesBasicInfoStep';
import { useBasicInfoStep } from './useBasicInfoStep';
import { styles } from './stylesBasicInfoStep';

const formatDateForInput = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

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
    <View style={styles.container}>
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
        {Platform.OS === 'web' ? (
          <View>
            <Label variant="form" required>
              Data e Hora
            </Label>
            {createElement('input', {
              type: 'datetime-local',
              value: formData.startDate
                ? formatDateForInput(formData.startDate)
                : '',
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                const dateValue = e.target.value;
                if (dateValue) {
                  const newDate = new Date(dateValue);
                  onUpdate({ startDate: newDate });
                }
              },
              min: formatDateForInput(new Date()),
              placeholder: 'Selecione data e hora do evento',
              style: {
                width: '100%',
                padding: `${ArenaSpacing.md}px`,
                fontSize: `${ArenaTypography.size.md}px`,
                fontFamily: ArenaTypography.family.body,
                color: ArenaColors.neutral.light,
                backgroundColor: ArenaColors.neutral.dark,
                border: errors.startDate
                  ? `2px solid ${ArenaColors.semantic.error}`
                  : `1px solid ${ArenaColors.neutral.medium}`,
                borderRadius: `${ArenaBorders.radius.md}px`,
                outline: 'none',
              },
              'data-testid': 'datetime-input-web',
            })}
            {errors.startDate && (
              <Text variant="captionSecondary" style={styles.errorText}>
                {errors.startDate}
              </Text>
            )}
          </View>
        ) : (
          <DatePicker
            label="Data e Hora"
            variant="datetime"
            value={formData.startDate}
            onChange={date => onUpdate({ startDate: date })}
            error={errors.startDate}
            minimumDate={new Date()}
            placeholder="Selecione data e hora do evento"
          />
        )}
      </View>

      <View style={styles.section}>
        <Label variant="section" required>
          Duração
        </Label>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.durationScrollContent}
          style={styles.durationScroll}
        >
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
        </ScrollView>
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
    </View>
  );
};
