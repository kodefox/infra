import React, { ComponentProps } from 'react';
import { Modal as PaperModal } from 'react-native-paper';

type PaperModalProps = ComponentProps<typeof PaperModal>;

type ModalProps = Omit<PaperModalProps, 'theme'>;

export default function Modal(props: ModalProps) {
  return <PaperModal {...props} />;
}
