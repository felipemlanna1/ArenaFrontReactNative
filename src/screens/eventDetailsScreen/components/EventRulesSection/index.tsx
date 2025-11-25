import React, { useMemo } from 'react';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { ArenaColors } from '@/constants';
import { styles } from './stylesEventRulesSection';
import type { EventRulesSectionProps } from './typesEventRulesSection';

/**
 * Componente EventRulesSection
 *
 * Exibe lista de regras do evento com bullets visuais.
 *
 * Parte da FASE 2 da jornada do usuário: PREPARAÇÃO
 * Pergunta: "O que preciso saber?"
 *
 * @example
 * <EventRulesSection
 *   rules="Proibido fumar. Respeitar os demais participantes. Chegar 15 minutos antes."
 * />
 */
export const EventRulesSection: React.FC<EventRulesSectionProps> = ({
  rules,
  testID = 'event-rules-section',
}) => {
  // Parse rules string (split por \n ou ponto final)
  const rulesList = useMemo(() => {
    if (!rules || rules.trim() === '') {
      return [];
    }

    // Tenta split por quebra de linha primeiro
    let items = rules.split('\n').filter((item) => item.trim() !== '');

    // Se não tem quebras de linha, tenta ponto final
    if (items.length <= 1) {
      items = rules
        .split('.')
        .filter((item) => item.trim() !== '')
        .map((item) => item.trim() + (item.trim().endsWith('.') ? '' : '.'));
    }

    // Trim cada item e remove pontos duplicados
    return items.map((item) => {
      const trimmed = item.trim();
      // Se já termina com ponto, não adiciona outro
      return trimmed.endsWith('.') ? trimmed : trimmed + '.';
    });
  }, [rules]);

  // Se não há rules, não renderiza nada
  if (rulesList.length === 0) {
    return null;
  }

  return (
    <View style={styles.container} testID={testID}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="document-text-outline" size={20} color={ArenaColors.neutral.light} />
        <Text variant="titleSecondary">Regras do Evento</Text>
      </View>

      {/* Lista de regras */}
      <View style={styles.listContainer}>
        {rulesList.map((item, index) => (
          <View
            key={index}
            style={styles.ruleItem}
            accessible={true}
            accessibilityRole="text"
            accessibilityLabel={item}
          >
            {/* Bullet visual */}
            <View style={styles.bullet} />

            {/* Texto da regra */}
            <Text variant="bodyPrimary" style={styles.ruleText}>
              {item}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};
