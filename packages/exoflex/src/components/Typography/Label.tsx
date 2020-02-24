import React from 'react';
import { StyleSheet } from 'react-native';

import Text, { TextProps } from '../Text';

type Props = TextProps;

function Label({ style, ...otherProps }: Props) {
  return <Text {...otherProps} style={[styles.root, style]} />;
}

Label.defaultProps = Text.defaultProps;

let styles = StyleSheet.create({
  root: {
    fontSize: 12,
  },
});

export default Label;
