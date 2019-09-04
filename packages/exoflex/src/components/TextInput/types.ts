import { TextInputProps as BaseTextInputProps } from 'react-native';

type ModeProps = 'flat' | 'outlined';

export type TextInputProps = BaseTextInputProps & {
  /**
   * Label for the text input
   */
  label: string;
  /**
   * Disable all interaction with the text inpput
   */
  disabled: boolean;
  /**
   * Determine how the text input is displayed.
   * @default outlined
   */
  mode: ModeProps;
};

export type ChildTextInputProps = Omit<TextInputProps, 'mode'> & {
  isFocused: boolean;
};
