import { useState, useEffect } from 'react';

import { FontSource } from '../types';
import { IS_WEB } from '../constants/platforms';

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
        // NOTE: This if condition is necessary to fix an unknown bug
        // https://github.com/expo/expo/issues/4217#issuecomment-577607039
        if (IS_WEB) {
          loadAsync(fonts).catch(() => {});
          setFontsLoaded(true);
        } else {
          loadAsync(fonts).then(() => {
            setFontsLoaded(true);
          });
        }
      } catch {
        setFontsLoaded(true);
      }
    }
  }, [fonts, shouldLoadFonts]);

  return areFontsLoaded;
}

export default useLoadFonts;
