import React from 'react';
import { StyleSheet } from 'react-native';

import Text, { TextProps } from '../Text';

type Props = TextProps;

function Subtitle({ style, ...otherProps }: Props) {
  return (
    <Text
      accessibilityRole="header"
      aria-level="5"
      {...otherProps}
      style={[styles.root, style]}
    />
  );
}

Subtitle.defaultProps = Text.defaultProps;

let styles = StyleSheet.create({
  root: {
    fontSize: 16,
  },
});

export default Subtitle;
