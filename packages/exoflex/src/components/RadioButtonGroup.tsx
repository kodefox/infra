import React, { createContext, ReactNode } from 'react';

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
  /**
   * Value of the selected radio button
   */
  value: string;
  /**
   * Callback function to be called when radio button is pressed
   */
  onValueChange: (newValue: string) => void;
  /**
   * Any react node, preferable RadioButton component(s)
   */
  children: ReactNode;
};

export default function RadioButtonGroup(props: Props) {
  let { value, onValueChange, children } = props;

  return (
    <RadioButtonContext.Provider
      value={{
        value,
        onValueChange,
      }}
    >
      {children}
    </RadioButtonContext.Provider>
  );
}

RadioButtonGroup.defaultProps = {
  ...DefaultRadioButtonGroupContextValue,
};
