import React from 'react';
import { StyleProp, ViewStyle, View } from 'react-native';
import { IconButton } from 'react-native-paper';

import styles from './styles';

type Props = {
  color: string;
  style?: StyleProp<ViewStyle>;
};

export default function ErrorIcon(props: Props) {
  return (
    <View style={styles.errorIconContainer}>
      <IconButton icon="alert-circle-outline" {...props} />
    </View>
  );
}
