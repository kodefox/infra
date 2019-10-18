import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { RadioButton, Text } from 'exoflex';

function RadioButtonGroupExample() {
  let [radioButtonValue, setRadioButtonValue] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.root}>
      <Text>Gender</Text>
      <RadioButton.Group
        value={radioButtonValue}
        onValueChange={(newValue: string) => setRadioButtonValue(newValue)}
      >
        <RadioButton label="Male" style={styles.verticalMargin} />
        <RadioButton label="Female" style={styles.verticalMargin} />
        <RadioButton label="Prefer not to say" style={styles.verticalMargin} />
      </RadioButton.Group>
    </ScrollView>
  );
}

RadioButtonGroupExample.title = 'RadioButtonGroup';

let styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  verticalMargin: {
    marginVertical: 5,
  },
});

export default RadioButtonGroupExample;
