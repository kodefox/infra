import React from 'react';
import { IconButton as PaperIconButton } from 'react-native-paper';

import useTheme from '../helpers/useTheme';

export type IconButtonProps = OmitPaperTheme<typeof PaperIconButton>;

export default function IconButton(props: IconButtonProps) {
  const { style: themeStyle } = useTheme();
  let { style, ...otherProps } = props;
  return (
    <PaperIconButton
      {...otherProps}
      style={[themeStyle?.iconButton?.style, style]}
    />
  );
}
