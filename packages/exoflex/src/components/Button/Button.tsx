import React from 'react';
import ButtonRipple from './ButtonRipple';
import ButtonOpacity from './ButtonOpacity';

import useTheme from '../../helpers/useTheme';

import { ButtonProps } from './types';

export default function Button(props: ButtonProps) {
  let { uppercase: uppercaseTheme, style: themeStyle } = useTheme();
  let {
    useRipple = false,
    uppercase = uppercaseTheme.button,
    style,
    contentStyle,
    labelStyle,
    ...otherProps
  } = props;

  if (useRipple) {
    return (
      <ButtonRipple
        uppercase={uppercase}
        style={[themeStyle?.button?.style, style]}
        contentStyle={[themeStyle?.button?.contentStyle, contentStyle]}
        labelStyle={[themeStyle?.button?.labelStyle, labelStyle]}
        {...otherProps}
      />
    );
  }

  return (
    <ButtonOpacity
      uppercase={uppercase}
      style={[themeStyle?.button?.style, style]}
      contentStyle={[themeStyle?.button?.contentStyle, contentStyle]}
      labelStyle={[themeStyle?.button?.labelStyle, labelStyle]}
      {...otherProps}
    />
  );
}

Button.defaultProps = {
  preset: 'primary',
};
