import React from 'react';
import { StyleSheet } from 'react-native';

import Text, { TextProps } from '../Text';

type Props = TextProps;

function LargeTitle({ style, ...otherProps }: Props) {
  return (
    <Text
      accessibilityRole="header"
      aria-level="3"
      {...otherProps}
      style={[styles.root, style]}
    />
  );
}

LargeTitle.defaultProps = Text.defaultProps;

let styles = StyleSheet.create({
  root: {
    fontSize: 28,
  },
});

export default LargeTitle;
