import React, { ComponentProps } from 'react';
import { IconButton as PaperIconButton } from 'react-native-paper';

type PaperIconButtonProps = ComponentProps<typeof PaperIconButton>;
type Props = Omit<PaperIconButtonProps, 'theme'>;

export default function IconButton(props: Props) {
  return <PaperIconButton {...props} />;
}
