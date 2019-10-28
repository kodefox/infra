import { Fonts, FontSource } from '../types';

/**
 * Get map of font source to load from theme.fonts
 */
function getFontsSource(fonts: Fonts): Record<string, FontSource> {
  let fontsSource: Record<string, FontSource> = {};

  for (let preset of Object.values(fonts)) {
    for (let font of Object.values(preset)) {
      if (font.source != null) {
        fontsSource[font.name] = font.source;
      }
    }
  }

  return fontsSource;
}

export default getFontsSource;
