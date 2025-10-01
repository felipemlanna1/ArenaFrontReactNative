import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from '@/components/ui/text';
import { SportsSelection } from './components/SportsSelection';
import { LevelSelection } from './components/LevelSelection';
import { OnboardingFooter } from './components/OnboardingFooter';
import { useOnboardingSportsScreen } from './useOnboardingSportsScreen';
import { OnboardingSportsScreenProps } from './typesOnboardingSportsScreen';
import { ArenaColors } from '@/constants';
import { styles } from './stylesOnboardingSportsScreen';

export const OnboardingSportsScreen: React.FC<
  OnboardingSportsScreenProps
> = () => {
  const {
    selectedSports,
    currentStep,
    currentSport,
    currentLevel,
    availableSports,
    isLoading,
    error,
    handleSelectSport,
    handleSelectLevel,
    handleNext,
    handleBack,
    handleFinish,
    handleSkip,
    handleExit,
    handleRemoveSport,
  } = useOnboardingSportsScreen();

  const canFinish = selectedSports.length > 0 && currentStep === 'selection';
  const canGoNext = currentLevel !== null && currentStep === 'level';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text
          variant="headingPrimary"
          style={{ color: ArenaColors.neutral.light }}
        >
          Arena
        </Text>
        <TouchableOpacity onPress={handleExit}>
          <Text
            variant="bodyPrimary"
            style={{ color: ArenaColors.neutral.medium }}
          >
            Sair
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {error && (
          <View style={{ marginBottom: 16 }}>
            <Text variant="bodyError" style={{ textAlign: 'center' }}>
              {error}
            </Text>
          </View>
        )}

        {currentStep === 'selection' ? (
          <SportsSelection
            availableSports={availableSports}
            selectedSports={selectedSports}
            onSelectSport={handleSelectSport}
            onRemoveSport={handleRemoveSport}
            isLoading={isLoading}
          />
        ) : (
          currentSport && (
            <LevelSelection
              sportName={currentSport.name}
              selectedLevel={currentLevel}
              onSelectLevel={handleSelectLevel}
            />
          )
        )}
      </ScrollView>

      <OnboardingFooter
        currentStep={currentStep}
        canFinish={canFinish}
        canGoNext={canGoNext}
        isLoading={isLoading}
        onBack={handleBack}
        onNext={handleNext}
        onSkip={handleSkip}
        onFinish={handleFinish}
      />
    </View>
  );
};
