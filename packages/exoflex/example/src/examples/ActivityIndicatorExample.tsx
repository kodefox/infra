import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'exoflex';

function ActivityIndicatorExample() {
  return (
    <ScrollView contentContainerStyle={styles.root}>
      <ActivityIndicator style={{ marginVertical: 10 }} />
      <ActivityIndicator size="large" color="salmon" />
    </ScrollView>
  );
}

ActivityIndicatorExample.title = 'ActivityIndicator';

let styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default ActivityIndicatorExample;
