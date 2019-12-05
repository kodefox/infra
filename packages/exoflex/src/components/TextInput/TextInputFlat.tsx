import React, { Ref, forwardRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import ErrorMessage from './ErrorMessage';
import ErrorIcon from './ErrorIcon';
import { Label } from '../Typography';
import useTheme from '../../helpers/useTheme';
import { ChildTextInputProps } from './types';

import styles from './styles';

export type Props = ChildTextInputProps;

export function TextInputFlat(props: Props, ref: Ref<TextInput>) {
  let {
    errorMessage,
    label,
    disabled,
    editable,
    isFocused,
    style,
    containerStyle,
    labelStyle,
    errorMessageStyle,
    ...otherProps
  } = props;

  let { colors } = useTheme();

  let isError = !!errorMessage;

  return (
    <View
      style={[
        localStyles.root,
        {
          borderColor: disabled
            ? colors.disabled
            : isError
            ? colors.error
            : isFocused
            ? colors.accent
            : colors.border,
          justifyContent: !!label ? 'space-between' : 'flex-end',
        },
        !!label && { height: 60 },
        containerStyle,
      ]}
    >
      {!!label && <Label style={[styles.label, labelStyle]}>{label}</Label>}
      <TextInput
        ref={ref}
        editable={!disabled && editable}
        underlineColorAndroid="transparent"
        // TODO: This color should use colors.text with 0.6 opacity.
        placeholderTextColor="#757575"
        style={[
          {
            // TODO: This color should use colors.text with 0.6 opacity when disabled.
            color: disabled ? '#757575' : colors.text,
          },
          style,
        ]}
        {...otherProps}
      />
      {isError && (
        <>
          <ErrorIcon color={colors.error} />
          <ErrorMessage style={[styles.errorMessage, errorMessageStyle]}>
            {errorMessage}
          </ErrorMessage>
        </>
      )}
    </View>
  );
}

export default forwardRef(TextInputFlat);

let localStyles = StyleSheet.create({
  root: {
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
});
