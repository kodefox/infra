import React from 'react';
import { Avatar as PaperAvatar } from 'react-native-paper';

import useTheme from '../../helpers/useTheme';

export type AvatarImageProps = Readonly<
  OmitPaperTheme<typeof PaperAvatar.Image>
>;

export default function AvatarImage(props: AvatarImageProps) {
  let { style, ...otherProps } = props;
  const { style: themeStyle } = useTheme();
  return (
    <PaperAvatar.Image
      style={[themeStyle?.avatarImage?.style, style]}
      {...otherProps}
    />
  );
}
