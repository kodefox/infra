import React from 'react';
import { StyleSheet } from 'react-native';

import Text, { Props as TextProps } from './Text';

type Props = TextProps;

function Label({ style, ...otherProps }: Props) {
  return (
    <Text
      {...otherProps}
      style={[
        styles.root,
        {
          // TODO: This color should use colors.text with 0.6 opacity.
          color: '#757575',
        },
        style,
      ]}
    />
  );
}

Label.defaultProps = Text.defaultProps;

let styles = StyleSheet.create({
  root: {
    fontSize: 12,
  },
});

export default Label;
