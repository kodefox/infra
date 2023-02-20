import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

import IconButton, { IconButtonProps } from './IconButton';
import Text from './Text';
import useTheme from '../helpers/useTheme';

type ModeProps = 'active' | 'inactive';
type IconSource = IconButtonProps['icon'];

export type ChipProps = TouchableOpacityProps & {
  mode: ModeProps;
  children?: string;
  textStyle?: StyleProp<TextStyle>;
  icon?: IconSource;
  iconStyle?: StyleProp<ViewStyle>;
};

function Chip({
  mode,
  children,
  onPress,
  style,
  textStyle,
  icon,
  iconStyle,
  accessibilityRole,
  ...otherProps
}: ChipProps) {
  let { colors, style: themeStyle } = useTheme();

  let isActive = mode === 'active';

  return (
    <TouchableOpacity
      accessibilityRole={accessibilityRole || 'button'}
      activeOpacity={0.7}
      disabled={!onPress}
      onPress={onPress}
      style={[
        styles.root,
        isActive
          ? {
              backgroundColor: colors.primary,
            }
          : {
              borderColor: colors.primary,
              borderWidth: 1,
              backgroundColor: colors.surface,
            },
        themeStyle?.chip?.style,
        style,
      ]}
      {...otherProps}
    >
      <Text
        style={[
          {
            color: isActive ? colors.surface : colors.primary,
          },
          themeStyle?.chip?.textStyle,
          textStyle,
        ]}
      >
        {children}
      </Text>
      {icon && (
        <IconButton
          icon={icon}
          iconColor={isActive ? colors.surface : colors.primary}
          size={18}
          style={[styles.icon, themeStyle?.chip?.iconStyle, iconStyle]}
        />
      )}
    </TouchableOpacity>
  );
}

Chip.defaultProps = {
  mode: 'active',
};

let styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 36,
    paddingHorizontal: 16,
    borderRadius: 18,
  },
  icon: {
    margin: 0,
    marginLeft: 8,
    height: 18,
    width: 18,
  },
});

export default Chip;
