import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Text from './Text';
import { DefaultTheme } from '../constants/themes';
import { useTheme } from './Provider';
import Check from './svg/Check';

type Props = {
  /**
   * The text/string for the checkbox
   */
  value: string;
  /**
   * Boolean whether the checkbox is checked or not.
   */
  checked: boolean;
  /**
   * The size of the check icon
   */
  size: number;
  /**
   * The color of the checkbox icon. Default to theme.
   */
  color: string;
  /**
   * Boolean whether the checkbox is disabled or not. If disabled, no press event will be triggered.
   */
  disabled: boolean;
  /**
   * Callback function to be called when checkbox is pressed
   */
  onPress: () => void;
  /**
   * Additional style for the text
   */
  textStyle?: StyleProp<TextStyle>;
  /**
   * Additional style for the checkbox container
   */
  style?: StyleProp<ViewStyle>;
};

const PADDING = 4;

export default function Checkbox(props: Props) {
  let { size, checked, disabled, onPress, value, textStyle, style } = props;
  let { colors } = useTheme();
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.iconContainer,
          {
            width: size,
            height: size,
          },
          checked
            ? { backgroundColor: colors.primary }
            : { borderWidth: 1, borderColor: colors.disabled },
        ]}
      >
        {checked && <Check size={size - PADDING} fill="white" />}
      </View>
      <Text style={[styles.text, textStyle]}>{value}</Text>
    </TouchableOpacity>
  );
}

Checkbox.defaultProps = {
  size: 24,
  checked: false,
  disabled: false,
  onPress: () => {},
  color: DefaultTheme.colors.primary,
  value: '',
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  text: {
    paddingLeft: 10,
  },
});
