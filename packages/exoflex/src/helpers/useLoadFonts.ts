import { useState, useEffect } from 'react';

import { FontSource } from '../types';

function useLoadFonts(
  fonts: Record<string, FontSource>,
  skipFontsLoading = false,
) {
  let shouldLoadFonts = !skipFontsLoading;

  let [areFontsLoaded, setFontsLoaded] = useState(!shouldLoadFonts);

  useEffect(() => {
    if (shouldLoadFonts) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        let { loadAsync } = require('expo-font');
        loadAsync(fonts).then(() => {
          setFontsLoaded(true);
        });
      } catch {
        setFontsLoaded(true);
      }
    }
  }, [fonts, shouldLoadFonts]);

  return areFontsLoaded;
}

export default useLoadFonts;
