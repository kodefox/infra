import React, { ComponentProps } from 'react';
import { Avatar as PaperAvatar } from 'react-native-paper';

type PaperAvatarImageProps = ComponentProps<typeof PaperAvatar.Image>;
type AvatarImageProps = Omit<PaperAvatarImageProps, 'theme'>;

export default function AvatarImage(props: AvatarImageProps) {
  return <PaperAvatar.Image {...props} />;
}
