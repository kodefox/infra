import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
  StyleProp,
  TextStyle,
} from 'react-native';

import Text from './Text';
import useTheme from '../helpers/useTheme';

type ModeProps = 'active' | 'inactive';

type Props = TouchableOpacityProps & {
  mode: ModeProps;
  children?: string;
  textStyle?: StyleProp<TextStyle>;
};

function Chip({
  mode,
  children,
  onPress,
  style,
  textStyle,
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
});

export default Chip;
