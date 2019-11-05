import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ProgressBar, Text, Button } from 'exoflex';

function ProgressBarExample() {
  let [progress, setProgress] = useState(0.4);

  return (
    <ScrollView contentContainerStyle={styles.root}>
      <Text>Progress bar</Text>
      <ProgressBar
        progress={progress}
        style={{ marginBottom: 16, marginTop: 8 }}
      />
      <Text>Custom progress bar</Text>
      <ProgressBar
        progress={progress}
        color="tomato"
        style={{ height: 16, marginBottom: 16, marginTop: 8 }}
      />
      <Text>Indeterminate progress bar</Text>
      <ProgressBar
        indeterminate
        progress={progress}
        style={{ marginBottom: 16, marginTop: 8 }}
      />
      <Button onPress={() => setProgress(Math.random())}>
        RANDOMIZE PROGRESS
      </Button>
    </ScrollView>
  );
}

ProgressBarExample.title = 'ProgressBar';

let styles = StyleSheet.create({
  root: {
    padding: 16,
    backgroundColor: '#eeeeee',
  },
});

export default ProgressBarExample;
