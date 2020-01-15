import React, { Ref, forwardRef } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';

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

export function TextInputFlat(props: Props, ref: Ref<TextInput>) {
  let {
    errorMessage,
    label,
    disabled,
    editable,
    isFocused,
    multiline = false,
    uppercase,
    value,
    numberOfLines,
    style,
    containerStyle,
    labelStyle,
    errorMessageStyle,
    ...otherProps
  } = props;

  let { colors } = useTheme();

  let isError = !!errorMessage;
  let hasLabel = !!label;

  let getColor = (target: 'border' | 'label') => {
    if (isError) {
      return colors.error;
    }
    if (isFocused) {
      return colors.accent;
    }
    return target === 'label' ? colors.placeholder : colors.border;
  };

  let multilineStyle = {
    minHeight: hasLabel ? DEFAULT_HEIGHT : 0,
    height: 'auto',
  } as StyleProp<ViewStyle>;

  return (
    <>
      <View
        style={[
          localStyles.root,
          {
            borderColor: getColor('border'),
            justifyContent: hasLabel ? 'space-between' : 'flex-end',
          },
          hasLabel && { height: DEFAULT_HEIGHT },
          multiline && multilineStyle,
          containerStyle,
        ]}
      >
        {hasLabel && (
          <Label style={[{ color: getColor('label') }, labelStyle]}>
            {label}
          </Label>
        )}
        <TextInput
          ref={ref}
          multiline={multiline}
          value={uppercase ? value?.toUpperCase() : value}
          autoCapitalize={uppercase ? 'characters' : 'sentences'}
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
        <ErrorMessage
          style={[
            styles.errorMessage,
            { paddingHorizontal: 0 },
            errorMessageStyle,
          ]}
        >
          {errorMessage}
        </ErrorMessage>
      )}
    </>
  );
}

export default forwardRef(TextInputFlat);

let localStyles = StyleSheet.create({
  root: {
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
});
