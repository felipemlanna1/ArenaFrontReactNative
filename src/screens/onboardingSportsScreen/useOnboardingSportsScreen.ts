import { useState, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserSports } from '@/hooks/useUserSports';
import { sportsService } from '@/services/sports';
import { SkillLevel } from '@/types/sport';
import { SportSelection, OnboardingStep } from './typesOnboardingSportsScreen';

export const useOnboardingSportsScreen = () => {
  const { updateUserSports, signOut, user } = useAuth();
  const {
    availableSports,
    isLoading: sportsLoading,
    error: sportsError,
  } = useUserSports();

  const [selectedSports, setSelectedSports] = useState<SportSelection[]>([]);
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('selection');
  const [currentSportId, setCurrentSportId] = useState<string | null>(null);
  const [currentLevel, setCurrentLevel] = useState<SkillLevel | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentSport = currentSportId
    ? availableSports.find(s => s.id === currentSportId)
    : null;

  const handleSelectSport = useCallback(
    (sportId: string) => {
      const sport = availableSports.find(s => s.id === sportId);
      if (sport) {
        setCurrentSportId(sportId);
        setCurrentStep('level');
        setCurrentLevel(null);
      }
    },
    [availableSports]
  );

  const handleSelectLevel = useCallback((level: SkillLevel) => {
    setCurrentLevel(level);
  }, []);

  const handleNext = useCallback(() => {
    if (!currentSport || !currentLevel) return;

    const newSelection: SportSelection = {
      sportId: currentSport.id,
      sportName: currentSport.name,
      level: currentLevel,
    };

    setSelectedSports(prev => [...prev, newSelection]);
    setCurrentStep('selection');
    setCurrentSportId(null);
    setCurrentLevel(null);
  }, [currentSport, currentLevel]);

  const handleBack = useCallback(() => {
    setCurrentStep('selection');
    setCurrentLevel(null);
  }, []);

  const handleRemoveSport = useCallback((sportId: string) => {
    setSelectedSports(prev => prev.filter(s => s.sportId !== sportId));
  }, []);

  const handleFinish = useCallback(async () => {
    if (!user?.id || selectedSports.length === 0) return;

    setIsLoading(true);
    setError(null);

    try {
      const apiData = {
        sports: selectedSports.map((s, index) => ({
          sportId: s.sportId,
          skillLevel: s.level,
          isPrimary: index === 0,
          yearsOfExperience: 0,
        })),
      };

      await sportsService.updateUserSports(user.id, apiData);

      const userSports = selectedSports.map((s, index) => ({
        sportId: s.sportId,
        sportName: s.sportName,
        sportIcon: '',
        sportColor: '',
        isPrimary: index === 0,
        skillLevel: s.level,
      }));

      updateUserSports(userSports);
    } catch (err) {
      setError('Erro ao salvar esportes. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedSports, user, updateUserSports]);

  const handleSkip = useCallback(() => {
    updateUserSports([]);
  }, [updateUserSports]);

  const handleExit = useCallback(async () => {
    await signOut();
  }, [signOut]);

  return {
    selectedSports,
    currentStep,
    currentSport,
    currentLevel,
    availableSports,
    isLoading: isLoading || sportsLoading,
    error: error || sportsError,
    handleSelectSport,
    handleSelectLevel,
    handleNext,
    handleBack,
    handleFinish,
    handleSkip,
    handleExit,
    handleRemoveSport,
  };
};
