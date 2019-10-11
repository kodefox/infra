import React from 'react';
import {
  IconButton as PaperIconButton,
  IconButtonProps,
} from 'react-native-paper';

type Props = Omit<IconButtonProps, 'theme'>;

export default function IconButton(props: Props) {
  return <PaperIconButton {...props} />;
}
