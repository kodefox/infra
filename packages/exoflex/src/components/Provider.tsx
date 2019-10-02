import React, { ReactNode, useMemo, ComponentType } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import deepmerge from 'deepmerge';

import DefaultLoadingPlaceholder from './LoadingPlaceholder';
import ToastContainer from './ToastContainer';
import useLoadFont from '../helpers/useLoadFont';
import { ThemeContext } from '../helpers/useTheme';
import { BuiltInFonts } from '../constants/fonts';
import { DefaultTheme } from '../constants/themes';
import { Theme, ThemeShape } from '../types';

type Props = {
  children: ReactNode;
  theme?: ThemeShape;
  skipFontLoading?: boolean;
  LoadingPlaceholder?: ComponentType<{ theme: Theme }>;
};

function Provider({
  theme = {},
  children,
  skipFontLoading = false,
  LoadingPlaceholder = DefaultLoadingPlaceholder,
  ...otherProps
}: Props) {
  let isFontLoaded = useLoadFont(BuiltInFonts, skipFontLoading);

  let mergedTheme = useMemo(() => deepmerge(DefaultTheme, theme), [
    theme,
  ]) as Theme;

  if (!isFontLoaded) {
    return <LoadingPlaceholder theme={mergedTheme} />;
  }

  return (
    <ThemeContext.Provider value={mergedTheme}>
      <PaperProvider theme={theme} {...otherProps}>
        {children}
        <ToastContainer />
      </PaperProvider>
    </ThemeContext.Provider>
  );
}

export default Provider;
