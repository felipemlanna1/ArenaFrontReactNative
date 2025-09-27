import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '@/components/Text';
import { CodeExampleProps } from './typesCodeExample';
import { styles } from './stylesCodeExample';

export const CodeExample: React.FC<CodeExampleProps> = ({
  code,
  language = 'tsx',
  onCopy,
}) => {
  const handleCopyPress = () => {
    if (onCopy) {
      onCopy(code);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="captionSecondary" style={styles.languageLabel}>
          {language}
        </Text>
        {onCopy && (
          <TouchableOpacity onPress={handleCopyPress} style={styles.copyButton}>
            <Text variant="captionSecondary">Copiar</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.codeContainer}>
        <Text variant="captionSecondary" style={styles.codeText}>
          {code}
        </Text>
      </View>
    </View>
  );
};