import React, { useMemo } from 'react';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { ArenaColors } from '@/constants';
import { styles } from './stylesEventRequirementsSection';
import type { EventRequirementsSectionProps } from './typesEventRequirementsSection';

/**
 * Componente EventRequirementsSection
 *
 * Exibe lista de requisitos/itens necessários para o evento
 * com checkboxes visuais (não interativos).
 *
 * Parte da FASE 2 da jornada do usuário: PREPARAÇÃO
 * Pergunta: "O que preciso trazer?"
 *
 * @example
 * <EventRequirementsSection
 *   requirements="Água (mínimo 1L), Protetor solar, Chuteira, Roupa confortável"
 * />
 */
export const EventRequirementsSection: React.FC<EventRequirementsSectionProps> = ({
  requirements,
  testID = 'event-requirements-section',
}) => {
  // Parse requirements string (split por \n ou vírgula)
  const requirementsList = useMemo(() => {
    if (!requirements || requirements.trim() === '') {
      return [];
    }

    // Tenta split por quebra de linha primeiro
    let items = requirements.split('\n').filter((item) => item.trim() !== '');

    // Se não tem quebras de linha, tenta vírgula
    if (items.length <= 1) {
      items = requirements.split(',').filter((item) => item.trim() !== '');
    }

    // Trim cada item
    return items.map((item) => item.trim());
  }, [requirements]);

  // Se não há requirements, não renderiza nada
  if (requirementsList.length === 0) {
    return null;
  }

  return (
    <View style={styles.container} testID={testID}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="bag-handle-outline" size={20} color={ArenaColors.neutral.light} />
        <Text variant="titleSecondary">O que trazer</Text>
      </View>

      {/* Lista de requisitos */}
      <View style={styles.listContainer}>
        {requirementsList.map((item, index) => (
          <View
            key={index}
            style={styles.requirementItem}
            accessible={true}
            accessibilityRole="text"
            accessibilityLabel={item}
          >
            {/* Checkbox visual (não interativo) */}
            <View style={styles.checkbox}>
              <Ionicons
                name="square-outline"
                size={16}
                color={ArenaColors.neutral.medium}
              />
            </View>

            {/* Texto do requisito */}
            <Text variant="bodyPrimary" style={styles.requirementText}>
              {item}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};
