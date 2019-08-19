import React, { Component, ReactNode } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import { Theme } from '../types';

type Props = {
  children: ReactNode;
  theme?: Theme;
};

class Provider extends Component<Props> {
  render() {
    return <PaperProvider {...this.props} />;
  }
}

export default Provider;
