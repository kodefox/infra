import React from 'react';
import { StyleSheet } from 'react-native';

import Text, { TextProps } from '../Text';

type Props = TextProps;

function Paragraph({ style, ...otherProps }: Props) {
  return <Text {...otherProps} style={[styles.root, style]} />;
}

Paragraph.defaultProps = Text.defaultProps;

let styles = StyleSheet.create({
  root: {
    fontSize: 14,
  },
});

export default Paragraph;
