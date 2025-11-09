import React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Symbol } from '@/components/ui/symbol';
import { Text } from '@/components/ui/text';
import { SkillLevelModal } from '@/components/ui/skillLevelModal';
import { ErrorBoundary } from '@/components/error-boundary';
import { SkillLevel } from '@/types/sport';
import { SportsSelection } from './components/SportsSelection';
import { OnboardingFooter } from './components/OnboardingFooter';
import { useOnboardingSportsScreen } from './useOnboardingSportsScreen';
import { OnboardingSportsScreenProps } from './typesOnboardingSportsScreen';
import { styles } from './stylesOnboardingSportsScreen';

export const OnboardingSportsScreen: React.FC<
  OnboardingSportsScreenProps
> = () => {
  const {
    selectedSports,
    modalVisible,
    currentSport,
    currentLevel,
    currentIsPrimary,
    primarySportId,
    availableSports,
    isLoading,
    error,
    handleSelectSport,
    handleSelectLevel,
    handleTogglePrimary,
    handleCloseModal,
    handleFinish,
    handleSkip,
    handleRemoveSport,
  } = useOnboardingSportsScreen();

  const canFinish = selectedSports.length > 0;

  return (
    <ErrorBoundary>
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
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

          <SportsSelection
            availableSports={availableSports}
            selectedSports={selectedSports}
            onSelectSport={handleSelectSport}
            onRemoveSport={handleRemoveSport}
            primarySportId={primarySportId}
            isLoading={isLoading}
          />
        </ScrollView>

        <SkillLevelModal
          visible={modalVisible}
          sportName={currentSport?.name || ''}
          currentLevel={currentLevel || SkillLevel.INTERMEDIATE}
          isPrimary={currentIsPrimary}
          onSelectLevel={handleSelectLevel}
          onTogglePrimary={handleTogglePrimary}
          onClose={handleCloseModal}
        />

        <OnboardingFooter
          canFinish={canFinish}
          isLoading={isLoading}
          onSkip={handleSkip}
          onFinish={handleFinish}
        />
      </SafeAreaView>
    </ErrorBoundary>
  );
};
