import { StyleSheet } from 'react-native';

import { NamedStyles, Theme } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let create = <T extends NamedStyles<T> | NamedStyles<any>>(
  styles: (T | NamedStyles<T>) | ((theme: Theme) => T),
) => (theme: Theme): T => {
  let styleObj = typeof styles === 'function' ? styles(theme) : styles;
  return StyleSheet.create(styleObj);
};

export default { create };
