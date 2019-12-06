import { useState, useEffect } from 'react';

import { FontSource } from '../types';

function useLoadFonts(
  fonts: Record<string, FontSource>,
  skipFontsLoading = false,
) {
  let shouldLoadFonts = !skipFontsLoading && !!Object.keys(fonts).length;

  let [areFontsLoaded, setFontsLoaded] = useState(!shouldLoadFonts);

  useEffect(() => {
    if (shouldLoadFonts) {
      try {
        let loadAsync = require('expo-font').loadAsync;
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
