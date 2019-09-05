import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import color from 'color';

import Label from '../Label';
import useTheme from '../../helpers/useTheme';
import { ChildTextInputProps } from './types';

export type Props = ChildTextInputProps;

function TextInputOutlined({
  error,
  label,
  disabled,
  editable,
  isFocused,
  style,
  ...otherProps
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
            : error
            ? colors.error
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
              .alpha(disabled ? 0.6 : 1)
              .rgb()
              .toString(),
          },
          style,
        ]}
        {...otherProps}
      />
      {error && <ErrorIcon color={colors.error} />}
    </View>
  );
}

function ErrorIcon(props: { color: string }) {
  return (
    <IconButton icon="error-outline" style={styles.errorIcon} {...props} />
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
  errorIcon: {
    position: 'absolute',
    alignSelf: 'center',
    right: 4,
    top: 10,
    margin: 0,
  },
});

export default TextInputOutlined;
