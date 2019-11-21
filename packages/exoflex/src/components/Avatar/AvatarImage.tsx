import React from 'react';
import { Avatar as PaperAvatar } from 'react-native-paper';

type AvatarImageProps = Readonly<OmitPaperTheme<typeof PaperAvatar.Image>>;

export default function AvatarImage(props: AvatarImageProps) {
  return <PaperAvatar.Image {...props} />;
}
