import React from 'react';
import { IconButton as PaperIconButton } from 'react-native-paper';

type Props = OmitPaperTheme<typeof PaperIconButton>;

export default function IconButton(props: Props) {
  return <PaperIconButton {...props} />;
}
