import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { PrivacyBadge } from '@/components/ui/privacyBadge';
import { OptimizedImage } from '@/components/ui/optimizedImage';
import { SportsLoading } from '@/components/ui/sportsLoading';
import { Label } from '@/components/ui/label';
import { ArenaColors } from '@/constants';
import { useImageUpload } from '@/hooks/useImageUpload';
import { useAlert } from '@/contexts/AlertContext';
import { ReviewStepProps } from './typesReviewStep';
import { styles } from './stylesReviewStep';

export const ReviewStep: React.FC<ReviewStepProps> = ({
  formData,
  errors,
  onUpdate,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const coverUpload = useImageUpload({
    allowsEditing: true,
    aspect: [16, 9],
    quality: 0.8,
  });
  const { showSuccess, showError } = useAlert();

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

  const handlePickEventCover = async () => {
    try {
      const selectedImage = await coverUpload.pickImage();

      if (selectedImage) {
        const url = await coverUpload.uploadImage({
          image: selectedImage,
          folder: `/events`,
          fileName: `event_cover_${Date.now()}.jpg`,
          tags: ['event', 'cover'],
        });

        if (url) {
          onUpdate({ coverImage: url });
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
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.previewCard}>
        <Text variant="headingPrimary">{formData.title || 'Sem título'}</Text>
        <View style={styles.divider} />

        <View style={styles.previewRow}>
          <Ionicons
            name="calendar-outline"
            size={20}
            color={ArenaColors.neutral.medium}
          />
          <Text variant="labelPrimary">{formatDate(formData.startDate)}</Text>
        </View>

        <View style={styles.previewRow}>
          <Ionicons
            name="time-outline"
            size={20}
            color={ArenaColors.neutral.medium}
          />
          <Text variant="labelPrimary">{formData.duration} minutos</Text>
        </View>

        <View style={styles.previewRow}>
          <Ionicons
            name="location-outline"
            size={20}
            color={ArenaColors.neutral.medium}
          />
          <Text variant="labelPrimary">{formatLocation()}</Text>
        </View>

        <View style={styles.previewRow}>
          <PrivacyBadge
            privacy={formData.privacy}
            groupName={formData.groupId ? 'Grupo Selecionado' : undefined}
            size="sm"
          />
        </View>

        <View style={styles.previewRow}>
          <Ionicons
            name="people-outline"
            size={20}
            color={ArenaColors.neutral.medium}
          />
          <Text variant="labelPrimary">
            {formData.maxParticipants
              ? `Até ${formData.maxParticipants} pessoas`
              : 'Sem limite'}
          </Text>
        </View>

        <View style={styles.previewRow}>
          <Ionicons
            name="cash-outline"
            size={20}
            color={ArenaColors.neutral.medium}
          />
          <Text variant="labelPrimary">
            {!formData.price || formData.price === 0
              ? 'Gratuito'
              : `R$ ${Number(formData.price).toFixed(2)}`}
          </Text>
        </View>
      </View>

      <View>
        <TouchableOpacity
          style={styles.accordionHeader}
          onPress={() => setShowAdvanced(!showAdvanced)}
        >
          <Text variant="titleSecondary">Opções Avançadas (Opcional)</Text>
          <Text variant="labelPrimary">{showAdvanced ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        {showAdvanced && (
          <View style={styles.accordionContent}>
            <View style={styles.row}>
              <View style={styles.flex1}>
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
              <View style={styles.flex1}>
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

            <View style={styles.coverSection}>
              <Label variant="form">Imagem de Capa (Opcional)</Label>
              <TouchableOpacity
                onPress={handlePickEventCover}
                disabled={coverUpload.isUploading}
                style={styles.coverButton}
              >
                <View style={styles.coverContainer}>
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
                  {coverUpload.isUploading && (
                    <View style={styles.uploadOverlay}>
                      <SportsLoading size="sm" animationSpeed="fast" />
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
          </View>
        )}
      </View>
    </ScrollView>
  );
};
