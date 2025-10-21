import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { SportsLoading } from '@/components/ui/sportsLoading';
import { ArenaRefreshControl } from '@/components/ui/refreshControl';
import { ArenaColors } from '@/constants';
import { useProfileScreen } from './useProfileScreen';
import { ProfileScreenProps } from './typesProfileScreen';
import { styles } from './stylesProfileScreen';
import { ProfileHeroSection } from './components/ProfileHeroSection';
import { ProfileInfoSection } from './components/ProfileInfoSection';
import { ProfileBioSection } from './components/ProfileBioSection';
import { ProfileStatsSection } from './components/ProfileStatsSection';
import {
  mapUserToDisplayData,
  getInitials,
  formatMemberSince,
} from './utils/profileHelpers';
import { useProfileStats } from './hooks/useProfileStats';

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  route,
  testID = 'profile-screen',
}) => {
  const userId = route?.params?.userId;

  const {
    user,
    isLoading,
    isRefreshing,
    error,
    isOwnProfile,
    refetch,
    handleEditPress,
    handleBackPress,
  } = useProfileScreen({ userId });

  const { stats, isLoading: isLoadingStats } = useProfileStats(userId || '');

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <SportsLoading size="lg" animationSpeed="normal" />
      </View>
    );
  }

  if (error || !user) {
    return (
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
    );
  }

  const displayData = mapUserToDisplayData(user);
  const initials = getInitials(user.firstName, user.lastName);
  const primarySport = displayData.sports.find(s => s.isPrimary) || null;

  return (
    <View style={styles.container} testID={testID}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={handleBackPress}
        testID="back-button"
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color={ArenaColors.neutral.light}
        />
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <ArenaRefreshControl refreshing={isRefreshing} onRefresh={refetch} />
        }
      >
        <View style={styles.contentContainer}>
          <ProfileHeroSection
            avatarUrl={displayData.avatarUrl}
            initials={initials}
            showBackButton={false}
            onBackPress={handleBackPress}
            coverImageUrl={null}
            primarySport={primarySport}
          />

          <ProfileInfoSection
            fullName={displayData.fullName}
            username={displayData.username}
            age={displayData.age}
            gender={displayData.gender}
            sports={displayData.sports}
            isEmailVerified={user.isEmailVerified}
            memberSince={formatMemberSince(user.createdAt)}
          />

          <ProfileBioSection bio={displayData.bio} />

          <ProfileStatsSection stats={stats} isLoading={isLoadingStats} />
        </View>
      </ScrollView>

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
    </View>
  );
};
