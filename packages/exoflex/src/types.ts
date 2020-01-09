export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : DeepPartial<T[P]>;
};
export type Theme = {
  fonts: Fonts;
  colors: Colors;
  dark: boolean;
  roundness: number;
  animation: {
    scale: number;
  };
  uppercase: {
    button: boolean;
    textinput: boolean;
  };
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

export type Font = {
  name: string;
  weight: FullFontWeight;
  style?: FontStyle;
  size?: number;
  source?: FontSource;
};

// TODO: Add support for all font weights in theme.
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
  onSurface: string;
  onBackground: string;
  notification: string;
};

export type FontSource = string | number;
