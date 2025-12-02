import React, { useMemo } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { SportsLoading } from '@/components/ui/sportsLoading';
import { AppLayout } from '@/components/AppLayout';
import { ArenaColors } from '@/constants';
import { useTabBarHeight } from '@/hooks/useTabBarHeight';
import { useProfileScreen } from './useProfileScreen';
import { ProfileScreenProps } from './typesProfileScreen';
import { styles } from './stylesProfileScreen';
import { ProfileHeroSection } from './components/ProfileHeroSection';
import { ProfileInfoSection } from './components/ProfileInfoSection';
import { ProfileBioSection } from './components/ProfileBioSection';
import { ProfileReputationSection } from './components/ProfileReputationSection';
import { ProfileStatsSection } from './components/ProfileStatsSection';
import { ProfileGroupsSection } from './components/ProfileGroupsSection';
import { ProfileCompletionBanner } from './components/ProfileCompletionBanner';
import { FriendshipActions } from './components/FriendshipActions';
import { ReportUserModal } from '@/components/reportUserModal';
import {
  mapUserToDisplayData,
  getInitials,
  formatMemberSince,
} from './utils/profileHelpers';
import { useProfileStats } from './hooks/useProfileStats';
import { useProfileCompletionBanner } from './hooks/useProfileCompletionBanner';
import { useProfileCompletion } from './hooks/useProfileCompletion';

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  route,
  testID = 'profile-screen',
}) => {
  const {
    user,
    userId,
    isLoading,
    error,
    isOwnProfile,
    refetch,
    handleEditPress,
    handleBackPress,
    isReportModalOpen,
    handleOpenReportModal,
    handleCloseReportModal,
  } = useProfileScreen({ userId: route?.params?.userId });

  const { stats, isLoading: isLoadingStats } = useProfileStats(userId || '');

  const {
    isIncomplete,
    isDismissed,
    isLoading: isLoadingCompletion,
    handleDismiss,
  } = useProfileCompletionBanner(user, isOwnProfile);

  const { progress: completionProgress } = useProfileCompletion(user);

  const tabBarHeight = useTabBarHeight();

  const scrollContainerStyle = useMemo(
    () => [styles.scrollContainer, { paddingBottom: tabBarHeight }],
    [tabBarHeight]
  );

  const shouldShowCompletionBanner =
    isOwnProfile && isIncomplete && !isDismissed && !isLoadingCompletion;

  if (isLoading) {
    return (
      <AppLayout>
        <View style={styles.loadingContainer}>
          <SportsLoading size="lg" animationSpeed="normal" />
        </View>
      </AppLayout>
    );
  }

  if (error || !user) {
    return (
      <AppLayout>
        <View style={styles.errorContainer}>
          <Text variant="headingPrimary" style={styles.errorText}>
            Erro ao carregar perfil
          </Text>
          <Text variant="bodySecondary" style={styles.errorText}>
            {error?.message || 'Usuário não encontrado'}
          </Text>
          <Button variant="primary" onPress={refetch}>
            Tentar novamente
          </Button>
        </View>
      </AppLayout>
    );
  }

  const displayData = mapUserToDisplayData(user);
  const initials = getInitials(user.firstName, user.lastName);
  const primarySport =
    displayData.sports.find(s => s.isPrimary) || displayData.sports[0] || null;

  return (
    <AppLayout
      showHeader={true}
      headerVariant="mainWithBack"
      headerShowLogo={true}
      headerShowBackButton={true}
      headerOnBackPress={handleBackPress}
      headerRightActions={
        !isOwnProfile && userId
          ? [
              {
                icon: 'flag-outline',
                onPress: handleOpenReportModal,
                testID: 'report-user-button',
              },
            ]
          : undefined
      }
    >
      <SafeAreaView
        style={styles.container}
        edges={['left', 'right']}
        testID={testID}
      >
        <ScrollView contentContainerStyle={scrollContainerStyle}>
          <LinearGradient
            colors={[ArenaColors.neutral.darkest, ArenaColors.neutral.dark]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.backgroundGradient}
          />
          <ProfileHeroSection
            avatarUrl={displayData.avatarUrl}
            initials={initials}
            coverImageUrl={displayData.coverImageUrl}
            primarySport={primarySport}
            completionProgress={isOwnProfile ? completionProgress : 0}
          />

          <View style={styles.contentContainer}>
            <ProfileInfoSection
              fullName={displayData.fullName}
              username={displayData.username}
              age={displayData.age}
              gender={displayData.gender}
              sports={displayData.sports}
              isEmailVerified={user.isEmailVerified}
              memberSince={formatMemberSince(user.createdAt)}
              bannerSlot={
                shouldShowCompletionBanner ? (
                  <ProfileCompletionBanner
                    onDismiss={handleDismiss}
                    onComplete={handleEditPress}
                  />
                ) : undefined
              }
            />

            <ProfileBioSection bio={displayData.bio} />

            <ProfileReputationSection
              userId={userId || user.id}
              isOwnProfile={isOwnProfile}
            />

            <ProfileStatsSection stats={stats} isLoading={isLoadingStats} />

            <ProfileGroupsSection
              userId={userId || ''}
              isOwnProfile={isOwnProfile}
            />
          </View>
        </ScrollView>

        {!isOwnProfile && userId && (
          <View style={styles.friendshipActionsContainer}>
            <FriendshipActions userId={userId} onStatusChange={refetch} />
          </View>
        )}

        {isOwnProfile && (
          <TouchableOpacity
            style={styles.fab}
            onPress={handleEditPress}
            testID="edit-profile-fab"
          >
            <FontAwesome5
              name="user-edit"
              size={24}
              color={ArenaColors.neutral.light}
            />
          </TouchableOpacity>
        )}

        {!isOwnProfile && userId && (
          <ReportUserModal
            userId={userId}
            isOpen={isReportModalOpen}
            onClose={handleCloseReportModal}
            onReportSuccess={refetch}
          />
        )}
      </SafeAreaView>
    </AppLayout>
  );
};
