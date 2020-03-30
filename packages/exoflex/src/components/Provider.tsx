import React, { ReactNode, useMemo, ComponentType } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import getFontsSource from '../helpers/getFontsSource';
import getPaperTheme from '../helpers/getPaperTheme';
import mergeTheme from '../helpers/mergeTheme';
import useLoadFonts from '../helpers/useLoadFonts';
import { ThemeContext } from '../helpers/useTheme';
import { DefaultTheme } from '../constants/themes';
import { Theme, ThemeShape, FontSource } from '../types';

import ToastContainer from './ToastContainer';
import DefaultLoadingPlaceholder from './LoadingPlaceholder';

type Props = {
  children: ReactNode;
  theme?: ThemeShape;
  /**
   * @deprecated specify font source on the theme instead.
   * Record of fonts to load.
   * Will be loaded only when `expo-font` module is available.
   * Defaults to the Rubik font families.
   */
  fonts?: Record<string, FontSource>;
  /**
   * @deprecated
   * Set to true to use fonts available in the system instead of loading
   * custom fonts.
   * Implies `skipFontsLoading` set to true.
   * Defaults to true.
   */
  useSystemFonts?: boolean;
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
  useSystemFonts,
  fonts,
  skipFontsLoading = false,
  LoadingPlaceholder = DefaultLoadingPlaceholder,
  ...otherProps
}: Props) {
  let { mergedTheme, paperTheme, fontsSource } = useMemo(() => {
    let mergedTheme = mergeTheme(DefaultTheme, theme);

    return {
      mergedTheme,
      paperTheme: getPaperTheme(mergedTheme),
      fontsSource: getFontsSource(mergedTheme.fonts),
    };
  }, [theme]);

  let isFontLoaded = useLoadFonts(fontsSource, skipFontsLoading);

  if (useSystemFonts != null) {
    // eslint-disable-next-line no-console
    console.warn(
      'Using `useSystemFonts` is no longer supported, now exoflex use system fonts by default.',
    );
  }

  if (fonts) {
    // eslint-disable-next-line no-console
    console.warn(
      'Using `fonts` for loading fonts is no longer supported, please specify the font source on the theme instead.',
    );
  }

  if (!isFontLoaded) {
    return <LoadingPlaceholder theme={mergedTheme} />;
  }

  return (
    <ThemeContext.Provider value={mergedTheme}>
      <PaperProvider {...otherProps} theme={paperTheme}>
        {children}
        <ToastContainer />
      </PaperProvider>
    </ThemeContext.Provider>
  );
}

export default Provider;
