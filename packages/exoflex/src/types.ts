import { DeepPartial } from 'react-native-paper';

export type Theme = {
  fonts: Fonts;
  colors: Colors;
  dark: boolean;
  roundness: number;
};

export type ThemeShape = DeepPartial<Theme>;

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

export type Colors = {
  primary: string;
  background: string;
  surface: string;
  accent: string;
  error: string;
  text: string;
  disabled: string;
  border: string;
  placeholder: string;
  backdrop: string;
};

export type FontSource = string | number;
