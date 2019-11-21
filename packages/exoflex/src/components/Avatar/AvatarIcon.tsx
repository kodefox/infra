import React from 'react';
import { Avatar as PaperAvatar } from 'react-native-paper';

type AvatarIconProps = Readonly<OmitPaperTheme<typeof PaperAvatar.Icon>>;

export default function AvatarIcon(props: AvatarIconProps) {
  return <PaperAvatar.Icon {...props} />;
}
