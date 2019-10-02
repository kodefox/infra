import { useState, useEffect } from 'react';

import { FontSource } from '../types';

function useLoadFont(
  fontMap: Record<string, FontSource>,
  skipFontLoading = false,
) {
  let shouldLoadFont = !skipFontLoading;

  let [isFontLoaded, setFontLoaded] = useState(!shouldLoadFont);

  useEffect(() => {
    if (shouldLoadFont) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        let { loadAsync } = require('expo-font');
        loadAsync(fontMap).then(() => {
          setFontLoaded(true);
        });
      } catch {
        setFontLoaded(true);
      }
    }
  }, [shouldLoadFont]);

  return isFontLoaded;
}

export default useLoadFont;
