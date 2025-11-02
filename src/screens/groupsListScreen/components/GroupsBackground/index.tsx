import React from 'react';
import { ImageBackground, StatusBar } from 'react-native';
import { styles } from './stylesGroupsBackground';
import { GroupsBackgroundProps } from './typesGroupsBackground';
import { useGroupsBackground } from './useGroupsBackground';

export const GroupsBackground: React.FC<GroupsBackgroundProps> = React.memo(
  ({ children }) => {
    const { statusBarColor, backgroundImage } = useGroupsBackground();

    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor={statusBarColor} />
        <ImageBackground
          source={backgroundImage}
          style={styles.background}
          resizeMode="cover"
          imageStyle={styles.backgroundImage}
          testID="groups-background"
        >
          {children}
        </ImageBackground>
      </>
    );
  }
);
