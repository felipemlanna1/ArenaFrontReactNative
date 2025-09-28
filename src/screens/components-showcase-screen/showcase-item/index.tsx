import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/text';
import { ShowcaseItemProps } from '../typesComponentsShowcaseScreen';
import { styles } from './stylesShowcaseItem';

export const ShowcaseItem: React.FC<ShowcaseItemProps> = ({ label, description, children }) => {
  return (
    <View style={styles.showcaseItem}>
      <View style={styles.showcaseHeader}>
        <Text variant="bodyPrimary">{label}</Text>
        {description && (
          <Text variant="captionSecondary">{description}</Text>
        )}
      </View>
      <View style={styles.showcaseContent}>
        {children}
      </View>
    </View>
  );
};