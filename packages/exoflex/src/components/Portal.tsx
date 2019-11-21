import React from 'react';
import { Portal as PaperPortal } from 'react-native-paper';

type Props = OmitPaperTheme<typeof PaperPortal>;

export default function Portal(props: Props) {
  return <PaperPortal {...props} />;
}
