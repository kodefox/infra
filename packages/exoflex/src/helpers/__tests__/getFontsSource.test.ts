import getFontsSource from '../getFontsSource';
import { SystemFontsTheme, DefaultTheme } from '../../constants/themes';
import { BuiltInFonts } from '../../constants/fonts';

describe('getFontsSource', () => {
  it('should return empty object when using system fonts', () => {
    expect(getFontsSource(SystemFontsTheme.fonts)).toEqual({});
  });
  it('should return fonts source properly', () => {
    expect(getFontsSource(DefaultTheme.fonts)).toEqual(BuiltInFonts);
    expect(
      getFontsSource({
        default: {
          light: {
            name: 'RubikLight',
            weight: '300',
          },
          normal: {
            name: 'RubikRegular',
            weight: '400',
            source: BuiltInFonts.RubikRegular,
          },
          medium: {
            name: 'RubikMedium',
            weight: '500',
          },
          bold: {
            name: 'RubikBold',
            weight: '700',
            source: BuiltInFonts.RubikBold,
          },
        },
        mypreset: {
          light: {
            name: 'MyFontLight',
            weight: '300',
          },
          normal: {
            name: 'MyFontRegular',
            weight: '400',
            source: 'foo.ttf',
          },
          medium: {
            name: 'MyFontMedium',
            weight: '500',
            source: 7,
          },
          bold: {
            name: 'MyFontBold',
            weight: '700',
            source: 'bar.ttf',
          },
        },
      }),
    ).toEqual({
      RubikRegular: BuiltInFonts.RubikRegular,
      RubikBold: BuiltInFonts.RubikBold,
      MyFontRegular: 'foo.ttf',
      MyFontMedium: 7,
      MyFontBold: 'bar.ttf',
    });
  });
});
