import React from 'react';
import { StyleSheet } from 'react-native';
import color from 'color';

import Text, { Props as TextProps } from './Text';
import { useTheme } from './Provider';

type Props = TextProps;

function Label({ style, ...otherProps }: Props) {
  let { colors } = useTheme();

  return (
    <Text
      {...otherProps}
      style={[
        styles.root,
        {
          color: color(colors.text)
            .alpha(0.6)
            .rgb()
            .toString(),
        },
        style,
      ]}
    />
  );
}

Label.defaultProps = Text.defaultProps;

let styles = StyleSheet.create({
  root: {
    fontSize: 12,
  },
});

export default Label;
