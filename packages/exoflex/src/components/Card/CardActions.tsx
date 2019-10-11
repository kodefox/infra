import React, { ReactNode } from 'react';
import { ViewProps, View, StyleSheet } from 'react-native';

type Props = ViewProps & {
  children?: ReactNode;
};

function CardActions({ style, ...otherProps }: Props) {
  return <View {...otherProps} style={[styles.root, style]} />;
}

CardActions.displayName = 'Card.Actions';

let styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 12,
  },
});

export default CardActions;
