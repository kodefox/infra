import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { RadioButton } from 'exoflex';

function RadioButtonExample() {
  let [radioButtonValue, setRadioButtonValue] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.root}>
      <RadioButton
        checked={radioButtonValue}
        label="Default Radio Button"
        onPress={(newValue) => {
          setRadioButtonValue(newValue);
        }}
      />
      <RadioButton
        checked={radioButtonValue}
        label="Disabled Radio Button"
        disabled={true}
      />
    </ScrollView>
  );
}

RadioButtonExample.title = 'RadioButton';

let styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default RadioButtonExample;
