import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Switch, Text, Button } from 'exoflex';

function SwitchExample() {
  let [switchValue, setSwitchValue] = useState(false);
  return (
    <ScrollView contentContainerStyle={styles.root}>
      <View style={{ marginVertical: 10, alignItems: 'center' }}>
        <Text>Default Switch</Text>
        <Switch
          value={switchValue}
          onValueChange={(newValue) => {
            setSwitchValue(newValue);
          }}
        />
      </View>
      <Text>Disabled Switch</Text>
      <Switch
        value={switchValue}
        onValueChange={(newValue) => {
          setSwitchValue(newValue);
        }}
        width={40}
        disabled={true}
      />
    </ScrollView>
  );
}

SwitchExample.title = 'Switch';

let styles = StyleSheet.create({
  root: {
    padding: 16,
    backgroundColor: '#eeeeee',
    alignItems: 'center',
  },
});

export default SwitchExample;
