import React from 'react';
import {View, Text, Button} from 'react-native';

import {useNavigation} from 'naviflex';

export default function SecondScreen() {
  let {navigate, goBack} = useNavigation();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Second Screen</Text>
      <Button title="Go to Third Screen" onPress={() => navigate('third')} />
      <Button title="Back to First Screen" onPress={() => goBack()} />
    </View>
  );
}
