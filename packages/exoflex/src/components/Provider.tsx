import React, {
  Component,
  ReactNode,
  createContext,
  useContext,
  useMemo,
} from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import deepmerge from 'deepmerge';

import { DefaultTheme } from '../constants/themes';
import { Theme, ThemeShape } from '../types';

type Props = {
  children: ReactNode;
  theme?: ThemeShape;
};

/**
 * TODO: Replace our useTheme with useTheme exposed by react-native-paper
 * when we update react-native-paper to v3
 */
let ThemeContext = createContext<Theme>(DefaultTheme);

export function useTheme() {
  return useContext(ThemeContext);
}

class Provider extends Component<Props> {
  render() {
    let { theme, ...otherProps } = this.props;
    let mergedTheme = useMemo(() => deepmerge(DefaultTheme, theme || {}), [
      theme,
    ]) as Theme;
    return (
      <ThemeContext.Provider value={mergedTheme}>
        <PaperProvider theme={theme} {...otherProps} />
      </ThemeContext.Provider>
    );
  }
}

export default Provider;
