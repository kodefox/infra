import React, { forwardRef, Ref } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

import ErrorMessage from './ErrorMessage';
import { Label } from '../Typography';
import useTheme from '../../helpers/useTheme';
import { ChildTextInputProps } from './types';

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
    <View
      style={[
        styles.root,
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

function ErrorIcon(props: { color: string }) {
  return (
    <IconButton icon="error-outline" style={styles.errorIcon} {...props} />
  );
}

let styles = StyleSheet.create({
  root: {
    borderWidth: 1,
    height: 60,
    padding: 12,
    paddingVertical: 10,
  },
  errorIcon: {
    position: 'absolute',
    alignSelf: 'center',
    right: 4,
    top: 10,
    margin: 0,
  },
  errorMessage: {
    position: 'absolute',
    bottom: -18,
  },
  label: {
    // TODO: This color should use colors.text with 0.6 opacity.
    color: '#757575',
  },
});

export default forwardRef(TextInputOutlined);
