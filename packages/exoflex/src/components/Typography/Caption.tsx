import React from 'react';
import { StyleSheet } from 'react-native';

import Text, { Props as TextProps } from '../Text';

type Props = TextProps;

function Caption({ style, ...otherProps }: Props) {
  return <Text {...otherProps} style={[styles.root, style]} />;
}

Caption.defaultProps = Text.defaultProps;

let styles = StyleSheet.create({
  root: {
    fontSize: 10,
  },
});

export default Caption;
