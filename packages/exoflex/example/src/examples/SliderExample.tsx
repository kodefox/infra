import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Slider, Text } from 'exoflex';

function SliderExample() {
  return (
    <ScrollView contentContainerStyle={styles.root}>
      <Text>Slider</Text>
      <Slider values={[7]} />
      <Text>Range slider</Text>
      <Slider values={[3, 9]} />
    </ScrollView>
  );
}

SliderExample.title = 'Slider';

let styles = StyleSheet.create({
  root: {
    padding: 16,
    backgroundColor: '#eeeeee',
    alignItems: 'center',
  },
});

export default SliderExample;
