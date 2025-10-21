import React from 'react';
import { View, ScrollView } from 'react-native';
import { Accordion } from '@/components/ui/accordion';
import { ArenaRefreshControl } from '@/components/ui/refreshControl';
import { FriendsScreenProps } from './typesFriendsScreen';
import { useFriendsScreen } from './useFriendsScreen';
import { styles } from './stylesFriendsScreen';
import {
  FriendsSection,
  RequestsSection,
  RecommendationsSection,
} from './components/FriendsSections';

export const FriendsScreen: React.FC<FriendsScreenProps> = ({ navigation }) => {
  const {
    friends,
    incomingRequests,
    recommendations,
    isLoadingFriends,
    isLoadingRequests,
    isLoadingRecommendations,
    refreshing,
    handleRefresh,
    handleRemoveFriend,
    handleAcceptRequest,
    handleRejectRequest,
    handleSendRequest,
    handleNavigateToProfile,
    loadingUserId,
  } = useFriendsScreen(navigation);

  const accordionItems = [
    {
      id: 'friends',
      title: `Meus Amigos (${friends.length})`,
      content: (
        <FriendsSection
          friends={friends}
          isLoading={isLoadingFriends}
          loadingUserId={loadingUserId}
          onNavigateToProfile={handleNavigateToProfile}
          onRemoveFriend={handleRemoveFriend}
        />
      ),
    },
    {
      id: 'requests',
      title: `Solicitações (${incomingRequests.length})`,
      content: (
        <RequestsSection
          requests={incomingRequests}
          isLoading={isLoadingRequests}
          loadingUserId={loadingUserId}
          onAcceptRequest={handleAcceptRequest}
          onRejectRequest={handleRejectRequest}
        />
      ),
    },
    {
      id: 'recommendations',
      title: `Recomendações (${recommendations.length})`,
      content: (
        <RecommendationsSection
          recommendations={recommendations}
          isLoading={isLoadingRecommendations}
          loadingUserId={loadingUserId}
          onNavigateToProfile={handleNavigateToProfile}
          onSendRequest={handleSendRequest}
        />
      ),
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.content}
        refreshControl={
          <ArenaRefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
        testID="friends-screen-scroll"
      >
        <View style={styles.accordionsContainer}>
          <Accordion
            variant="default"
            mode="multiple"
            items={accordionItems}
            testID="friends-accordion"
          />
        </View>
      </ScrollView>
    </View>
  );
};
