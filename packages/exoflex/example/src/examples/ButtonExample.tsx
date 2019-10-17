import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button } from 'exoflex';

function ButtonExample() {
  return (
    <ScrollView contentContainerStyle={styles.root}>
      <Button
        preset="primary"
        onPress={() => alert('Primary Button pressed')}
        style={{ marginVertical: 10 }}
      >
        Primary button
      </Button>
      <Button
        preset="secondary"
        onPress={() => alert('Secondary Button pressed')}
        style={{ marginVertical: 10 }}
      >
        Secondary button
      </Button>
      <Button
        preset="invisible"
        onPress={() => alert('Invisible Button pressed')}
        style={{ marginVertical: 10 }}
      >
        Invisible button
      </Button>
      <Button
        disabled
        preset="primary"
        onPress={() => alert('Primary Button pressed')}
        style={{ marginVertical: 10 }}
      >
        Disabled Primary button
      </Button>
      <Button
        disabled
        preset="secondary"
        onPress={() => alert('Secondary Button pressed')}
        style={{ marginVertical: 10 }}
      >
        Disabled Secondary button
      </Button>
      <Button
        disabled
        preset="invisible"
        onPress={() => alert('Invisible Button pressed')}
        style={{ marginVertical: 10 }}
      >
        Disabled Invisible button
      </Button>
      <Button
        icon="home"
        onPress={() => alert('Button with Icon pressed')}
        style={{ marginVertical: 10 }}
      >
        With Icon
      </Button>
    </ScrollView>
  );
}

ButtonExample.title = 'Button';

let styles = StyleSheet.create({
  root: {
    padding: 16,
    backgroundColor: '#eeeeee',
  },
});

export default ButtonExample;
