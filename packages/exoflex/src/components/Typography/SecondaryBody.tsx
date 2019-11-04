import React from 'react';
import { StyleSheet } from 'react-native';

import Text, { Props as TextProps } from '../Text';

type Props = TextProps;

function SecondaryBody({ style, ...otherProps }: Props) {
  return <Text {...otherProps} style={[styles.root, style]} />;
}

SecondaryBody.defaultProps = Text.defaultProps;

let styles = StyleSheet.create({
  root: {
    fontSize: 12,
  },
});

export default SecondaryBody;
