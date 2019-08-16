import React from 'react';
import {View, Text, Button} from 'react-native';

export default function SecondScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Second Screen</Text>
      <Button title="Go to Third Screen" onPress={() => {}} />
      <Button title="Back to First Screen" onPress={() => {}} />
    </View>
  );
}
