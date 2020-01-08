import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button } from 'exoflex';

function ButtonExample() {
  return (
    <ScrollView contentContainerStyle={styles.root}>
      <View>
        <Button
          preset="primary"
          onPress={() => {}}
          style={{ marginVertical: 10 }}
        >
          Primary button
        </Button>
        <Button
          preset="secondary"
          onPress={() => {}}
          style={{ marginVertical: 10 }}
        >
          Secondary button
        </Button>
        <Button
          preset="invisible"
          onPress={() => {}}
          style={{ marginVertical: 10 }}
        >
          Invisible button
        </Button>
        <Button
          disabled
          preset="primary"
          onPress={() => {}}
          style={{ marginVertical: 10 }}
        >
          Disabled Primary button
        </Button>
        <Button
          disabled
          preset="secondary"
          onPress={() => {}}
          style={{ marginVertical: 10 }}
        >
          Disabled Secondary button
        </Button>
        <Button
          disabled
          preset="invisible"
          onPress={() => {}}
          style={{ marginVertical: 10 }}
        >
          Disabled Invisible button
        </Button>
        <Button icon="home" onPress={() => {}} style={{ marginVertical: 10 }}>
          With Icon
        </Button>
      </View>
      <View>
        <Button
          useRipple
          preset="primary"
          onPress={() => {}}
          style={{ marginVertical: 10 }}
        >
          Primary button (ripple)
        </Button>
        <Button
          useRipple
          preset="secondary"
          onPress={() => {}}
          style={{ marginVertical: 10 }}
        >
          Secondary button (ripple)
        </Button>
        <Button
          useRipple
          preset="invisible"
          onPress={() => {}}
          style={{ marginVertical: 10 }}
        >
          Invisible button (ripple)
        </Button>
        <Button
          useRipple
          disabled
          preset="primary"
          onPress={() => {}}
          style={{ marginVertical: 10 }}
        >
          Disabled Primary button (ripple)
        </Button>
        <Button
          useRipple
          disabled
          preset="secondary"
          onPress={() => {}}
          style={{ marginVertical: 10 }}
        >
          Disabled Secondary button (ripple)
        </Button>
        <Button
          useRipple
          disabled
          preset="invisible"
          onPress={() => {}}
          style={{ marginVertical: 10 }}
        >
          Disabled Invisible button (ripple)
        </Button>
        <Button
          useRipple
          icon="home"
          onPress={() => {}}
          style={{ marginVertical: 10 }}
        >
          With Icon (ripple)
        </Button>
      </View>
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
