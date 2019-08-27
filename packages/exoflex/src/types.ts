import {
  Theme as PaperTheme,
  ThemeShape as PaperThemeShape,
} from 'react-native-paper';

export type Theme = Omit<PaperTheme, 'fonts'> & {
  fonts: Fonts;
};

export type ThemeShape = Omit<PaperThemeShape, 'fonts'> & {
  fonts?: Fonts;
};

export type FullFontWeight =
  | '100'
  | '200'
  | '300' // light
  | '400' // normal
  | '500' // medium
  | '600'
  | '700' // bold
  | '800'
  | '900'
  | 'normal'
  | 'bold';

export type FontWeight =
  | '300' // light
  | '400' // normal
  | '500' // medium
  | '700' // bold
  | 'light'
  | 'normal'
  | 'medium'
  | 'bold';

export type FontStyle = 'normal' | 'italic';

type Font = {
  name: string;
  weight: FullFontWeight;
  style?: FontStyle;
  size?: number;
};

export type FontPreset = {
  light: Font;
  normal: Font;
  medium: Font;
  bold: Font;
};

export type Fonts = { [fontPresetName: string]: FontPreset };
