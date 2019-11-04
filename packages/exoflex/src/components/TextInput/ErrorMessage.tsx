import React, { ComponentProps } from 'react';
import { StyleSheet } from 'react-native';

import { SecondaryBody } from '../Typography';

type Props = ComponentProps<SecondaryBody>;

function ErrorMessage({ style, ...otherProps }: Props) {
  return (
    <SecondaryBody
      numberOfLines={1}
      {...otherProps}
      style={[styles.root, style]}
    />
  );
}

let styles = StyleSheet.create({
  root: {
    color: '#dd0000',
  },
});

export default ErrorMessage;
