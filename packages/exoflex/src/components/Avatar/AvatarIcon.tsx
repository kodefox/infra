import React from 'react';
import { Avatar as PaperAvatar } from 'react-native-paper';

import useTheme from '../../helpers/useTheme';

export type AvatarIconProps = Readonly<OmitPaperTheme<typeof PaperAvatar.Icon>>;

export default function AvatarIcon(props: AvatarIconProps) {
  let { style, ...otherProps } = props;
  const { style: themeStyle } = useTheme();
  return (
    <PaperAvatar.Icon
      style={[themeStyle?.avatarIcon?.style, style]}
      // Probably need another solution that's more robust for testing the Avatar.Icon
      testID="avatarIcon"
      {...otherProps}
    />
  );
}
