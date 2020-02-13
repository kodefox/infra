import {
  TextInputProps as BaseTextInputProps,
  StyleProp,
  ViewStyle,
  TextStyle,
  TextInput,
} from 'react-native';
import { Ref } from 'react';

type ModeProps = 'flat' | 'outlined';

export type TextInputProps = BaseTextInputProps & {
  /**
   * When provided, will use the error styling for the text input
   * and display the error message below the text input.
   */
  errorMessage?: string;
  /**
   * Label for the text input
   */
  label?: string;
  /**
   * When set to true, will disable all interaction with the text input
   * Defaults to 'false'.
   */
  disabled?: boolean;
  /**
   * Determine how the text input is displayed.
   * Defaults to 'outlined'.
   */
  mode?: ModeProps;
  /**
   * Determine whether the text content is uppercase or not.
   * Defaults to 'false'.
   */
  uppercase?: boolean;
  /**
   * Determine to use error icon or not.
   * Defaults to 'false'.
   */
  useErrorIcon?: boolean;
  /**
   * Additional style passed to the container of the TextInput
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Additional style passed to the label
   */
  labelStyle?: StyleProp<TextStyle>;
  /**
   * Additional style passed to the label
   */
  errorMessageStyle?: StyleProp<TextStyle>;
};

export type ChildTextInputProps = Omit<TextInputProps, 'mode'> & {
  ref?: Ref<TextInput>;
  isFocused: boolean;
};
