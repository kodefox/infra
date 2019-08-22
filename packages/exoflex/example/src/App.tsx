import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { loadAsync } from 'expo-font';
import { Text, Provider, DefaultTheme, BuiltInFonts } from 'exoflex';

export default function App() {
  let [isFontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    loadAsync(BuiltInFonts).then(() => {
      setFontLoaded(true);
    });
  }, []);

  if (!isFontLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <Provider theme={DefaultTheme}>
      <View style={styles.container}>
        <Text weight="700">Exoflex</Text>
        <Text fontStyle="italic">Cool</Text>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
