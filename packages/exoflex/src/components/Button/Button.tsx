import React from 'react';
import ButtonRipple from './ButtonRipple';
import ButtonOpacity from './ButtonOpacity';

import useTheme from '../../helpers/useTheme';

import { ButtonProps } from './types';

export default function Button(props: ButtonProps) {
  let { uppercase: uppercaseTheme } = useTheme();
  let {
    useRipple = false,
    uppercase = uppercaseTheme.button,
    ...otherProps
  } = props;

  if (useRipple) {
    return <ButtonRipple uppercase={uppercase} {...otherProps} />;
  }

  return <ButtonOpacity uppercase={uppercase} {...otherProps} />;
}

Button.defaultProps = {
  preset: 'primary',
};
