import React, { useState, useCallback, forwardRef, Ref } from 'react';
import {
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInput as NativeTextInput,
} from 'react-native';

import TextInputOutlined from './TextInputOutlined';
import TextInputFlat from './TextInputFlat';
import { TextInputProps } from './types';

function TextInput(
  {
    autoCorrect = false,
    disabled = false,
    editable = true,
    mode = 'outlined',
    onFocus,
    onBlur,
    onChangeText,
    ...otherProps
  }: TextInputProps,
  ref: Ref<NativeTextInput>,
) {
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
      ref={ref}
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
      ref={ref}
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
