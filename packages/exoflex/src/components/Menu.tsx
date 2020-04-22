import React from 'react';
import { Menu as PaperMenu } from 'react-native-paper';
import Text from './Text';
import useTheme from '../helpers/useTheme';
import { AccessibilityProps, View } from 'react-native';

import { IS_MOBILE } from '../constants/platforms';

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

export type MenuItemProps = OmitPaperTheme<typeof PaperMenu.Item> &
  AccessibilityProps & {
    textPreset?: string;
  };

export function MenuItem(props: MenuItemProps) {
  const { style: themeStyle } = useTheme();
  let {
    title,
    textPreset,
    style,
    icon,
    disabled,
    onPress,
    accessibilityLabel,
    accessibilityRole,
    accessibilityState,
    ...otherAccessibilityProps
  } = props;

  // NOTE: Use `button` for web as RNW doesn't support `menuitem` yet
  // https://github.com/necolas/react-native-web/blob/master/packages/react-native-web/src/modules/AccessibilityUtil/propsToAriaRole.js
  let defaultAccessibilityRole = (IS_MOBILE ? 'menuitem' : 'button') as
    | 'menuitem'
    | 'button';

  return (
    <View
      {...otherAccessibilityProps}
      accessibilityLabel={accessibilityLabel || 'Menu Item'}
      accessibilityRole={accessibilityRole || defaultAccessibilityRole}
      accessibilityState={accessibilityState || { disabled }}
    >
      <PaperMenu.Item
        disabled={disabled}
        title={
          typeof title === 'string' ? (
            <Text preset={textPreset}>{title}</Text>
          ) : (
            title
          )
        }
        icon={icon}
        onPress={onPress}
        style={[themeStyle?.menuItem?.style, style]}
      />
    </View>
  );
}

Menu.Item = MenuItem;
export default Menu;
