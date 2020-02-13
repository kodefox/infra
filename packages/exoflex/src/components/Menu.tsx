import React from 'react';
import { Menu as PaperMenu } from 'react-native-paper';

import Text from './Text';
import useTheme from '../helpers/useTheme';

export type MenuProps = OmitPaperTheme<typeof PaperMenu>;

function Menu(props: MenuProps) {
  const { style: themeStyle } = useTheme();
  let { style, contentStyle, ...otherProps } = props;
  return (
    <PaperMenu
      {...otherProps}
      style={[themeStyle?.menu?.style, style]}
      contentStyle={[themeStyle?.menu?.contentStyle, contentStyle]}
    />
  );
}

export type MenuItemProps = OmitPaperTheme<typeof PaperMenu.Item> & {
  textPreset?: string;
};

export function MenuItem(props: MenuItemProps) {
  const { style: themeStyle } = useTheme();
  let { title, textPreset, style, ...otherProps } = props;
  return (
    <PaperMenu.Item
      title={
        typeof title === 'string' ? (
          <Text preset={textPreset}>{title}</Text>
        ) : (
          title
        )
      }
      style={[themeStyle?.menuItem?.style, style]}
      {...otherProps}
    />
  );
}

Menu.Item = MenuItem;
export default Menu;
