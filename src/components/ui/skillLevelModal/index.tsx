import React, { useCallback, useState, useEffect } from 'react';
import { View, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '../text';
import { Button } from '../button';
import { Checkbox } from '../checkbox';
import { SkillLevel } from '@/types/sport';
import { ArenaColors } from '@/constants';
import { SkillLevelModalProps, SkillLevelOption } from './typesSkillLevelModal';
import { styles } from './stylesSkillLevelModal';

const SKILL_LEVELS: SkillLevelOption[] = [
  {
    level: SkillLevel.BEGINNER,
    label: 'Iniciante',
    shortLabel: 'I',
    description: 'Começando a jogar ou jogo ocasionalmente',
    iconName: 'progress-empty',
  },
  {
    level: SkillLevel.INTERMEDIATE,
    label: 'Intermediário',
    shortLabel: 'M',
    description: 'Jogo regularmente e conheço bem as regras',
    iconName: 'progress-one',
  },
  {
    level: SkillLevel.ADVANCED,
    label: 'Avançado',
    shortLabel: 'A',
    description: 'Jogo frequentemente com bom nível técnico',
    iconName: 'progress-two',
  },
  {
    level: SkillLevel.PROFESSIONAL,
    label: 'Expert',
    shortLabel: 'E',
    description: 'Nível profissional ou competitivo',
    iconName: 'progress-full',
  },
];

export const SkillLevelModal: React.FC<SkillLevelModalProps> = ({
  visible,
  sportName,
  currentLevel,
  isPrimary = false,
  onSelectLevel,
  onTogglePrimary,
  onClose,
  testID = 'skill-level-modal',
}) => {
  const [tempIsPrimary, setTempIsPrimary] = useState(isPrimary);

  useEffect(() => {
    setTempIsPrimary(isPrimary);
  }, [isPrimary, visible]);

  const handleSelectLevel = useCallback(
    (level: SkillLevel) => {
      onSelectLevel(level);
      if (onTogglePrimary) {
        onTogglePrimary(tempIsPrimary);
      }
      onClose();
    },
    [onSelectLevel, onTogglePrimary, tempIsPrimary, onClose]
  );

  const handleTogglePrimary = useCallback(() => {
    setTempIsPrimary(prev => !prev);
  }, []);

  const handleConfirm = useCallback(() => {
    // Only allow confirm if a level has been selected
    if (!currentLevel) {
      onClose();
      return;
    }

    // Call onSelectLevel with current level
    onSelectLevel(currentLevel);

    // Update isPrimary state if changed
    if (onTogglePrimary) {
      onTogglePrimary(tempIsPrimary);
    }

    onClose();
  }, [currentLevel, onSelectLevel, onTogglePrimary, tempIsPrimary, onClose]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      testID={testID}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity activeOpacity={1} onPress={e => e.stopPropagation()}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text variant="titlePrimary" style={styles.modalTitle}>
                Nível de Habilidade
              </Text>
              <Text variant="bodySecondary" style={styles.modalTitle}>
                {sportName}
              </Text>
            </View>

            <ScrollView
              style={styles.levelsList}
              showsVerticalScrollIndicator={false}
            >
              {SKILL_LEVELS.map(option => {
                const isSelected = option.level === currentLevel;
                return (
                  <TouchableOpacity
                    key={option.level}
                    style={[
                      styles.levelOption,
                      isSelected && styles.levelOptionSelected,
                    ]}
                    onPress={() => handleSelectLevel(option.level)}
                    activeOpacity={0.7}
                    testID={`${testID}-option-${option.level.toLowerCase()}`}
                  >
                    <View style={styles.levelIcon}>
                      <Entypo
                        name={option.iconName}
                        size={24}
                        color={
                          isSelected
                            ? ArenaColors.brand.primary
                            : ArenaColors.neutral.light
                        }
                      />
                    </View>

                    <View style={styles.levelContent}>
                      <View style={styles.levelHeader}>
                        <Text
                          variant={
                            isSelected ? 'labelPrimary' : 'labelSecondary'
                          }
                        >
                          {option.label}
                        </Text>
                      </View>
                      <Text variant="captionSecondary">
                        {option.description}
                      </Text>
                    </View>

                    {isSelected && (
                      <View style={styles.checkIcon}>
                        <Ionicons
                          name="checkmark-circle"
                          size={24}
                          color={ArenaColors.brand.primary}
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {onTogglePrimary && (
              <View style={styles.primarySection}>
                <Checkbox
                  checked={tempIsPrimary}
                  onPress={handleTogglePrimary}
                  label="Esporte Favorito"
                  testID={`${testID}-primary-checkbox`}
                />
                <Text variant="captionSecondary">
                  Será destacado no seu perfil
                </Text>
              </View>
            )}

            {onTogglePrimary && (
              <View style={styles.buttonContainer}>
                <Button
                  variant="primary"
                  onPress={handleConfirm}
                  size="lg"
                  testID={`${testID}-confirm-button`}
                >
                  Confirmar
                </Button>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export type { SkillLevelModalProps } from './typesSkillLevelModal';
export { SKILL_LEVELS };
