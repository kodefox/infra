import React, { Ref, forwardRef, useCallback } from 'react';
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

  let getColor = useCallback(
    (target: 'border' | 'label') => {
      if (isError) {
        return colors.error;
      }
      if (isFocused) {
        return colors.accent;
      }
      return target === 'label' ? colors.placeholder : colors.border;
    },
    [isError, isFocused, disabled],
  );

  return (
    <View
      style={[
        localStyles.root,
        {
          borderColor: getColor('border'),
          justifyContent: !!label ? 'space-between' : 'flex-end',
        },
        !!label && { height: 60 },
        containerStyle,
      ]}
    >
      {!!label && (
        <Label style={[{ color: getColor('label') }, labelStyle]}>
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
