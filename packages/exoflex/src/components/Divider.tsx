import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

import useTheme from '../helpers/useTheme';

export type DividerProps = {
  mode?: 'horizontal' | 'vertical';
  style?: StyleProp<ViewStyle>;
  inset?: number;
};

export default function Divider(props: DividerProps) {
  let { colors, style: themeStyle } = useTheme();
  let { mode = 'horizontal', inset, style } = props;

  return (
    <View
      style={[
        mode === 'horizontal' ? styles.horizontal : styles.vertical,
        { backgroundColor: colors.border, marginLeft: inset },
        themeStyle?.divider?.style,
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
});
