import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import ActivityIndicator from './ActivityIndicator';
import { Theme } from '../types';

type Props = {
  theme: Theme;
};

function LoadingPlaceholder(props: Props) {
  return (
    <SafeAreaView style={styles.root}>
      <ActivityIndicator {...props} />
    </SafeAreaView>
  );
}

let styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default LoadingPlaceholder;
