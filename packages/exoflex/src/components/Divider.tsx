import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import color from 'color';

import useTheme from '../helpers/useTheme';
import { BLACK, WHITE } from '../constants/colors';

type Props = {
  mode?: 'horizontal' | 'vertical';
  style?: StyleProp<ViewStyle>;
  inset?: number;
};

export default function Divider(props: Props) {
  let { dark: isDarkTheme } = useTheme();
  let { mode = 'horizontal', inset, style } = props;

  return (
    <View
      style={[
        isDarkTheme ? styles.dark : styles.light,
        mode === 'horizontal' ? styles.horizontal : styles.vertical,
        { marginLeft: inset },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  horizontal: {
    height: StyleSheet.hairlineWidth,
  },
  vertical: {
    width: StyleSheet.hairlineWidth,
  },
  light: {
    backgroundColor: color(BLACK)
      .alpha(0.12)
      .rgb()
      .string(),
  },
  dark: {
    backgroundColor: color(WHITE)
      .alpha(0.12)
      .rgb()
      .string(),
  },
});
