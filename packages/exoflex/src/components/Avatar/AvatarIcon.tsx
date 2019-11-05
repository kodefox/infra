import React, { ComponentProps } from 'react';
import { Avatar as PaperAvatar } from 'react-native-paper';

type PaperAvatarIconProps = ComponentProps<typeof PaperAvatar.Icon>;
type AvatarIconProps = Omit<PaperAvatarIconProps, 'theme'>;

export default function AvatarIcon(props: AvatarIconProps) {
  return <PaperAvatar.Icon {...props} />;
}
