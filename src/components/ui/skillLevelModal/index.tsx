import React, { useCallback, useState, useEffect } from 'react';
import { View, Modal, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '../text';
import { Button } from '../button';
import { Switch } from '../switch';
import { OptimizedImage } from '../optimizedImage';
import { SkillLevel } from '@/types/sport';
import { ArenaColors } from '@/constants';
import { getSportIcon } from '@/config/sportIcons';
import { SkillLevelModalProps, SkillLevelOption } from './typesSkillLevelModal';
import { styles } from './stylesSkillLevelModal';

const SKILL_LEVELS: SkillLevelOption[] = [
  { level: SkillLevel.BEGINNER, label: 'Iniciante', filledDots: 1 },
  { level: SkillLevel.INTERMEDIATE, label: 'Intermediário', filledDots: 2 },
  { level: SkillLevel.ADVANCED, label: 'Avançado', filledDots: 3 },
  { level: SkillLevel.PROFESSIONAL, label: 'Profissional', filledDots: 4 },
];

interface LevelDotsProps {
  filled: number;
  isSelected: boolean;
}

const LevelDots: React.FC<LevelDotsProps> = ({ filled, isSelected }) => (
  <View style={styles.dotsContainer}>
    {[0, 1, 2, 3].map(index => (
      <View
        key={index}
        style={[
          styles.dot,
          index < filled &&
            (isSelected ? styles.dotFilledSelected : styles.dotFilled),
        ]}
      />
    ))}
  </View>
);

export const SkillLevelModal: React.FC<SkillLevelModalProps> = ({
  visible,
  sportName,
  sportIcon = 'ball',
  currentLevel,
  isPrimary = false,
  onSelectLevel,
  onTogglePrimary,
  onRemoveSport,
  onClose,
  testID = 'skill-level-modal',
}) => {
  const [tempIsPrimary, setTempIsPrimary] = useState(isPrimary);
  const [tempLevel, setTempLevel] = useState<SkillLevel | null>(currentLevel);
  const iconSource = getSportIcon(sportIcon);

  useEffect(() => {
    setTempIsPrimary(isPrimary);
    setTempLevel(currentLevel);
  }, [isPrimary, currentLevel, visible]);

  const handleSelectLevel = useCallback((level: SkillLevel) => {
    setTempLevel(level);
  }, []);

  const handleTogglePrimary = useCallback((value: boolean) => {
    setTempIsPrimary(value);
  }, []);

  const handleConfirm = useCallback(() => {
    if (tempLevel) {
      onSelectLevel(tempLevel, tempIsPrimary);
    }
    if (onTogglePrimary) {
      onTogglePrimary(tempIsPrimary);
    }
    onClose();
  }, [tempLevel, onSelectLevel, onTogglePrimary, tempIsPrimary, onClose]);

  const handleRemove = useCallback(() => {
    if (onRemoveSport) {
      onRemoveSport();
    }
    onClose();
  }, [onRemoveSport, onClose]);

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
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              testID={`${testID}-close-button`}
            >
              <Ionicons
                name="close"
                size={24}
                color={ArenaColors.neutral.light}
              />
            </TouchableOpacity>

            <View style={styles.sportIconContainer}>
              <OptimizedImage
                source={iconSource}
                style={styles.sportIcon}
                contentFit="contain"
                priority="high"
                showLoading={false}
              />
            </View>

            <Text variant="titlePrimary" style={styles.sportName}>
              {sportName}
            </Text>

            <Text variant="bodySecondary" style={styles.questionText}>
              Qual seu nível?
            </Text>

            <ScrollView
              style={styles.levelsList}
              showsVerticalScrollIndicator={false}
            >
              {SKILL_LEVELS.map(option => {
                const isSelected = option.level === tempLevel;
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
                    <Text variant={isSelected ? 'bodyBold' : 'bodyPrimary'}>
                      {option.label}
                    </Text>
                    <LevelDots
                      filled={option.filledDots}
                      isSelected={isSelected}
                    />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {onTogglePrimary && (
              <View style={styles.primarySection}>
                <View style={styles.primaryRow}>
                  <Ionicons
                    name="star"
                    size={20}
                    color={ArenaColors.semantic.warning}
                  />
                  <Text variant="bodyPrimary" style={styles.primaryLabel}>
                    Esporte principal
                  </Text>
                  <Switch
                    value={tempIsPrimary}
                    onValueChange={handleTogglePrimary}
                    variant="brand"
                    testID={`${testID}-primary-switch`}
                  />
                </View>
              </View>
            )}

            <View style={styles.buttonContainer}>
              <Button
                variant="primary"
                onPress={handleConfirm}
                size="lg"
                disabled={!tempLevel}
                fullWidth
                testID={`${testID}-confirm-button`}
              >
                CONFIRMAR
              </Button>
            </View>

            {onRemoveSport && (
              <TouchableOpacity
                style={styles.removeLink}
                onPress={handleRemove}
                testID={`${testID}-remove-button`}
              >
                <Text variant="bodyPrimary" style={styles.removeLinkText}>
                  Remover
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export type { SkillLevelModalProps } from './typesSkillLevelModal';
export { SKILL_LEVELS };
