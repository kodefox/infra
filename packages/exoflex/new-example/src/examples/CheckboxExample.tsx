import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Checkbox } from 'exoflex';

function CheckboxExample() {
  let [checked, setChecked] = useState(false);

  return (
    <View style={styles.root}>
      <Checkbox
        label="Agree"
        checked={checked}
        onPress={() => setChecked((v) => !v)}
      />
      <Checkbox label="Disabled Checkbox" checked={checked} disabled />
    </View>
  );
}

CheckboxExample.title = 'Checkbox';

let styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 16,
    backgroundColor: '#eeeeee',
  },
});

export default CheckboxExample;
