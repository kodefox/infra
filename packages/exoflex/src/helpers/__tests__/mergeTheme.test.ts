import mergeTheme from '../mergeTheme';
import { DefaultTheme } from '../../constants/themes';

describe('mergeTheme', () => {
  it('should not modify base theme', () => {
    let frozenTheme = Object.freeze(DefaultTheme);
    expect(mergeTheme(frozenTheme)).toEqual(DefaultTheme);
  });
  it('should deep merge all property except the font config', () => {
    expect(
      mergeTheme(
        DefaultTheme,
        {
          colors: {
            primary: 'pink',
          },
        },
        {
          roundness: 7,
        },
      ),
    ).toEqual({
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        primary: 'pink',
      },
      roundness: 7,
    });

    expect(
      mergeTheme(DefaultTheme, {
        fonts: {
          default: {
            normal: {
              name: 'foo',
            },
            bold: {
              name: 'bar',
              weight: '600',
            },
          },
        },
      }),
    ).toEqual({
      ...DefaultTheme,
      fonts: {
        ...DefaultTheme.fonts,
        default: {
          ...DefaultTheme.fonts.default,
          normal: {
            name: 'foo',
          },
          bold: {
            name: 'bar',
            weight: '600',
          },
        },
      },
    });

    expect(
      mergeTheme(
        DefaultTheme,
        {
          colors: {
            primary: 'pink',
          },
        },
        {
          roundness: 7,
        },
        {
          fonts: {
            default: {
              normal: {
                name: 'foo',
              },
              bold: {
                name: 'bar',
                weight: '600',
              },
            },
            bar: {
              normal: {
                name: 'baz',
              },
            },
          },
        },
      ),
    ).toEqual({
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        primary: 'pink',
      },
      roundness: 7,
      fonts: {
        ...DefaultTheme.fonts,
        default: {
          ...DefaultTheme.fonts.default,
          normal: {
            name: 'foo',
          },
          bold: {
            name: 'bar',
            weight: '600',
          },
        },
        bar: {
          normal: {
            name: 'baz',
          },
        },
      },
    });
  });
});
