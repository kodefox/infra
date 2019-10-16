import React from 'react';
import { View } from 'react-native';
import { Text } from 'exoflex';

function Welcome() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eeeeee',
      }}
    >
      <Text style={{ fontSize: 20 }}>Welcome to exoflex example app.</Text>
      <Text style={{ fontSize: 20 }}>
        Try opening the drawer for list of available components.
      </Text>
    </View>
  );
}

export default Welcome;
