import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/text';
import { ComponentSectionProps } from '../typesComponentsShowcaseScreen';
import { styles } from './stylesComponentSection';

export const ComponentSection: React.FC<ComponentSectionProps> = ({ title, children }) => {
  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <Text variant="titlePrimary" style={styles.sectionTitle}>{title}</Text>
      </View>
      <View style={styles.sectionContent}>
        {children}
      </View>
    </View>
  );
};