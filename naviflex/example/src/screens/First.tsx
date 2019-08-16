import React from 'react';
import {View, Text, Button} from 'react-native';

import {useNavigation} from 'naviflex';

export default function FirstScreen() {
  let {navigate} = useNavigation();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>First Screen</Text>
      <Button title="Go to Second Screen" onPress={() => navigate('second')} />
    </View>
  );
}
