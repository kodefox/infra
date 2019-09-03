import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleProp,
  TextStyle,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import Text from './Text';
import { useTheme } from './Provider';

type Props = {
  /**
   * The text/string for the radio button
   */
  value: string;
  /**
   * Boolean whether the radio button is checked or not.
   */
  checked: boolean;
  /**
   * The size of the radio button
   */
  size: number;
  /**
   * The color of the radio button icon. Default to theme.
   */
  color?: string;
  /**
   * Boolean whether the radio button is disabled or not. If disabled, no press event will be triggered.
   */
  disabled: boolean;
  /**
   * Callback function to be called when radio button is pressed
   */
  onPress: (isChecked: boolean) => void;
  /**
   * Additional style for the text
   */
  textStyle?: StyleProp<TextStyle>;
  /**
   * Additional style for the radio button container
   */
  style?: StyleProp<ViewStyle>;
};

export default function RadioButton(props: Props) {
  let {
    value,
    size,
    checked,
    color,
    disabled,
    onPress,
    textStyle,
    style,
  } = props;
  let { colors } = useTheme();
  let innerCircleSize = size / 2;

  return (
    <TouchableOpacity
      onPress={() => onPress(!checked)}
      style={[styles.container, style]}
      activeOpacity={0.7}
      disabled={!onPress}
    >
      <View
        style={[
          styles.icon,
          {
            borderRadius: size / 2,
            width: size,
            height: size,
            borderColor: checked ? color || colors.primary : colors.border,
          },
        ]}
      >
        {checked && (
          <View
            style={{
              width: innerCircleSize,
              height: innerCircleSize,
              borderRadius: innerCircleSize / 2,
              backgroundColor: disabled
                ? color || colors.disabled
                : colors.primary,
            }}
          />
        )}
      </View>
      <Text style={[styles.text, textStyle]}>{value}</Text>
    </TouchableOpacity>
  );
}

RadioButton.defaultProps = {
  value: '',
  checked: false,
  disabled: false,
  size: 24,
  onPress: () => {},
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center' },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  text: { paddingLeft: 10 },
});
