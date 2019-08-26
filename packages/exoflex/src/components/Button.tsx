import React, { useMemo } from 'react';
import {
  Button as PaperButton,
  ButtonProps,
  DefaultTheme, // TODO: Change this to refer DefaultTheme from our DefaultTheme
} from 'react-native-paper';
import deepmerge from 'deepmerge';

type ButtonPresets = {
  primary: 'contained';
  secondary: 'outlined';
  invisible: 'text';
};

type Props = ButtonProps & {
  preset: 'primary' | 'secondary' | 'invisible';
};

const PRIMARY_COLOR = '#0099dd';
const PRESETS: ButtonPresets = {
  primary: 'contained',
  secondary: 'outlined',
  invisible: 'text',
};

export default function Button(props: Props) {
  let { preset, theme, ...buttonProps } = props;
  let mode = PRESETS[preset];

  let combinedTheme = useMemo(() => deepmerge(DefaultTheme, theme || {}), [
    theme,
  ]);

  return (
    <PaperButton
      mode={mode}
      color={PRIMARY_COLOR}
      theme={combinedTheme}
      {...buttonProps}
    />
  );
}
