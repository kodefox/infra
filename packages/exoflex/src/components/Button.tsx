import React from 'react';
import { StyleSheet } from 'react-native';
import { Button as PaperButton, ButtonProps } from 'react-native-paper';
import Text from './Text';

import { useTheme } from './Provider';

type ButtonPresets = {
  primary: 'contained';
  secondary: 'outlined';
  invisible: 'text';
};

// TODO: Enable icon?
type Props = Omit<ButtonProps, 'theme' | 'mode' | 'icon'> & {
  preset: 'primary' | 'secondary' | 'invisible';
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
        style,
      ]}
      {...buttonProps}
    >
      {typeof children === 'string' ? (
        <Text weight="500" style={{ fontSize: 14 }}>
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
