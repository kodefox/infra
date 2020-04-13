import Interflex from '../interflex';

const enUS = {
  localizedName: 'English',
  strings: {
    simple: 'Welcome!',
    interpolate: 'Welcome, {name}.',
    complex: 'Welcome! Please click <Link>here</Link>.',
    complexInterpolate: 'Welcome, <foo>{name}</foo>.',
    // NOTE: nested tags interpolation is still under discussion
    // nestedComplexInterpolate:
    //   'Welcome, <foo>{firstName} <bar>{lastName}</bar></foo>.',
  },
};

describe('addLocaleData', () => {
  let i18n = new Interflex<'en_US' | 'id_ID'>('en_US');

  it('should add locale data', () => {
    expect(i18n.localeData).toBeUndefined();
    i18n.addLocaleData('en_US', enUS);
    expect(i18n.localeData).toEqual(enUS);
  });
});

describe('addLocaleStrings', () => {
  let i18n = new Interflex<'en_US' | 'id_ID'>('en_US');

  it('should throw an error for non initialized locales', () => {
    expect(() => i18n.addLocaleStrings('en_US', { greet: 'Hello' })).toThrow();
  });

  it('should append strings to locales', () => {
    i18n.addLocaleData('en_US', {
      localizedName: 'English',
      strings: { greet: 'Hello' },
    });
    expect(i18n.localeData.strings).toEqual({ greet: 'Hello' });
    i18n.addLocaleStrings('en_US', { morningGreeting: 'Good morning' });
    expect(i18n.localeData.strings).toEqual({
      greet: 'Hello',
      morningGreeting: 'Good morning',
    });
  });
});

describe('setLocale', () => {
  let i18n = new Interflex<'en_US' | 'id_ID'>('en_US');
  i18n.addLocaleData('en_US', { localizedName: 'English', strings: {} });
  i18n.addLocaleData('id_ID', {
    localizedName: 'Bahasa Indonesia',
    strings: {},
  });

  it('should change the locale', () => {
    expect(i18n.localeData.localizedName).toBe('English');
    i18n.setLocale('id_ID');
    expect(i18n.localeData.localizedName).toBe('Bahasa Indonesia');
    i18n.setLocale('en_US');
    expect(i18n.localeData.localizedName).toBe('English');
  });
});

describe('t function', () => {
  let i18n = new Interflex<'en_US' | 'id_ID'>('en_US');
  i18n.addLocaleData('en_US', enUS);

  it('should be no-op for non initialized dictionary', () => {
    i18n.setLocale('id_ID');
    expect(i18n.t('simple')).toBe('simple');
    i18n.setLocale('en_US');
  });

  it('should be no-op for strings that do not exist in the dictionary', () => {
    expect(i18n.t('')).toBe('');
    expect(i18n.t('Foo')).toBe('Foo');
    expect(i18n.t('Hello, {foo}!')).toBe('Hello, foo!');
  });

  it('should return the correct string that exist in the dictionary', () => {
    expect(i18n.t('simple')).toBe('Welcome!');
    expect(i18n.t('interpolate')).toBe('Welcome, name.');
    expect(i18n.t('complex')).toBe('Welcome! Please click <Link>here</Link>.');
    expect(i18n.t('complexInterpolate')).toBe('Welcome, <foo>name</foo>.');
    // expect(i18n.t('nestedComplexInterpolate')).toBe(
    //   'Welcome, <foo>firstName <bar>lastName</bar></foo>.',
    // );
  });

  it('should interpolate strings', () => {
    expect(i18n.t('Hello, {foo}!', { foo: 'John' })).toEqual('Hello, John!');
    expect(i18n.t('interpolate', { name: 'John' })).toEqual('Welcome, John.');
    expect(i18n.t('complexInterpolate', { name: 'John' })).toEqual(
      'Welcome, <foo>John</foo>.',
    );
    // expect(
    //   i18n.t('nestedComplexInterpolate', {
    //     firstName: 'John',
    //     lastName: 'Doe',
    //   }),
    // ).toEqual('Welcome, <foo>John <bar>Doe</bar></foo>.');
  });
});

describe('tFrag function', () => {
  let i18n = new Interflex<'en_US' | 'id_ID'>('en_US');
  i18n.addLocaleData('en_US', enUS);

  it('should interpolate tags', () => {
    expect(
      i18n.tFrag('complexInterpolate', {
        foo: (contents) => ({
          component: 'Foo',
          contents,
        }),
      }),
    ).toEqual(['Welcome, ', { component: 'Foo', contents: 'name' }, '.']);
    // expect(
    //   i18n.tFrag('nestedComplexInterpolate', {
    //     foo: (contents) => ({ component: 'Foo', contents }),
    //     bar: (contents) => ({ component: 'Bar', contents }),
    //   }),
    // ).toEqual([
    //   'Welcome, ',
    //   {
    //     component: 'Foo',
    //     contents: [
    //       'firstName ',
    //       { component: 'Bar', contents: ['lastName'] },
    //       '',
    //     ],
    //   },
    //   '.',
    // ]);
  });

  it('should interpolate tags and strings', () => {
    expect(
      i18n.tFrag('complexInterpolate', {
        name: 'John',
        foo: (contents) => ({
          component: 'Foo',
          contents,
        }),
      }),
    ).toEqual(['Welcome, ', { component: 'Foo', contents: 'John' }, '.']);
    // expect(
    //   i18n.tFrag('nestedComplexInterpolate', {
    //     firstName: 'John',
    //     lastName: 'Doe',
    //     foo: (contents) => ({ component: 'Foo', contents }),
    //     bar: (contents) => ({ component: 'Bar', contents }),
    //   }),
    // ).toEqual([
    //   'Welcome, ',
    //   {
    //     component: 'Foo',
    //     contents: ['John ', { component: 'Bar', contents: ['Doe'] }, ''],
    //   },
    //   '.',
    // ]);
  });
});
