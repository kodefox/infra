import React, { forwardRef, Ref } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import ErrorMessage from './ErrorMessage';
import ErrorIcon from './ErrorIcon';
import { Label } from '../Typography';
import useTheme from '../../helpers/useTheme';
import { ChildTextInputProps } from './types';

import styles from './styles';

export type Props = ChildTextInputProps;

function TextInputOutlined(
  {
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
  }: Props,
  ref: Ref<TextInput>,
) {
  let { colors, roundness } = useTheme();

  let isError = !!errorMessage;

  return (
    <>
      <View
        style={[
          localStyles.root,
          {
            borderRadius: roundness,
            borderColor: disabled
              ? colors.disabled
              : isError
              ? colors.error
              : isFocused
              ? colors.accent
              : colors.border,
            backgroundColor: disabled ? colors.disabled : colors.surface,
            justifyContent: !!label ? 'space-between' : 'center',
          },
          containerStyle,
        ]}
      >
        {!!label && (
          <Label style={[{ color: colors.placeholder }, labelStyle]}>
            {label}
          </Label>
        )}
        <TextInput
          ref={ref}
          editable={!disabled && editable}
          underlineColorAndroid="transparent"
          placeholderTextColor={colors.placeholder}
          style={[
            {
              color: disabled ? colors.placeholder : colors.text,
            },
            style,
          ]}
          {...otherProps}
        />
        {isError && <ErrorIcon color={colors.error} />}
      </View>
      {isError && (
        <ErrorMessage style={[styles.errorMessage, errorMessageStyle]}>
          {errorMessage}
        </ErrorMessage>
      )}
    </>
  );
}

let localStyles = StyleSheet.create({
  root: {
    borderWidth: 1,
    height: 60,
    padding: 12,
    paddingVertical: 10,
  },
});

export default forwardRef(TextInputOutlined);
