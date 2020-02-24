import React from 'react';
import { StyleSheet } from 'react-native';

import Text, { TextProps } from '../Text';

type Props = TextProps;

function Heading({ style, ...otherProps }: Props) {
  return (
    <Text
      accessibilityRole="header"
      aria-level="1"
      style={[styles.root, style]}
      {...otherProps}
    />
  );
}

Heading.defaultProps = Text.defaultProps;

let styles = StyleSheet.create({
  root: {
    fontSize: 42,
  },
});

export default Heading;
