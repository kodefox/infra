import React, { useState, useCallback } from 'react';
import { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';

import Text from '../Text';
import TextInputOutlined from './TextInputOutlined';
import { TextInputProps } from './types';

function TextInput(props: TextInputProps) {
  let { mode, onFocus, onBlur, onChangeText, ...otherProps } = props;
  let [isFocused, setIsFocused] = useState(false);

  let _onFocus = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      if (props.disabled || !props.editable) {
        return;
      }

      setIsFocused(true);
      onFocus && onFocus(e);
    },
    [onFocus],
  );
  let _onBlur = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      if (props.disabled || !props.editable) {
        return;
      }

      setIsFocused(false);
      onBlur && onBlur(e);
    },
    [onBlur],
  );

  let _onChangeText = useCallback(
    (text: string) => {
      if (props.disabled || !props.editable) {
        return;
      }

      onChangeText && onChangeText(text);
    },
    [onChangeText],
  );

  return mode === 'outlined' ? (
    <TextInputOutlined
      {...otherProps}
      onFocus={_onFocus}
      onBlur={_onBlur}
      onChangeText={_onChangeText}
      isFocused={isFocused}
    />
  ) : (
    <Text>Flat mode is not yet supported.</Text>
  );
}

TextInput.defaultProps = {
  autoCorrect: false,
  disabled: false,
  editable: true,
  mode: 'outlined',
};

export default TextInput;
