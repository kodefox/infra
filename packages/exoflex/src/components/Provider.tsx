import React, { ReactNode, useMemo, ComponentType } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import deepmerge from 'deepmerge';

import DefaultLoadingPlaceholder from './LoadingPlaceholder';
import ToastContainer from './ToastContainer';
import useLoadFonts from '../helpers/useLoadFonts';
import { ThemeContext } from '../helpers/useTheme';
import { BuiltInFonts } from '../constants/fonts';
import { DefaultTheme } from '../constants/themes';
import { Theme, ThemeShape, FontSource } from '../types';

type Props = {
  children: ReactNode;
  theme?: ThemeShape;
  /**
   * Record of fonts to load.
   * Will be loaded only when `expo-font` module is available.
   * Defaults to the Rubik font families.
   */
  fonts?: Record<string, FontSource>;
  /**
   * Set to true to skip the fonts loading.
   * Defaults to false.
   */
  skipFontsLoading?: boolean;
  /**
   * Component rendered during the fonts loading.
   * Only relevant when `skipFontsLoading` is false.
   */
  LoadingPlaceholder?: ComponentType<{ theme: Theme }>;
};

function Provider({
  theme = {},
  children,
  fonts = BuiltInFonts,
  skipFontsLoading = false,
  LoadingPlaceholder = DefaultLoadingPlaceholder,
  ...otherProps
}: Props) {
  let isFontLoaded = useLoadFonts(fonts, skipFontsLoading);

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
