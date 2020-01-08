import React from 'react';
import ButtonRipple from './ButtonRipple';
import ButtonOpacity from './ButtonOpacity';

import { ButtonProps } from './types';

export default function Button(props: ButtonProps) {
  let { useRipple = false, ...otherProps } = props;

  if (useRipple) {
    return <ButtonRipple {...otherProps} />;
  }

  return <ButtonOpacity {...otherProps} />;
}

Button.defaultProps = {
  preset: 'primary',
  uppercase: true,
};
