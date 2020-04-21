import t, { addLocaleData, localeDataFromStrings } from '../translate';

describe('t function', () => {
  beforeAll(() => {
    addLocaleData(
      'en_US',
      localeDataFromStrings({
        simple: 'Welcome!',
        interpolate: 'Welcome, {name}.',
        complex: 'Welcome! Please click <Link>here</Link>.',
        complexInterpolate: 'Welcome, <foo>{name}</foo>.',
        nestedComplexInterpolate:
          'Welcome, <foo>{firstName} <bar>{lastName}</bar></foo>.',
      }),
    );
  });

  it('should be no-op for strings that do not exist in the dictionary', () => {
    expect(t('')).toBe('');
    expect(t('Foo')).toBe('Foo');
    expect(t('Hello, {foo}!')).toBe('Hello, foo!');
  });

  it('should return the correct string that exist in the dictionary', () => {
    expect(t('simple')).toBe('Welcome!');
    expect(t('interpolate')).toBe('Welcome, name.');
    expect(t('complex')).toBe('Welcome! Please click <Link>here</Link>.');
    expect(t('complexInterpolate')).toBe('Welcome, <foo>name</foo>.');
    expect(t('nestedComplexInterpolate')).toBe(
      'Welcome, <foo>firstName <bar>lastName</bar></foo>.',
    );
  });

  it('should interpolate strings', () => {
    expect(t('Hello, {foo}!', { foo: 'John' })).toEqual('Hello, John!');
    expect(t('interpolate', { name: 'John' })).toEqual('Welcome, John.');
    expect(t('complexInterpolate', { name: 'John' })).toEqual(
      'Welcome, <foo>John</foo>.',
    );
    expect(
      t('nestedComplexInterpolate', { firstName: 'John', lastName: 'Doe' }),
    ).toEqual('Welcome, <foo>John <bar>Doe</bar></foo>.');
  });
});

describe('t.frag function', () => {
  beforeAll(() => {
    addLocaleData(
      'en_US',
      localeDataFromStrings({
        simple: 'Welcome!',
        interpolate: 'Welcome, {name}.',
        complex: 'Welcome! Please click <Link>here</Link>.',
        complexInterpolate: 'Welcome, <foo>{name}</foo>.',
        nestedComplexInterpolate:
          'Welcome, <foo>{firstName} <bar>{lastName}</bar></foo>.',
      }),
    );
  });

  it('should interpolate tags', () => {
    expect(
      t.frag('complexInterpolate', {
        foo: (contents) => ({
          component: 'Foo',
          contents,
        }),
      }),
    ).toEqual(['Welcome, ', { component: 'Foo', contents: ['name'] }, '.']);
    expect(
      t.frag('nestedComplexInterpolate', {
        foo: (contents) => ({ component: 'Foo', contents }),
        bar: (contents) => ({ component: 'Bar', contents }),
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
      t.frag('complexInterpolate', {
        name: 'John',
        foo: (contents) => ({
          component: 'Foo',
          contents,
        }),
      }),
    ).toEqual(['Welcome, ', { component: 'Foo', contents: ['John'] }, '.']);
    expect(
      t.frag('nestedComplexInterpolate', {
        firstName: 'John',
        lastName: 'Doe',
        foo: (contents) => ({ component: 'Foo', contents }),
        bar: (contents) => ({ component: 'Bar', contents }),
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
