import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

import IconButton, { Props as IconButtonProps } from './IconButton';
import Text from './Text';
import useTheme from '../helpers/useTheme';

type ModeProps = 'active' | 'inactive';
type IconSource = IconButtonProps['icon'];

type Props = TouchableOpacityProps & {
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
  ...otherProps
}: Props) {
  let { colors } = useTheme();

  let isActive = mode === 'active';

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={!onPress}
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
        style,
      ]}
      {...otherProps}
    >
      <Text
        style={[
          {
            color: isActive ? colors.surface : colors.primary,
          },
          textStyle,
        ]}
      >
        {children}
      </Text>
      {icon && (
        <IconButton
          icon={icon}
          color={isActive ? colors.surface : colors.primary}
          size={18}
          style={[styles.icon, iconStyle]}
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
