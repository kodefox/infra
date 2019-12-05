import React from 'react';
import { IconButton } from 'react-native-paper';

import styles from './styles';

export default function ErrorIcon(props: { color: string }) {
  return (
    <IconButton icon="error-outline" style={styles.errorIcon} {...props} />
  );
}
