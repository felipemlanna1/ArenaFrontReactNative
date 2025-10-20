import React from 'react';
import { View } from 'react-native';
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
  return (
    <View style={styles.container}>
      <Button
        variant={state.variant}
        size="lg"
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
