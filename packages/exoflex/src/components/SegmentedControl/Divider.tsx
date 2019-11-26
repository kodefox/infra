import React from 'react';
import { View, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import useTheme from '../../helpers/useTheme';

// NOTE: This should be a temporary component. change it to Exoflex's Divider when available
type Props = {
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export default function Divider(props: Props) {
  let { colors } = useTheme();
  let { color, style } = props;
  return (
    <View
      style={[
        styles.divider,
        {
          backgroundColor: color || colors.primary,
        },
        style,
      ]}
    />
  );
}

let styles = StyleSheet.create({
  divider: {
    width: 1,
    alignSelf: 'stretch',
  },
});
