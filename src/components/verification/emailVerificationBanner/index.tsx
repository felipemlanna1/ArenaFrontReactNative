import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { ArenaColors } from '@/constants';
import { EmailVerificationBannerProps } from './typesEmailVerificationBanner';
import { styles } from './stylesEmailVerificationBanner';

export const EmailVerificationBanner: React.FC<
  EmailVerificationBannerProps
> = ({ onVerifyPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onVerifyPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Ionicons
          name="mail-outline"
          size={20}
          color={ArenaColors.neutral.light}
        />
      </View>

      <View style={styles.contentContainer}>
        <Text variant="labelPrimary">Email não verificado</Text>
        <Text variant="captionSecondary">
          Verifique seu email para liberar todos os recursos
        </Text>
      </View>

      <View style={styles.chevronContainer}>
        <Ionicons
          name="chevron-forward"
          size={20}
          color={ArenaColors.neutral.medium}
        />
      </View>
    </TouchableOpacity>
  );
};
