import { ThemeShape } from 'react-native-paper';

export type Theme = Omit<ThemeShape, 'fonts'> & {
  fonts?: Fonts;
};

type FontWeight =
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | 'regular'
  | 'normal'
  | 'bold'
  | 'light';

type FontStyle = 'normal' | 'italic';

type Font = {
  file: string;
  weight: FontWeight;
  style: FontStyle;
};

export type Fonts = { [fontFamily: string]: Array<Font> };
