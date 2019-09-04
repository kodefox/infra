import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import color from 'color';

import { useTheme } from '../Provider';
import Label from '../Label';
import { ChildTextInputProps } from './types';

export type Props = ChildTextInputProps;

function TextInputOutlined({
  label,
  disabled,
  editable,
  isFocused,
  style,
  ...otheProps
}: Props) {
  let { colors, roundness } = useTheme();

  return (
    <View
      style={[
        styles.root,
        {
          borderRadius: roundness,
          borderColor: disabled
            ? colors.disabled
            : isFocused
            ? colors.accent
            : colors.border,
          backgroundColor: disabled ? colors.disabled : colors.surface,
        },
      ]}
    >
      <Label>{label}</Label>
      <TextInput
        editable={!disabled && editable}
        underlineColorAndroid="transparent"
        placeholderTextColor={color(colors.text)
          .alpha(0.6)
          .rgb()
          .toString()}
        style={[
          {
            color: color(colors.text)
              .alpha(editable ? 1 : 0.6)
              .rgb()
              .toString(),
          },
          style,
        ]}
        {...otheProps}
      />
    </View>
  );
}

let styles = StyleSheet.create({
  root: {
    borderWidth: 1,
    height: 60,
    padding: 12,
    paddingVertical: 10,
    justifyContent: 'space-between',
    // temp
    marginBottom: 20,
  },
});

export default TextInputOutlined;
