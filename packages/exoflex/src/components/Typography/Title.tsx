import React from 'react';
import { StyleSheet } from 'react-native';

import Text, { TextProps } from '../Text';

type Props = TextProps;

function Title({ style, ...otherProps }: Props) {
  return (
    <Text
      accessibilityRole="header"
      aria-level="4"
      {...otherProps}
      style={[styles.root, style]}
    />
  );
}

Title.defaultProps = Text.defaultProps;

let styles = StyleSheet.create({
  root: {
    fontSize: 18,
  },
});

export default Title;
