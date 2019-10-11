import React, { ReactNode } from 'react';
import { ViewProps, View, StyleSheet } from 'react-native';

type Props = ViewProps & {
  children?: ReactNode;
};

function CardContent({ style, ...otherProps }: Props) {
  return <View {...otherProps} style={[styles.root, style]} />;
}

let styles = StyleSheet.create({
  root: {
    padding: 12,
  },
});

export default CardContent;
