import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Portal, Text } from 'exoflex';

function PortalExample() {
  let [showPortal, setShowPortal] = useState(false);
  return (
    <>
      {showPortal && (
        <Portal>
          <View style={styles.portalContainer}>
            <Text style={styles.text} onPress={() => setShowPortal(false)}>
              {'Hello from the portal.\nPress me to dismiss.'}
            </Text>
          </View>
        </Portal>
      )}
      <View style={styles.root}>
        <Text onPress={() => setShowPortal(true)}>
          Press me to show the portal.
        </Text>
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
