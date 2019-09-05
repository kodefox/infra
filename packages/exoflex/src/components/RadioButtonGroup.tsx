import React, { createContext } from 'react';
import { ReactNode } from 'react';

type RadioButtonContextType = {
  value?: string;
  onValueChange?: (item: string) => void;
};

let DefaultRadioButtonGroupContextValue = {
  value: '',
  onValueChange: undefined,
};

export let RadioButtonContext = createContext<RadioButtonContextType>(
  DefaultRadioButtonGroupContextValue,
);

type Props = {
  value: string;
  onValueChange: (newValue: string) => void;
  children: ReactNode;
};

export default function RadioButtonGroup(props: Props) {
  let { value, onValueChange, children } = props;

  return (
    <RadioButtonContext.Provider
      value={{
        value: value,
        onValueChange: onValueChange,
      }}
    >
      {children}
    </RadioButtonContext.Provider>
  );
}

RadioButtonGroup.defaultProps = {
  ...DefaultRadioButtonGroupContextValue,
};
