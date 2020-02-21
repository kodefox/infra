import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { RadioButton } from 'exoflex';

function RadioButtonExample() {
  let [radioButtonValue, setRadioButtonValue] = useState(false);
  let [radioButtonValue2, setRadioButtonValue2] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.root}>
      <RadioButton
        checked={radioButtonValue}
        value="first"
        label="Default Radio Button"
        onPress={(isChecked) => {
          setRadioButtonValue(isChecked);
        }}
      />
      <RadioButton
        checked={radioButtonValue}
        value="second"
        label="Disabled Radio Button"
        disabled={true}
      />
      <RadioButton
        checked={radioButtonValue2 === 'third'}
        value="third"
        label="Default Radio Button"
        onPress={(_isChecked, newValue) => {
          setRadioButtonValue2(newValue);
        }}
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
