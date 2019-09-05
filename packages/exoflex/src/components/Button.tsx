import React from 'react';
import { StyleSheet, StyleProp, TextStyle } from 'react-native';
import { Button as PaperButton, ButtonProps } from 'react-native-paper';
import Text from './Text';

import { useTheme } from './Provider';

type ButtonPresets = {
  primary: 'contained';
  secondary: 'outlined';
  invisible: 'text';
};

type Props = Omit<ButtonProps, 'theme' | 'mode'> & {
  preset: keyof ButtonPresets;
  labelStyle?: StyleProp<TextStyle>;
};

const PRESETS: ButtonPresets = {
  primary: 'contained',
  secondary: 'outlined',
  invisible: 'text',
};

export default function Button(props: Props) {
  let {
    preset,
    children,
    uppercase,
    contentStyle,
    style,
    labelStyle,
    color,
    disabled,
    onPress,
    ...buttonProps
  } = props;
  let { colors } = useTheme();
  let mode = PRESETS[preset];

  return (
    <PaperButton
      mode={mode}
      uppercase={uppercase}
      contentStyle={[styles.contentWrapper, contentStyle]}
      style={[
        preset === 'secondary' && {
          borderWidth: 2,
          borderColor: colors.primary,
        },
        disabled && { opacity: 0.4 },
        style,
      ]}
      onPress={!disabled ? onPress : undefined}
      {...buttonProps}
    >
      {typeof children === 'string' ? (
        <Text weight="500" style={labelStyle}>
          {uppercase ? children.toUpperCase() : children}
        </Text>
      ) : (
        children
      )}
    </PaperButton>
  );
}

Button.defaultProps = {
  preset: 'primary',
  uppercase: true,
};

const styles = StyleSheet.create({
  contentWrapper: {
    padding: 16,
    minWidth: 158,
  },
});
