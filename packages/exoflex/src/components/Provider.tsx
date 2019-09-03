import React, { ReactNode, useMemo } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import deepmerge from 'deepmerge';

import ToastContainer from './ToastContainer';
import { ThemeContext } from '../helpers/useTheme';
import { DefaultTheme } from '../constants/themes';
import { Theme, ThemeShape } from '../types';

type Props = {
  children: ReactNode;
  theme: ThemeShape;
};

function Provider({ theme, children, ...otherProps }: Props) {
  let mergedTheme = useMemo(() => deepmerge(DefaultTheme, theme), [
    theme,
  ]) as Theme;
  return (
    <ThemeContext.Provider value={mergedTheme}>
      <PaperProvider theme={theme} {...otherProps}>
        {children}
        <ToastContainer />
      </PaperProvider>
    </ThemeContext.Provider>
  );
}

Provider.defaultProps = {
  theme: {},
};

export default Provider;
