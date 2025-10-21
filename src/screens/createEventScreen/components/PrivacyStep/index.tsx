import React, { useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { Label } from '@/components/ui/label';
import { ArenaColors } from '@/constants';
import { EventPrivacy } from '@/services/events/typesEvents';
import { styles } from './stylesPrivacyStep';
import { PrivacyStepProps } from './typesPrivacyStep';

interface PrivacyOption {
  value: EventPrivacy;
  label: string;
  description: string;
  iconName: keyof typeof Ionicons.glyphMap;
  iconColor: string;
}

const PRIVACY_OPTIONS: PrivacyOption[] = [
  {
    value: 'PUBLIC',
    label: 'Público',
    description: 'Qualquer pessoa pode ver e participar diretamente',
    iconName: 'globe-outline',
    iconColor: ArenaColors.semantic.success,
  },
  {
    value: 'GROUP_ONLY',
    label: 'Apenas Grupo',
    description: 'Apenas membros do grupo podem ver e participar',
    iconName: 'people-outline',
    iconColor: ArenaColors.brand.primary,
  },
  {
    value: 'APPROVAL_REQUIRED',
    label: 'Requer Aprovação',
    description: 'Você precisa aprovar cada solicitação de participação',
    iconName: 'checkmark-done-outline',
    iconColor: ArenaColors.semantic.warning,
  },
  {
    value: 'INVITE_ONLY',
    label: 'Apenas Convidados',
    description: 'Apenas pessoas que você convidar podem participar',
    iconName: 'mail-outline',
    iconColor: ArenaColors.semantic.error,
  },
];

export const PrivacyStep: React.FC<PrivacyStepProps> = ({
  formData,
  errors,
  onUpdate,
}) => {
  const handlePrivacyChange = useCallback(
    (privacy: EventPrivacy) => {
      const updates: { privacy: EventPrivacy; groupId?: string } = { privacy };

      if (privacy !== 'GROUP_ONLY') {
        updates.groupId = undefined;
      }

      onUpdate(updates);
    },
    [onUpdate]
  );

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Label variant="section" required>
          Privacidade do Evento
        </Label>
        <Text variant="bodySecondary" style={styles.helperText}>
          Escolha quem pode ver e participar do seu evento
        </Text>
      </View>

      <View style={styles.optionsGrid}>
        {PRIVACY_OPTIONS.map((option) => {
          const isSelected = formData.privacy === option.value;

          return (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.privacyOptionCard,
                isSelected && styles.privacyOptionCardSelected,
              ]}
              onPress={() => handlePrivacyChange(option.value)}
              activeOpacity={0.7}
              testID={`privacy-option-${option.value.toLowerCase()}`}
            >
              <View style={styles.privacyOptionHeader}>
                <View style={styles.privacyOptionIcon}>
                  <Ionicons
                    name={option.iconName}
                    size={24}
                    color={option.iconColor}
                  />
                </View>
                <View style={styles.radioOuter}>
                  {isSelected && <View style={styles.radioInner} />}
                </View>
              </View>

              <View style={styles.privacyOptionContent}>
                <Text
                  variant={isSelected ? 'bodyBoldAccent' : 'bodyPrimary'}
                  style={styles.privacyOptionLabel}
                >
                  {option.label}
                </Text>
                <Text variant="captionSecondary" style={styles.privacyOptionDescription}>
                  {option.description}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {errors.privacy && (
        <Text variant="bodyError" style={styles.errorText}>
          {errors.privacy}
        </Text>
      )}

      {formData.privacy === 'GROUP_ONLY' && (
        <View style={styles.groupSection}>
          <Label variant="form" required>
            Grupo
          </Label>
          <Text variant="bodySecondary" style={styles.helperText}>
            Seleção de grupo será implementada em breve
          </Text>
          {errors.groupId && (
            <Text variant="bodyError" style={styles.errorText}>
              {errors.groupId}
            </Text>
          )}
        </View>
      )}
    </View>
  );
};
