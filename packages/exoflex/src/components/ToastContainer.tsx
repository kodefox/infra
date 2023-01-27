import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StyleProp, ViewProps, TextStyle } from 'react-native';

import Toast, { ModeProps } from './Toast';
import EventEmitter from '../helpers/EventEmitter';

export type ToastConfig = {
  message: string;
  showIcon?: boolean;
  mode?: ModeProps;
  duration?: number;
  style?: StyleProp<ViewProps>;
  textStyle?: StyleProp<TextStyle>;
};

type EmitEvents = { showToast: ToastConfig; hideToast: undefined };

let DefaultToastConfig: ToastConfig = {
  message: '',
  mode: 'info' as ModeProps,
  duration: 4000,
  showIcon: true,
};

let ToastEmitter = EventEmitter.create<EmitEvents>();

function showToast(config: ToastConfig) {
  ToastEmitter.emit('showToast', config);
}

function hideToast() {
  ToastEmitter.emit('hideToast', undefined);
}

function ToastContainer() {
  let [visible, setVisible] = useState(false);
  let [config, setConfig] = useState(DefaultToastConfig);

  let timerID = useRef<number | undefined>();

  let onShowToast = useCallback((newConfig: ToastConfig) => {
    setVisible(true);
    setConfig({ ...DefaultToastConfig, ...newConfig });
  }, []);
  let onHideToast = useCallback(() => {
    setVisible(false);
  }, []);

  useEffect(() => {
    if (visible) {
      timerID.current = window.setTimeout(hideToast, config.duration);
    }
    return () => clearTimeout(timerID.current);
  }, [visible, config.duration]);

  useEffect(() => {
    ToastEmitter.on('showToast', onShowToast);
    ToastEmitter.on('hideToast', onHideToast);
    return () => {
      ToastEmitter.remove('showToast', onShowToast);
      ToastEmitter.remove('hideToast', onHideToast);
    };
  }, [onShowToast, onHideToast]);

  return (
    <Toast
      visible={visible}
      mode={config.mode}
      showIcon={config.showIcon}
      style={config.style}
      textStyle={config.textStyle}
    >
      {config.message}
    </Toast>
  );
}

Toast.showToast = showToast;
Toast.hideToast = hideToast;

export { ToastEmitter, showToast, hideToast };
export default ToastContainer;
