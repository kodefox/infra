import React, { useContext } from 'react';
import {
  TouchableOpacity,
  View,
  StyleProp,
  TextStyle,
  ViewStyle,
  StyleSheet,
  AccessibilityProps,
} from 'react-native';
import useTheme from '../helpers/useTheme';
import Text from './Text';
import RadioButtonGroup, { RadioButtonContext } from './RadioButtonGroup';
import { IS_MOBILE } from '../constants/platforms';

export type RadioButtonProps = AccessibilityProps & {
  /**
   * The text/string for the radio button
   */
  label: string;
  /**
   * The value of the radio button
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
  onPress: (isChecked: boolean, value: string) => void;
  /**
   * Additional style for the text
   */
  textStyle?: StyleProp<TextStyle>;
  /**
   * Additional style for the radio button container
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Selector for testing purpose (especially e2e test)
   */
  testID?: string;
};

export default function RadioButton(props: RadioButtonProps) {
  let {
    label,
    value,
    size,
    checked,
    color,
    disabled,
    onPress,
    textStyle,
    style,
    testID,
    accessibilityLabel,
    accessibilityRole,
    ...otherProps
  } = props;
  let { colors, style: themeStyle } = useTheme();
  let { value: contextValue, onValueChange: contextOnValueChange } = useContext(
    RadioButtonContext,
  );

  let innerCircleSize = size / 2;

  let isChecked = contextValue === value || checked;

  // NOTE: Use `button` for web as RNW doesn't support it yet
  // https://github.com/necolas/react-native-web/blob/master/packages/react-native-web/src/modules/AccessibilityUtil/propsToAriaRole.js
  let defaultAccessibilityRole = (IS_MOBILE ? 'radio' : 'button') as
    | 'radio'
    | 'button';

  let handlePress = () =>
    contextOnValueChange
      ? contextOnValueChange(value)
      : onPress(!isChecked, value); // NOTE: `onPress` should returns nothing, so this behaviour should be changes in v4

  return (
    <TouchableOpacity
      {...otherProps}
      accessibilityLabel={accessibilityLabel || `Radio Item: ${label}`}
      accessibilityRole={accessibilityRole || defaultAccessibilityRole}
      onPress={handlePress}
      style={[styles.container, style]}
      activeOpacity={0.7}
      disabled={disabled}
      testID={testID}
    >
      <View
        style={[
          styles.icon,
          themeStyle?.radioButton?.style,
          {
            borderRadius: size / 2,
            width: size,
            height: size,
            borderColor: disabled
              ? colors.disabled
              : isChecked
              ? color || colors.primary
              : colors.border,
          },
        ]}
      >
        {isChecked && (
          <View
            style={{
              width: innerCircleSize,
              height: innerCircleSize,
              borderRadius: innerCircleSize / 2,
              backgroundColor: disabled
                ? colors.disabled
                : color || colors.primary,
            }}
          />
        )}
      </View>
      <Text
        style={[styles.text, themeStyle?.radioButton?.textStyle, textStyle]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

RadioButton.Group = RadioButtonGroup;

RadioButton.defaultProps = {
  label: '',
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
