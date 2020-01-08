import { ComponentProps } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';

export type ButtonPresets = {
  primary: 'contained';
  secondary: 'outlined';
  invisible: 'text';
};

export type PaperButtonProps = ComponentProps<typeof PaperButton>;

export type ButtonProps = Omit<PaperButtonProps, 'theme' | 'mode'> & {
  preset: keyof ButtonPresets;
  textPreset?: string;
  useRipple?: boolean;
  labelStyle?: StyleProp<TextStyle>;
};
