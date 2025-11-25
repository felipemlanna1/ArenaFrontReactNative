import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { Symbol } from '@/components/ui/symbol';
import { ArenaColors } from '@/constants';
import { HeaderAction } from './components/HeaderAction';
import { AppHeaderProps } from './typesAppHeader';
import { styles } from './stylesAppHeader';

export const AppHeader: React.FC<AppHeaderProps> = ({
  variant,
  title,
  showLogo = false,
  showBackButton = false,
  onBackPress,
  rightActions = [],
  rightComponent,
  testID = 'app-header',
}) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  const renderRightSection = () => {
    if (rightComponent) {
      return rightComponent;
    }

    return rightActions.map((action, index) => (
      <HeaderAction
        key={`action-${index}`}
        {...action}
        testID={action.testID || `${testID}-action-${index}`}
      />
    ));
  };

  const renderMain = () => (
    <>
      <View style={styles.leftSection} />
      <View style={styles.centerSection}>
        {showLogo && (
          <Symbol variant="variant1" size="md" testID={`${testID}-logo`} />
        )}
      </View>
      <View style={styles.rightSection}>{renderRightSection()}</View>
    </>
  );

  const renderSecondary = () => (
    <>
      <View style={styles.leftSection}>
        {showBackButton && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackPress}
            testID={`${testID}-back-button`}
            activeOpacity={0.7}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color={ArenaColors.neutral.light}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.centerSectionLeft}>
        {title && (
          <Text variant="titlePrimary" testID={`${testID}-title`}>
            {title}
          </Text>
        )}
      </View>
      <View style={styles.rightSection}>{renderRightSection()}</View>
    </>
  );

  return (
    <View style={styles.container} testID={testID}>
      {variant === 'main' ? renderMain() : renderSecondary()}
    </View>
  );
};
