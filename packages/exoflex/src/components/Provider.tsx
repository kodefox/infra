import React, { Component, ReactNode } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import { FontsContext } from './Font';
import { Theme } from '../types';

type Props = {
  children: ReactNode;
  theme?: Theme;
};

class Provider extends Component<Props> {
  render() {
    let { theme, ...otherProps } = this.props;
    let fonts = (theme && theme.fonts) || {};
    return (
      <FontsContext.Provider value={fonts}>
        <PaperProvider theme={theme} {...otherProps} />
      </FontsContext.Provider>
    );
  }
}

export default Provider;
