import React, { useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from '@/components/ui/text';
import { SkillLevelModal } from '@/components/ui/skillLevelModal';
import { ErrorBoundary } from '@/components/error-boundary';
import { SportsSelection } from './components/SportsSelection';
import { OnboardingFooter } from './components/OnboardingFooter';
import { OnboardingHeader } from './components/OnboardingHeader';
import { useOnboardingSportsScreen } from './useOnboardingSportsScreen';
import { OnboardingSportsScreenProps } from './typesOnboardingSportsScreen';
import { styles } from './stylesOnboardingSportsScreen';

export const OnboardingSportsScreen: React.FC<OnboardingSportsScreenProps> = ({
  navigation,
}) => {
  const {
    selectedSports,
    modalVisible,
    currentSport,
    currentLevel,
    currentIsPrimary,
    primarySportId,
    filteredSports,
    searchQuery,
    isLoading,
    error,
    handleSelectSport,
    handleSelectLevel,
    handleTogglePrimary,
    handleCloseModal,
    handleFinish,
    handleSkip,
    handleRemoveSport,
    handleSearchChange,
  } = useOnboardingSportsScreen();

  const canFinish = selectedSports.length > 0;

  const handleBack = useCallback(() => {
    navigation.navigate('MainTabs');
  }, [navigation]);

  return (
    <ErrorBoundary>
      <View style={styles.container}>
        <OnboardingHeader onBack={handleBack} />

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
            availableSports={filteredSports}
            selectedSports={selectedSports}
            onSelectSport={handleSelectSport}
            onRemoveSport={handleRemoveSport}
            primarySportId={primarySportId}
            isLoading={isLoading}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
          />
        </ScrollView>

        <SkillLevelModal
          visible={modalVisible}
          sportName={currentSport?.name || ''}
          sportIcon={currentSport?.icon || 'ball'}
          currentLevel={currentLevel}
          isPrimary={currentIsPrimary}
          onSelectLevel={handleSelectLevel}
          onTogglePrimary={handleTogglePrimary}
          onRemoveSport={
            currentSport ? () => handleRemoveSport(currentSport.id) : undefined
          }
          onClose={handleCloseModal}
        />

        <OnboardingFooter
          canFinish={canFinish}
          isLoading={isLoading}
          onSkip={handleSkip}
          onFinish={handleFinish}
        />
      </View>
    </ErrorBoundary>
  );
};
