import React from 'react';
import {View, Text} from 'react-native';
import {useRoutes} from 'hookrouter';

import FirstScreen from '../screens/First';
import SecondScreen from '../screens/Second';
import ThirdScreen from '../screens/Third';

const ROUTES = {
  '/': () => <FirstScreen />,
  '/first': () => <FirstScreen />,
  '/second': () => <SecondScreen />,
  '/third': () => <ThirdScreen />,
};

function NotFoundScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Page not found.</Text>
    </View>
  );
}

export default function() {
  const match = useRoutes({...ROUTES});
  return match || <NotFoundScreen />;
}
