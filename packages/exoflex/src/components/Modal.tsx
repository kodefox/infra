import React from 'react';
import {
  Modal as PaperModal,
  ModalProps as PaperModalProps,
} from 'react-native-paper';

type ModalProps = Omit<PaperModalProps, 'theme'>;

export default function Modal(props: ModalProps) {
  return <PaperModal {...props} />;
}
