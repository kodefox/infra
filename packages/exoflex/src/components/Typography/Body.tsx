import React from 'react';
import { StyleSheet } from 'react-native';

import Text, { Props as TextProps } from '../Text';

type Props = TextProps;

function Body({ style, ...otherProps }: Props) {
  return <Text {...otherProps} style={[styles.root, style]} />;
}

Body.defaultProps = Text.defaultProps;

let styles = StyleSheet.create({
  root: {
    fontSize: 14,
  },
});

export default Body;
