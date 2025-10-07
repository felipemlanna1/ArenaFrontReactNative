import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Input } from '@/components/ui/input';
import { ReviewStepProps } from './typesReviewStep';
import { styles } from './stylesReviewStep';

export const ReviewStep: React.FC<ReviewStepProps> = ({
  formData,
  errors,
  onUpdate,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const formatDate = (date: Date | null) => {
    if (!date) return '-';
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatLocation = () => {
    const { street, number, district, city, state } = formData.location;
    return `${street}${number ? `, ${number}` : ''} - ${district}, ${city}/${state}`;
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.previewCard}>
        <Text style={styles.previewTitle}>
          {formData.title || 'Sem título'}
        </Text>
        <View style={styles.divider} />

        <View style={styles.previewRow}>
          <Text style={styles.previewLabel}>📅</Text>
          <Text style={styles.previewValue}>
            {formatDate(formData.startDate)}
          </Text>
        </View>

        <View style={styles.previewRow}>
          <Text style={styles.previewLabel}>⏱️</Text>
          <Text style={styles.previewValue}>{formData.duration} minutos</Text>
        </View>

        <View style={styles.previewRow}>
          <Text style={styles.previewLabel}>📍</Text>
          <Text style={styles.previewValue}>{formatLocation()}</Text>
        </View>

        <View style={styles.previewRow}>
          <Text style={styles.previewLabel}>👥</Text>
          <Text style={styles.previewValue}>
            {formData.maxParticipants
              ? `Até ${formData.maxParticipants} pessoas`
              : 'Sem limite'}
          </Text>
        </View>

        <View style={styles.previewRow}>
          <Text style={styles.previewLabel}>💰</Text>
          <Text style={styles.previewValue}>
            {formData.price === 0
              ? 'Gratuito'
              : `R$ ${formData.price.toFixed(2)}`}
          </Text>
        </View>
      </View>

      <View>
        <TouchableOpacity
          style={styles.accordionHeader}
          onPress={() => setShowAdvanced(!showAdvanced)}
        >
          <Text style={styles.accordionTitle}>Opções Avançadas (Opcional)</Text>
          <Text style={styles.previewValue}>{showAdvanced ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        {showAdvanced && (
          <View style={styles.accordionContent}>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <View style={{ flex: 1 }}>
                <Input
                  label="Idade Mínima"
                  placeholder="Ex: 18"
                  value={formData.ageRestriction?.min?.toString() || ''}
                  onChangeText={value =>
                    onUpdate({
                      ageRestriction: {
                        ...formData.ageRestriction,
                        min: parseInt(value) || undefined,
                      },
                    })
                  }
                  keyboardType="numeric"
                  error={errors.ageMin}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Input
                  label="Idade Máxima"
                  placeholder="Ex: 60"
                  value={formData.ageRestriction?.max?.toString() || ''}
                  onChangeText={value =>
                    onUpdate({
                      ageRestriction: {
                        ...formData.ageRestriction,
                        max: parseInt(value) || undefined,
                      },
                    })
                  }
                  keyboardType="numeric"
                  error={errors.ageMax}
                />
              </View>
            </View>

            <Input
              label="Regras do Evento"
              placeholder="Ex: Uso obrigatório de equipamentos..."
              value={formData.rules || ''}
              onChangeText={rules => onUpdate({ rules })}
              multiline
              numberOfLines={3}
              maxLength={2000}
              error={errors.rules}
            />

            <Input
              label="Requisitos"
              placeholder="Ex: Trazer água, protetor solar..."
              value={formData.requirements || ''}
              onChangeText={requirements => onUpdate({ requirements })}
              multiline
              numberOfLines={3}
              maxLength={1000}
              error={errors.requirements}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};
