import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/button';
import { SportsLoading } from '@/components/ui/sportsLoading';
import { EventActionButtonState } from '@/screens/eventDetailsScreen/typesEventDetailsScreen';
import { styles } from './stylesEventActionButton';

interface EventActionButtonProps {
  state: EventActionButtonState;
}

export const EventActionButton: React.FC<EventActionButtonProps> = ({
  state,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 8 }]}>
      <Button
        variant={state.variant}
        size="md"
        fullWidth
        disabled={state.disabled}
        onPress={state.onPress}
        testID="event-action-button"
      >
        {state.loading ? <SportsLoading size="xs" /> : state.label}
      </Button>
    </View>
  );
};
