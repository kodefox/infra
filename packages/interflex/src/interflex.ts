const PLACEHOLDER = /\{(\w+)\}/g;
const FRAGMENT = /<(\w+)>(.*?)<\/\1>/g;
const DEFAULT_LOCALE_DATA: LocaleData = {
  localizedName: '',
  strings: {},
};

type LocaleData = {
  localizedName: string;
  strings: Record<string, string>;
};

type LocaleDictionary<T extends string> = { [key in T]: LocaleData };

type Params = {
  [key: string]:
    | null
    | undefined
    | number
    | string
    | boolean
    | ((s: string) => unknown);
};

export default class Interflex<TLocale extends string> {
  private _locales: LocaleDictionary<TLocale>;
  private _locale: TLocale;

  constructor(defaultLocale: TLocale) {
    this._locales = {} as LocaleDictionary<TLocale>;
    this._locale = defaultLocale;
  }

  /**
   * retrieves the current locale data.
   */
  get localeData() {
    return this._locales[this._locale];
  }

  /**
   * adds locale data into the dictionary.
   * @param locale
   * @param data
   */
  public addLocaleData = (locale: TLocale, data: LocaleData): void => {
    this._locales[locale] = data;
  };

  /**
   * adds more translation strings to a specific locale.
   * @param locale
   * @param strings
   */
  public addLocaleStrings = (
    locale: TLocale,
    additionalStrings: Record<string, string>,
  ) => {
    if (!!this._locales[locale]) {
      let { strings, ...rest } = this._locales[locale];
      this._locales[locale] = {
        strings: {
          ...strings,
          ...additionalStrings,
        },
        ...rest,
      };
    } else {
      throw Error('Please initialize locale data before adding new strings');
    }
  };

  /**
   * changes the currently selected locale.
   * @param locale
   */
  public setLocale = (locale: TLocale): void => {
    if (locale !== this._locale) {
      this._locale = locale;
    }
  };

  /**
   * attaches the i18n instance (or t function?) to the global object.
   */
  public attachToGlobal = () => {
    // TODO: attach i18n instance (or t function) to global and let ts know
  };

  /**
   * looks up a given string in the dictionary and interpolates it with the given options.
   * @param input a string to lookup in the dictionary or any string to be translated.
   * @param options optional parameters for interpolation.
   */
  public t = (input: string, params: Params = {}): string => {
    let { strings: dictionary } = this.localeData || DEFAULT_LOCALE_DATA;

    // NOTE: if string is undefined, fallback to input
    let lookedUpString = (dictionary && dictionary[input]) || input;

    if (params) {
      return lookedUpString.replace(PLACEHOLDER, (_: string, text: string) =>
        params[text] ? String(params[text]) : text,
      );
    }

    return lookedUpString;
  };

  /**
   * interpolates tags with the given parameters.
   * @param input a string to be interpolated by tags.
   * @param params parameters to use for the interpolation.
   */
  public tFrag = (input: string, params: Params = {}): Array<unknown> => {
    let results: Array<unknown> = [];
    let lastIndex = 0;
    let parsed = this.t(input, params);
    parsed.replace(FRAGMENT, (match, tagName, contents, index) => {
      let resolver = params[tagName];
      results.push(parsed.slice(lastIndex, index));
      lastIndex = index + match.length;

      // NOTE: this is where things get funky and messy for types: nested tag interpolation.
      // contents = this.tFrag(contents, params);

      if (typeof resolver === 'function') {
        results.push(resolver(contents));
      } else {
        results.push(match);
      }

      // NOTE: this is to satisty ts, we keep the value that we need in results.
      return '';
    });
    results.push(parsed.slice(lastIndex));
    return results;
  };
}
