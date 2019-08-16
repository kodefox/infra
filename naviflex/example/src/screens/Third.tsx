import React from 'react';
import {View, Text, Button} from 'react-native';

export default function ThirdScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Third Screen</Text>
      <Button title="Back to Second Screen" onPress={() => {}} />
    </View>
  );
}
