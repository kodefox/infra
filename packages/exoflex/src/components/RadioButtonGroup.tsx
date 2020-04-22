import React, { createContext, ReactNode } from 'react';
import { AccessibilityProps, View } from 'react-native';

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

type Props = AccessibilityProps & {
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
  let {
    value,
    onValueChange,
    children,
    accessibilityLabel,
    accessibilityRole,
    ...otherProps
  } = props;

  return (
    <RadioButtonContext.Provider
      value={{
        value,
        onValueChange,
      }}
    >
      <View
        {...otherProps}
        accessibilityLabel={accessibilityLabel || 'Radio Group'}
        accessibilityRole={accessibilityRole || 'radiogroup'}
      >
        {children}
      </View>
    </RadioButtonContext.Provider>
  );
}

RadioButtonGroup.defaultProps = {
  ...DefaultRadioButtonGroupContextValue,
};
