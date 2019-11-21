import React from 'react';
import { Modal as PaperModal } from 'react-native-paper';

type ModalProps = OmitPaperTheme<typeof PaperModal>;

export default function Modal(props: ModalProps) {
  return <PaperModal {...props} />;
}
