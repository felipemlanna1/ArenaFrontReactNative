import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { ArenaColors } from '@/constants';
import { ProfileCompletionBannerProps } from './typesProfileCompletionBanner';
import { styles, CONSTANTS } from './stylesProfileCompletionBanner';

const ANIMATION_DURATION = 300;

export const ProfileCompletionBanner: React.FC<
  ProfileCompletionBannerProps
> = ({ onDismiss, onComplete, testID = 'profile-completion-banner' }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleDismiss = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start(() => {
      onDismiss();
    });
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.card} testID={testID}>
        <View style={styles.contentRow}>
          <View style={styles.iconContainer}>
            <Ionicons
              name="information-circle-outline"
              size={CONSTANTS.ICON_SIZE}
              color={ArenaColors.brand.primary}
            />
          </View>

          <View style={styles.textContainer}>
            <Text variant="bodyPrimary" style={styles.messageText}>
              Termine de preencher os seus dados para ter uma melhor experiência
            </Text>
          </View>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleDismiss}
            testID={`${testID}-close`}
            activeOpacity={0.7}
          >
            <Ionicons
              name="close"
              size={20}
              color={ArenaColors.neutral.light}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            variant="primary"
            size="sm"
            onPress={onComplete}
            testID={`${testID}-button`}
          >
            Completar Perfil
          </Button>
        </View>
      </View>
    </Animated.View>
  );
};
