import React from 'react';
import { Button as PaperButton, ButtonProps } from 'react-native-paper';
import Text from './Text';

// import { useTheme } from './Provider';

type ButtonPresets = {
  primary: 'contained';
  secondary: 'outlined';
  invisible: 'text';
};

// TODO: Enable icon?
type Props = Omit<ButtonProps, 'theme' | 'mode' | 'icon'> & {
  preset: 'primary' | 'secondary' | 'invisible';
};

const PRESETS: ButtonPresets = {
  primary: 'contained',
  secondary: 'outlined',
  invisible: 'text',
};

export default function Button(props: Props) {
  let { preset, children, uppercase, ...buttonProps } = props;
  let mode = PRESETS[preset];

  let renderChildren = children;
  if (typeof children === 'string') {
    renderChildren = (
      <Text weight="500">{uppercase ? children.toUpperCase() : children}</Text>
    );
  }

  // TODO: Use combined/merged theme
  return (
    <PaperButton mode={mode} uppercase={uppercase} {...buttonProps}>
      {renderChildren}
    </PaperButton>
  );
}

Button.defaultProps = {
  preset: 'primary',
  uppercase: true,
};
