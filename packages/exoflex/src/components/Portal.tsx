import React from 'react';
import { Portal as PaperPortal } from 'react-native-paper';

type Props = OmitPaperTheme<typeof PaperPortal>;

export function Portal(props: Props) {
  return <PaperPortal {...props} />;
}

Portal.Host = PaperPortal.Host;

export default Portal;
