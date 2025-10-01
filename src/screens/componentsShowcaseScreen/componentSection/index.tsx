import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { ComponentSectionProps } from '../typesComponentsShowcaseScreen';
import { styles } from './stylesComponentSection';

export const ComponentSection: React.FC<ComponentSectionProps> = ({
  title,
  description,
  children,
  code,
  onCopyCode,
}) => {
  const handleCopyCode = () => {
    if (code && onCopyCode) {
      onCopyCode(code);
    }
  };

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <Text variant="titlePrimary" style={styles.sectionTitle}>
          {title}
        </Text>
        {description && (
          <Text variant="bodySecondary" style={styles.descriptionText}>
            {description}
          </Text>
        )}
        {code && (
          <View style={styles.copyCodeButton}>
            <Button onPress={handleCopyCode} variant="ghost" size="sm">
              📋 Copiar código
            </Button>
          </View>
        )}
      </View>
      <View style={styles.sectionContent}>{children}</View>
    </View>
  );
};
