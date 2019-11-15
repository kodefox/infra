import React from 'react';
import { StyleSheet } from 'react-native';

import Text, { Props as TextProps } from '../Text';

type Props = TextProps;

function Subheading({ style, ...otherProps }: Props) {
  return (
    <Text
      accessibilityRole="header"
      aria-level="2"
      {...otherProps}
      style={[styles.root, style]}
    />
  );
}

Subheading.defaultProps = Text.defaultProps;

let styles = StyleSheet.create({
  root: {
    fontSize: 36,
  },
});

export default Subheading;
