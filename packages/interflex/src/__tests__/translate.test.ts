import t, { injectDictionaries, generateDefaultDictionary } from '../translate';

describe('translate function', () => {
  beforeAll(() => {
    injectDictionaries({
      en: generateDefaultDictionary({
        simple: 'Welcome!',
        interpolate: 'Welcome, {name}.',
        complex: 'Welcome! Please click <Link>here</Link>.',
        complexInterpolate: 'Welcome, <foo>{name}</foo>.',
        nextedComplexInterpolate:
          'Welcome, <foo>{firstName} <bar>{lastName}</bar></foo>.',
      }),
    });
  });

  it('should be no-op for strings that do not exist in the dictionary', () => {
    expect(t('')).toBe('');
    expect(t('Foo')).toBe('Foo');
    expect(t('Hello, {foo}!')).toBe('Hello, {foo}!');
    expect(t('welcome', { locale: 'id' })).toBe('welcome');
  });

  it('should return the correct string that exist in the dictionary', () => {
    expect(t('simple')).toBe('Welcome!');
    expect(t('interpolate')).toBe('Welcome, {name}.');
    expect(t('complex')).toBe('Welcome! Please click <Link>here</Link>.');
    expect(t('complexInterpolate')).toBe('Welcome, <foo>{name}</foo>.');
    expect(t('nextedComplexInterpolate')).toBe(
      'Welcome, <foo>{firstName} <bar>{lastName}</bar></foo>.',
    );
  });

  it('should interpolate strings', () => {
    expect(t('Hello, {foo}!', { params: { foo: 'John' } })).toEqual([
      'Hello, John!',
    ]);
    expect(t('interpolate', { params: { name: 'John' } })).toEqual([
      'Welcome, John.',
    ]);
    expect(t('complexInterpolate', { params: { name: 'John' } })).toEqual([
      'Welcome, ',
      '<foo>John</foo>',
      '.',
    ]);
    expect(
      t('nextedComplexInterpolate', {
        params: { firstName: 'John', lastName: 'Doe' },
      }),
    ).toEqual(['Welcome, ', '<foo>John <bar>Doe</bar></foo>', '.']);
  });

  it('should interpolate tags', () => {
    expect(
      t('complexInterpolate', {
        params: {
          foo: (contents: unknown) => ({
            component: 'Foo',
            contents,
          }),
        },
      }),
    ).toEqual(['Welcome, ', { component: 'Foo', contents: ['name'] }, '.']);
    expect(
      t('nextedComplexInterpolate', {
        params: {
          foo: (contents: unknown) => ({ component: 'Foo', contents }),
          bar: (contents: unknown) => ({ component: 'Bar', contents }),
        },
      }),
    ).toEqual([
      'Welcome, ',
      {
        component: 'Foo',
        contents: [
          'firstName ',
          { component: 'Bar', contents: ['lastName'] },
          '',
        ],
      },
      '.',
    ]);
  });

  it('should interpolate tags and strings', () => {
    expect(
      t('complexInterpolate', {
        params: {
          name: 'John',
          foo: (contents: unknown) => ({
            component: 'Foo',
            contents,
          }),
        },
      }),
    ).toEqual(['Welcome, ', { component: 'Foo', contents: ['John'] }, '.']);
    expect(
      t('nextedComplexInterpolate', {
        params: {
          firstName: 'John',
          lastName: 'Doe',
          foo: (contents: unknown) => ({ component: 'Foo', contents }),
          bar: (contents: unknown) => ({ component: 'Bar', contents }),
        },
      }),
    ).toEqual([
      'Welcome, ',
      {
        component: 'Foo',
        contents: ['John ', { component: 'Bar', contents: ['Doe'] }, ''],
      },
      '.',
    ]);
  });
});
