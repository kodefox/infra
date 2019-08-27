import resolveTextStyle from '../resolveTextStyle';

describe('resolveTextStyle', () => {
  it('should resolve to undefined when style is not found', () => {
    expect(resolveTextStyle({}, 'default', '400')).toBeUndefined();
    expect(
      resolveTextStyle(
        {
          default: {
            light: {
              name: 'RubikLight',
              weight: '300',
            },
            normal: {
              name: 'RubikRegular',
              weight: '400',
            },
            medium: {
              name: 'RubikMedium',
              weight: '500',
            },
            bold: {
              name: 'RubikBold',
              weight: '700',
            },
          },
        },
        'italic',
        '400',
      ),
    ).toBeUndefined();
  });
  it('should resolve text style properly', () => {
    expect(
      resolveTextStyle(
        {
          default: {
            light: {
              name: 'RubikLight',
              weight: '300',
            },
            normal: {
              name: 'RubikRegular',
              weight: '400',
            },
            medium: {
              name: 'RubikMedium',
              weight: '500',
            },
            bold: {
              name: 'RubikBold',
              weight: '700',
            },
          },
        },
        'default',
        '500',
      ),
    ).toEqual({
      fontFamily: 'RubikMedium',
      fontWeight: '500',
      fontStyle: 'normal',
      fontSize: 14,
    });
  });
});
