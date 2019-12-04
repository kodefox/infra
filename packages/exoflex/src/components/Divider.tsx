import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import color from 'color';
import { BLACK, WHITE } from '../constants/colors';
import useTheme from '../helpers/useTheme';

type Props = {
  mode?: 'horizontal' | 'vertical';
  style?: StyleProp<ViewStyle>;
  inset?: number;
};

export default function Divider(props: Props) {
  let { dark: isDarkTheme } = useTheme();
  let { mode = 'horizontal', inset, style } = props;
  let dividerStyle: StyleProp<ViewStyle> = isDarkTheme
    ? styles.dark
    : styles.light;

  if (mode === 'horizontal') {
    dividerStyle = { ...dividerStyle, height: StyleSheet.hairlineWidth };
  } else {
    dividerStyle = { ...dividerStyle, width: StyleSheet.hairlineWidth };
  }
  return <View style={[dividerStyle, { marginLeft: inset }, style]} />;
}

const styles = StyleSheet.create({
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
