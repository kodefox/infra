import React from 'react';
import {View, Text, Button} from 'react-native';

export default function FirstScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>First Screen</Text>
      <Button title="Go to Second Screen" onPress={() => {}} />
    </View>
  );
}
