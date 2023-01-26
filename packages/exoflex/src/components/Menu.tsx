import React from 'react';
import { Menu as PaperMenu } from 'react-native-paper';
import Text from './Text';
import useTheme from '../helpers/useTheme';
import { AccessibilityProps, View } from 'react-native';

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
    leadingIcon,
    disabled,
    onPress,
    accessibilityRole,
    accessibilityState,
    ...otherAccessibilityProps
  } = props;

  return (
    <View
      {...otherAccessibilityProps}
      accessibilityRole={accessibilityRole || 'menuitem'}
      accessibilityState={{ disabled, ...accessibilityState }}
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
        leadingIcon={leadingIcon}
        onPress={onPress}
        style={[themeStyle?.menuItem?.style, style]}
      />
    </View>
  );
}

Menu.Item = MenuItem;
export default Menu;
