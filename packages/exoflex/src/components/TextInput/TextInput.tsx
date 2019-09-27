import React, { useState, useCallback, forwardRef, Ref } from 'react';
import {
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInput as NativeTextInput,
} from 'react-native';

import Text from '../Text';
import TextInputOutlined from './TextInputOutlined';
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

  let _onFocus = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      if (disabled || !editable) {
        return;
      }

      setIsFocused(true);
      onFocus && onFocus(e);
    },
    [onFocus, disabled, editable],
  );
  let _onBlur = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      if (disabled || !editable) {
        return;
      }

      setIsFocused(false);
      onBlur && onBlur(e);
    },
    [onBlur, disabled, editable],
  );

  let _onChangeText = useCallback(
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
      onFocus={_onFocus}
      onBlur={_onBlur}
      onChangeText={_onChangeText}
      isFocused={isFocused}
    />
  ) : (
    <Text>Flat mode is not yet supported.</Text>
  );
}

export default forwardRef(TextInput);
