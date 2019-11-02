import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { TextInput } from 'exoflex';

function TextInputExample() {
  return (
    <ScrollView contentContainerStyle={styles.root}>
      <TextInput
        label="Input Label (Default)"
        placeholder="Hint Text"
        containerStyle={{ marginVertical: 10 }}
      />
      <TextInput
        placeholder="Type here..."
        containerStyle={{ marginVertical: 10 }}
      />
      <TextInput
        label="Input Label (Disabled)"
        value="Input Text"
        disabled={true}
        containerStyle={{ marginVertical: 10 }}
      />
      <TextInput
        label="Input Label (Focus)"
        value="Input Text"
        containerStyle={{ marginVertical: 10 }}
      />
      <TextInput
        label="Input Label (Error)"
        value="Input Text"
        errorMessage="Something Went Wrong"
        containerStyle={{ marginVertical: 10 }}
      />
    </ScrollView>
  );
}

TextInputExample.title = 'TextInput';

let styles = StyleSheet.create({
  root: {
    padding: 16,
    backgroundColor: '#eeeeee',
  },
});

export default TextInputExample;
