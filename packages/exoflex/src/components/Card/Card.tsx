import React, { ReactNode } from 'react';
import { View, ViewProps } from 'react-native';

import CardActions from './CardActions';
import CardContent from './CardContent';
import CardCover from './CardCover';
import CardTitle from './CardTitle';

import useTheme from '../../helpers/useTheme';

type Props = ViewProps & {
  children?: ReactNode;
  rounded?: boolean;
};

function Card({ style, rounded = false, ...otherProps }: Props) {
  let { colors, roundness } = useTheme();

  return (
    <View
      {...otherProps}
      style={[
        {
          flexGrow: 1,
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderRadius: rounded ? roundness : 0,
          borderWidth: 1,
          overflow: 'hidden',
        },
        style,
      ]}
    />
  );
}

Card.Actions = CardActions;
Card.Content = CardContent;
Card.Cover = CardCover;
Card.Title = CardTitle;

export default Card;
