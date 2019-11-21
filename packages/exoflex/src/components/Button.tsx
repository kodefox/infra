import React, { ComponentProps } from 'react';
import { StyleSheet, StyleProp, TextStyle } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import Text from './Text';

import useTheme from './../helpers/useTheme';

type ButtonPresets = {
  primary: 'contained';
  secondary: 'outlined';
  invisible: 'text';
};

type PaperButtonProps = ComponentProps<typeof PaperButton>;

type Props = Omit<PaperButtonProps, 'theme' | 'mode'> & {
  preset: keyof ButtonPresets;
  textPreset?: string;
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
    textPreset,
    uppercase,
    contentStyle,
    style,
    labelStyle,
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
        <Text preset={textPreset} weight="500" style={labelStyle}>
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
    height: 48,
    minWidth: 158,
  },
});
