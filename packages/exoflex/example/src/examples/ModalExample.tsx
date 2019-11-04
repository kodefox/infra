import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Portal, Text, Modal, Button } from 'exoflex';

function ModalExample() {
  let [isVisible, setVisible] = useState(false);

  let toggleModal = () => setVisible(!isVisible);

  return (
    <>
      <View style={styles.container}>
        <Button onPress={toggleModal}>Open Modal</Button>
      </View>
      <Portal>
        <Modal
          visible={isVisible}
          onDismiss={toggleModal}
          contentContainerStyle={styles.modal}
        >
          <Text>Howdy, Modal!</Text>
          <Text>You can click the overlay to close this modal.</Text>
        </Modal>
      </Portal>
    </>
  );
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    padding: 16,
    backgroundColor: 'white',
    margin: 16,
    alignItems: 'center',
    height: 150,
  },
});

ModalExample.title = 'Modal';

export default ModalExample;
