import React, { useState, useCallback, forwardRef, Ref } from 'react';
import {
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInput as NativeTextInput,
} from 'react-native';

import TextInputOutlined from './TextInputOutlined';
import TextInputFlat from './TextInputFlat';
import useTheme from '../../helpers/useTheme';
import { TextInputProps } from './types';

function TextInput(props: TextInputProps, ref: Ref<NativeTextInput>) {
  let { uppercase: uppercaseTheme, style: themeStyle } = useTheme();
  let {
    autoCorrect = false,
    disabled = false,
    editable = true,
    mode = 'outlined',
    uppercase = uppercaseTheme.textinput,
    showErrorIcon = true,
    onFocus,
    onBlur,
    onChangeText,
    containerStyle,
    errorMessageStyle,
    labelStyle,
    style,
    ...otherProps
  } = props;

  let [isFocused, setIsFocused] = useState(false);

  let handleFocus = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      if (disabled || !editable) {
        return;
      }

      setIsFocused(true);
      onFocus && onFocus(e);
    },
    [onFocus, disabled, editable],
  );
  let handleBlur = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      if (disabled || !editable) {
        return;
      }

      setIsFocused(false);
      onBlur && onBlur(e);
    },
    [onBlur, disabled, editable],
  );

  let handleChangeText = useCallback(
    (text: string) => {
      if (disabled || !editable) {
        return;
      }

      onChangeText && onChangeText(text);
    },
    [onChangeText, disabled, editable],
  );

  return mode === 'outlined' ? (
    <TextInputOutlined
      {...otherProps}
      containerStyle={[themeStyle?.textInput?.containerStyle, containerStyle]}
      errorMessageStyle={[
        themeStyle?.textInput?.errorMessageStyle,
        errorMessageStyle,
      ]}
      labelStyle={[themeStyle?.textInput?.labelStyle, labelStyle]}
      style={[themeStyle?.textInput?.style, style]}
      ref={ref}
      showErrorIcon={showErrorIcon}
      uppercase={uppercase}
      autoCorrect={autoCorrect}
      disabled={disabled}
      editable={editable}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChangeText={handleChangeText}
      isFocused={isFocused}
    />
  ) : (
    <TextInputFlat
      {...otherProps}
      containerStyle={[themeStyle?.textInput?.containerStyle, containerStyle]}
      errorMessageStyle={[
        themeStyle?.textInput?.errorMessageStyle,
        errorMessageStyle,
      ]}
      labelStyle={[themeStyle?.textInput?.labelStyle, labelStyle]}
      style={[themeStyle?.textInput?.style, style]}
      ref={ref}
      showErrorIcon={showErrorIcon}
      uppercase={uppercase}
      autoCorrect={autoCorrect}
      disabled={disabled}
      editable={editable}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChangeText={handleChangeText}
      isFocused={isFocused}
    />
  );
}

export default forwardRef(TextInput);
