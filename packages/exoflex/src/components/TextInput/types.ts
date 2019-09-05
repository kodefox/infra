import { TextInputProps as BaseTextInputProps } from 'react-native';

type ModeProps = 'flat' | 'outlined';

export type TextInputProps = BaseTextInputProps & {
  /**
   * When provided, will use the error styling for the text input
   * and display the error message below the text input.
   * Defaults to false.
   */
  errorMessage?: string;
  /**
   * Label for the text input
   */
  label: string;
  /**
   * When set to true, will disable all interaction with the text inpput
   * Defaults to 'false'.
   */
  disabled: boolean;
  /**
   * Determine how the text input is displayed.
   * Defaults to 'outlined'.
   */
  mode: ModeProps;
};

export type ChildTextInputProps = Omit<TextInputProps, 'mode'> & {
  isFocused: boolean;
};
