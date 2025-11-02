import { useState, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserSports } from '@/hooks/useUserSports';
import { sportsService } from '@/services/sports';
import { SkillLevel } from '@/types/sport';
import { toUserSportData, toApiSportData } from '@/utils/mappers/sportMappers';
import { SportSelection } from './typesOnboardingSportsScreen';

export const useOnboardingSportsScreen = () => {
  const { updateUserSports, signOut, user } = useAuth();
  const {
    availableSports,
    isLoading: sportsLoading,
    error: sportsError,
  } = useUserSports();

  const [selectedSports, setSelectedSports] = useState<SportSelection[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentSportId, setCurrentSportId] = useState<string | null>(null);
  const [currentLevel, setCurrentLevel] = useState<SkillLevel | null>(null);
  const [currentIsPrimary, setCurrentIsPrimary] = useState(false);
  const [primarySportId, setPrimarySportId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentSport = currentSportId
    ? availableSports.find(s => s.id === currentSportId)
    : null;

  const handleSelectSport = useCallback(
    (sportId: string) => {
      const sport = availableSports.find(s => s.id === sportId);
      if (sport) {
        const existingSport = selectedSports.find(s => s.sportId === sportId);
        setCurrentSportId(sportId);
        setCurrentLevel(existingSport?.level || null);
        setCurrentIsPrimary(existingSport?.isPrimary || false);
        setModalVisible(true);
      }
    },
    [availableSports, selectedSports]
  );

  const handleSelectLevel = useCallback(
    (level: SkillLevel, isPrimary?: boolean) => {
      if (!currentSport) return;

      const isPrimarySport = isPrimary ?? currentIsPrimary;

      const newSelection: SportSelection = {
        sportId: currentSport.id,
        sportName: currentSport.name,
        level: level,
        isPrimary: isPrimarySport,
      };

      setSelectedSports(prev => {
        const filtered = prev.filter(s => s.sportId !== currentSport.id);
        const withoutPrimary = filtered.map(s => ({ ...s, isPrimary: false }));
        return isPrimarySport
          ? [...withoutPrimary, newSelection]
          : [...filtered, newSelection];
      });

      if (isPrimarySport) {
        setPrimarySportId(currentSport.id);
      } else if (primarySportId === currentSport.id) {
        setPrimarySportId(null);
      }

      setModalVisible(false);
      setCurrentSportId(null);
      setCurrentLevel(null);
      setCurrentIsPrimary(false);
    },
    [currentSport, currentIsPrimary, primarySportId]
  );

  const handleTogglePrimary = useCallback((isPrimary: boolean) => {
    setCurrentIsPrimary(isPrimary);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalVisible(false);
    setCurrentSportId(null);
    setCurrentLevel(null);
    setCurrentIsPrimary(false);
  }, []);

  const handleRemoveSport = useCallback(
    (sportId: string) => {
      setSelectedSports(prev => prev.filter(s => s.sportId !== sportId));

      if (sportId === primarySportId) {
        setPrimarySportId(null);
      }
    },
    [primarySportId]
  );

  const handleFinish = useCallback(async () => {
    if (!user?.id) {
      setError('Usuário não autenticado. Faça login novamente.');
      return;
    }

    if (selectedSports.length === 0) {
      setError('Selecione pelo menos um esporte para continuar.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const apiData = {
        sports: selectedSports.map(s =>
          toApiSportData({
            sportId: s.sportId,
            skillLevel: s.level,
            isPrimary: s.sportId === primarySportId,
            yearsOfExperience: 0,
          })
        ),
      };

      await sportsService.updateUserSports(user.id, apiData);

      const userSports = selectedSports.map(selection => {
        const sport = availableSports.find(as => as.id === selection.sportId);
        return toUserSportData({
          selection,
          sportIcon: sport?.icon || '',
          sportColor: sport?.color || '',
          isPrimary: selection.sportId === primarySportId,
        });
      });

      updateUserSports(userSports);
    } catch {
      setError('Erro ao salvar esportes. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedSports, primarySportId, user, updateUserSports, availableSports]);

  const handleSkip = useCallback(() => {
    updateUserSports([]);
  }, [updateUserSports]);

  const handleExit = useCallback(async () => {
    await signOut();
  }, [signOut]);

  return {
    selectedSports,
    modalVisible,
    currentSport,
    currentLevel,
    currentIsPrimary,
    primarySportId,
    availableSports,
    isLoading: isLoading || sportsLoading,
    error: error || sportsError,
    handleSelectSport,
    handleSelectLevel,
    handleTogglePrimary,
    handleCloseModal,
    handleFinish,
    handleSkip,
    handleExit,
    handleRemoveSport,
  };
};
