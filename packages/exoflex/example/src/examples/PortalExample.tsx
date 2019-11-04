import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Portal, Text } from 'exoflex';

function PortalExample() {
  return (
    <>
      <Portal>
        <View style={styles.portalContainer}>
          <Text style={styles.text}>Hello</Text>
        </View>
      </Portal>
      <View style={styles.root}>
        <Text>This is the scene content</Text>
      </View>
    </>
  );
}

let styles = StyleSheet.create({
  portalContainer: {
    flex: 1,
    backgroundColor: '#0f0f0f',
    opacity: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: { color: 'tomato' },
  root: { padding: 20, alignItems: 'center' },
});

PortalExample.title = 'Portal';

export default PortalExample;
