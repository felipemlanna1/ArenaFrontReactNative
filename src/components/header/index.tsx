import React from 'react';
import { View } from 'react-native';
import { Symbol } from '@/components/ui/symbol';
import { HeaderProps } from './typesHeader';
import { styles } from './stylesHeader';

export const Header: React.FC<HeaderProps> = ({ testID = 'header' }) => {
  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.content}>
        <View style={styles.centerSection}>
          <Symbol variant="variant1" size="md" testID={`${testID}-symbol`} />
        </View>
      </View>
    </View>
  );
};
