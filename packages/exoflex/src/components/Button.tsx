import React from 'react';
import { Button as PaperButton, ButtonProps } from 'react-native-paper';

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
  let { preset, ...buttonProps } = props;
  let mode = PRESETS[preset];
  return (
    <PaperButton
      mode={mode}
      color={PRIMARY_COLOR}
      theme={{ roundness: 4 }}
      {...buttonProps}
    />
  );
}
