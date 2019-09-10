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
import useTheme from '../helpers/useTheme';
import Check from './svg/Check';

type Props = {
  /**
   * The text/string for the checkbox
   */
  label: string;
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
  onPress: (isChecked?: boolean) => void;
  /**
   * Additional style for the text
   */
  textStyle?: StyleProp<TextStyle>;
  /**
   * Additional style for the checkbox container
   */
  style?: StyleProp<ViewStyle>;
};

export default function Checkbox(props: Props) {
  let {
    size,
    checked,
    disabled,
    color,
    onPress,
    label,
    textStyle,
    style,
  } = props;
  let { colors, roundness } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={() => onPress(!checked)}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.iconContainer,
          {
            borderRadius: roundness,
            width: size,
            height: size,
          },
          checked
            ? { backgroundColor: color || colors.primary }
            : { borderWidth: 1, borderColor: colors.border },
          disabled && { backgroundColor: colors.disabled },
        ]}
      >
        {checked && <Check size={size} fill="white" />}
      </View>
      <Text style={[styles.text, textStyle]}>{label}</Text>
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
  },
  text: {
    paddingLeft: 10,
  },
});
