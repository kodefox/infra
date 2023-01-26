import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Toast } from 'exoflex';

function ToastExample() {
  let [visible, setVisible] = useState(false);

  return (
    <View style={styles.root}>
      <Button
        onPress={() =>
          Toast.showToast({
            message: `I'm uncontrolled!`,
            duration: 1000,
            mode: 'error',
          })
        }
      >
        SHOW UNCONTROLLED TOAST
      </Button>
      <Button
        onPress={() => setVisible((v) => !v)}
        preset="secondary"
        style={{ marginVertical: 20 }}
      >
        TOGGLE CONTROLLED TOAST
      </Button>
      <Toast visible={visible} mode="success">
        Controlled Toast
      </Toast>
      <Button
        onPress={() =>
          Toast.showToast({
            message: `I don't have an icon`,
            duration: 1000,
            mode: 'warning',
            showIcon: false,
          })
        }
      >
        SHOW UNCONTROLLED TOAST
      </Button>
    </View>
  );
}

ToastExample.title = 'Toast';

let styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 16,
    backgroundColor: '#eeeeee',
  },
});

export default ToastExample;
