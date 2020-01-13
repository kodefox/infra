import React from 'react';
import { Menu as PaperMenu } from 'react-native-paper';
import Text from './Text';

type MenuProps = OmitPaperTheme<typeof PaperMenu>;

function Menu(props: MenuProps) {
  return <PaperMenu {...props} />;
}

type MenuItemProps = OmitPaperTheme<typeof PaperMenu.Item> & {
  textPreset?: string;
};

export function MenuItem(props: MenuItemProps) {
  let { title, textPreset, ...otherProps } = props;
  return (
    <PaperMenu.Item
      title={
        typeof title === 'string' ? (
          <Text preset={textPreset}>{title}</Text>
        ) : (
          title
        )
      }
      {...otherProps}
    />
  );
}

Menu.Item = MenuItem;
export default Menu;
