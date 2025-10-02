import React from 'react';
import { View, ScrollView } from 'react-native';
import { Symbol } from '@/components/ui/symbol';
import { Text } from '@/components/ui/text';
import { ErrorBoundary } from '@/components/error-boundary';
import { SportsSelection } from './components/SportsSelection';
import { LevelSelection } from './components/LevelSelection';
import { OnboardingFooter } from './components/OnboardingFooter';
import { useOnboardingSportsScreen } from './useOnboardingSportsScreen';
import { OnboardingSportsScreenProps } from './typesOnboardingSportsScreen';
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
    handleRemoveSport,
  } = useOnboardingSportsScreen();

  const canFinish = selectedSports.length > 0 && currentStep === 'selection';
  const canGoNext = currentLevel !== null && currentStep === 'level';

  return (
    <ErrorBoundary>
      <View style={styles.container}>
        <View style={styles.topSymbol}>
          <Symbol
            size="md"
            variant="variant1"
            testID="onboarding-arena-symbol"
          />
        </View>

        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {error && (
            <View style={styles.errorContainer}>
              <Text variant="bodyError" style={styles.errorText}>
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
    </ErrorBoundary>
  );
};
