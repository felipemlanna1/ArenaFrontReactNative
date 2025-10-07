import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Input } from '@/components/ui/input';
import { DatePicker } from '@/components/ui/datePicker';
import { CardCheckbox } from '@/components/ui/cardCheckbox';
import { SportsLoading } from '@/components/ui/sportsLoading';
import { Label } from '@/components/ui/label';
import { DURATION_OPTIONS } from '../../typesCreateEventScreen';
import { BasicInfoStepProps } from './typesBasicInfoStep';
import { useBasicInfoStep } from './useBasicInfoStep';
import { styles } from './stylesBasicInfoStep';

export const BasicInfoStep: React.FC<BasicInfoStepProps> = ({
  formData,
  errors,
  onUpdate,
}) => {
  const {
    sports,
    isLoadingSports,
    sportsError,
    showDescriptionField,
    setShowDescriptionField,
  } = useBasicInfoStep();

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
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
          <Text style={styles.errorText}>{sportsError}</Text>
        ) : (
          <View style={styles.sportsGrid}>
            {sports.map(sport => (
              <CardCheckbox
                key={sport.id}
                label={sport.name}
                checked={formData.sportId === sport.id}
                onPress={() => onUpdate({ sportId: sport.id })}
                testID={`sport-${sport.id}`}
              />
            ))}
          </View>
        )}
        {errors.sportId && (
          <Text style={styles.errorText}>{errors.sportId}</Text>
        )}
      </View>

      <View style={styles.section}>
        <DatePicker
          label="Data e Hora"
          variant="datetime"
          value={formData.startDate}
          onChange={(date) => onUpdate({ startDate: date })}
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
            <CardCheckbox
              key={option.value}
              label={option.label}
              checked={formData.duration === option.value}
              onPress={() => onUpdate({ duration: option.value })}
              testID={`duration-${option.value}`}
            />
          ))}
        </View>
        {errors.duration && (
          <Text style={styles.errorText}>{errors.duration}</Text>
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
          <Text style={styles.toggleText}>+ Adicionar descrição</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};
