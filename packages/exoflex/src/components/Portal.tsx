import React from 'react';
import { Portal as PaperPortal, PortalProps } from 'react-native-paper';

type Props = Omit<PortalProps, 'theme'>;

function Portal(props: Props) {
  return <PaperPortal {...props} />;
}

Portal.Host = PaperPortal.Host;

export default Portal;
