import React from 'react';
import {
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  View,
} from 'react-native';
import { TextInput } from 'exoflex';

function TextInputExample() {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
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
          useErrorIcon={false}
          label="Input Label (Error)"
          value="Input Text"
          errorMessage="Something Went Wrong"
          containerStyle={{ marginVertical: 10 }}
        />
        <TextInput
          label="Input Label (Error)"
          value="Input Text"
          errorMessage="Something Went Wrong"
          containerStyle={{ marginVertical: 10 }}
        />
        <View
          style={{ backgroundColor: 'white', marginVertical: 30, padding: 15 }}
        >
          <TextInput
            label="Input Label (Default)"
            mode="flat"
            placeholder="Hint Text"
            containerStyle={{ marginVertical: 10 }}
          />
          <TextInput
            mode="flat"
            placeholder="Type here..."
            containerStyle={{ marginVertical: 10 }}
          />
          <TextInput
            label="Input Label (Focus)"
            mode="flat"
            value="Input Text"
            placeholder="Hint Text"
            containerStyle={{ marginVertical: 10 }}
          />
          <TextInput
            disabled
            label="Input Label (Disabled)"
            mode="flat"
            value="Input Text"
            placeholder="Hint Text"
            containerStyle={{ marginVertical: 10 }}
          />
          <TextInput
            useErrorIcon={false}
            label="Input Label (Error)"
            mode="flat"
            value="Input Text"
            placeholder="Hint Text"
            errorMessage="Something Went Wrong"
            containerStyle={{ marginVertical: 10 }}
          />
          <TextInput
            label="Expiration Date (MM/YY)"
            mode="flat"
            value=""
            placeholder="MM/YY"
            errorMessage="Something Went Wrong"
            containerStyle={{ marginVertical: 10 }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
