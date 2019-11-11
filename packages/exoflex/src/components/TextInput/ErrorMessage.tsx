import React, { ComponentProps } from 'react';
import { StyleSheet } from 'react-native';

import Label from '../Label';

type Props = ComponentProps<typeof Label>;

function ErrorMessage({ style, ...otherProps }: Props) {
  return (
    <Label numberOfLines={1} {...otherProps} style={[styles.root, style]} />
  );
}

ErrorMessage.defaultProps = Label.defaultProps;

let styles = StyleSheet.create({
  root: {
    color: '#dd0000',
  },
});

export default ErrorMessage;
