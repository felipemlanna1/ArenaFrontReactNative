import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '@/components/ui/text';
import { ProfileBioSectionProps } from './typesProfileBioSection';
import { styles } from './stylesProfileBioSection';

const MAX_LINES = 3;

export const ProfileBioSection: React.FC<ProfileBioSectionProps> = ({
  bio,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showExpandButton, setShowExpandButton] = useState(false);

  const handleTextLayout = (event: { nativeEvent: { lines: unknown[] } }) => {
    const { lines } = event.nativeEvent;
    if (lines.length > MAX_LINES) {
      setShowExpandButton(true);
    }
  };

  if (!bio) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text variant="titlePrimary" style={styles.titleText}>
          Sobre
        </Text>

        <Text
          variant="bodyPrimary"
          style={styles.bioText}
          numberOfLines={isExpanded ? undefined : MAX_LINES}
          onTextLayout={handleTextLayout}
        >
          {bio}
        </Text>

        {showExpandButton && (
          <TouchableOpacity
            style={styles.showMoreButton}
            onPress={() => setIsExpanded(!isExpanded)}
          >
            <Text variant="bodyAccent">
              {isExpanded ? 'Ver menos' : 'Ver mais'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
