import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '@/components/text';
import { styles } from './stylesCodeBlock';
interface CodeBlockProps {
  code: string;
  onCopy?: (code: string) => void;
}
export const CodeBlock: React.FC<CodeBlockProps> = ({ code, onCopy }) => {
  const handleCopyPress = () => {
    onCopy?.(code);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="captionSecondary">Código</Text>
        <TouchableOpacity onPress={handleCopyPress} style={styles.copyButton}>
          <Text variant="captionSecondary" style={styles.copyButtonText}>
            Copiar
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.codeContainer}>
        <Text variant="captionMuted" style={styles.codeText}>
          {code}
        </Text>
      </View>
    </View>
  );
};
