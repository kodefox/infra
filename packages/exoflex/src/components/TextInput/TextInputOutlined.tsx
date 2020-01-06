import React, { forwardRef, Ref } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import ErrorMessage from './ErrorMessage';
import ErrorIcon from './ErrorIcon';
import { Label } from '../Typography';
import useTheme from '../../helpers/useTheme';
import { ChildTextInputProps } from './types';

import styles, {
  DEFAULT_HEIGHT,
  TEXTAREA_NUMBER_OF_LINES,
  TEXTAREA_STYLE,
} from './styles';

import { IS_WEB } from '../../constants/platforms';

export type Props = ChildTextInputProps;

function TextInputOutlined(
  {
    errorMessage,
    label,
    disabled,
    editable,
    isFocused,
    multiline = false,
    numberOfLines,
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
  let hasLabel = !!label;

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
            justifyContent: hasLabel ? 'space-between' : 'center',
          },
          multiline && localStyles.multiline,
          containerStyle,
        ]}
      >
        {hasLabel && (
          <Label style={[{ color: colors.placeholder }, labelStyle]}>
            {label}
          </Label>
        )}
        <TextInput
          ref={ref}
          multiline={multiline}
          numberOfLines={
            numberOfLines ??
            (multiline && IS_WEB ? TEXTAREA_NUMBER_OF_LINES : 1)
          }
          editable={!disabled && editable}
          underlineColorAndroid="transparent"
          placeholderTextColor={colors.placeholder}
          style={[
            { color: disabled ? colors.placeholder : colors.text },
            multiline && IS_WEB && TEXTAREA_STYLE,
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
    height: DEFAULT_HEIGHT,
    padding: 12,
    paddingVertical: 10,
  },
  multiline: {
    minHeight: DEFAULT_HEIGHT,
    height: 'auto',
  },
});

export default forwardRef(TextInputOutlined);
