import mergeWith from 'lodash.mergewith';

import { Theme, Font, ThemeShape } from '../types';

/**
 * Font config should not be merged, instead, it should override the config in the same preset.
 */
function mergeFontConfig(_fontA: Font, fontB: Font): Font {
  return fontB;
}

function mergeTheme(base: Theme, ...partials: Array<ThemeShape>): Theme {
  return mergeWith(
    { ...base },
    ...partials,
    (prev: unknown, next: unknown, key: string) => {
      if (
        key === 'light' ||
        key === 'normal' ||
        key === 'medium' ||
        key === 'bold'
      ) {
        return mergeFontConfig(prev as Font, next as Font);
      }
    },
  );
}

export default mergeTheme;
