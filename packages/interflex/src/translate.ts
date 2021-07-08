const PLACEHOLDER = /\{(\w+)\}/g;
const FRAGMENT = /<(\w+)>(.*?)<\/\1>/g;
const DEFAULT_LOCALE_DATA = {
  localizedName: '',
  strings: {},
};
let locales: LocaleDictionary = {};
let tLocale: Locale = 'en_US';

export type Params = {
  [key: string]:
    | null
    | undefined
    | number
    | string
    | boolean
    | ((s: string) => unknown);
};

/**
 * (For testing) to inject data into the dictionary.
 * @param data
 */
export function addLocaleData(locale: Locale, data: LocaleData): void {
  locales = { ...locales, [locale]: data };
}

/**
 * (For testing) to generate basic dictionary entry with strings content.
 * @param strings
 */
export function localeDataFromStrings(strings: {
  [key: string]: string;
}): LocaleData {
  return {
    ...DEFAULT_LOCALE_DATA,
    strings,
  };
}

/**
 * to get the dictionary given a locale which falls back to a default empty dictionary.
 * @param locale
 */

function getDictionary(locale: Locale): LocaleData {
  return locales[locale] || DEFAULT_LOCALE_DATA;
}

/**
 * looks up a given string in the dictionary and interpolates it with the given options.
 * @param input a string to lookup in the dictionary or any string to be translated.
 * @param options optional locale and parameters to use when translating.
 */
export default function t(input: string, params: Params = {}): string {
  let { strings: dictionary } = getDictionary(tLocale);

  // NOTE: if string is undefined, fallback to input
  let lookedUpString = (dictionary && dictionary[input]) || input;

  if (params) {
    return lookedUpString.replace(PLACEHOLDER, (_: string, text: string) =>
      params[text] ? String(params[text]) : text,
    );
  }

  return lookedUpString;
}

/**
 * interpolates tags with the given parameters.
 * @param input a string to be interpolated by tags.
 * @param params parameters to use for the tag.
 */
t.frag = (input: string, params: Params): Array<unknown> => {
  let results: Array<unknown> = [];
  let lastIndex = 0;
  let parsed = t(input, params);
  parsed.replace(FRAGMENT, (match, tagName, contents, index) => {
    let resolver = params[tagName];
    results.push(parsed.slice(lastIndex, index));
    lastIndex = index + match.length;
    contents = t.frag(contents, params);
    if (typeof resolver === 'function') {
      results.push(resolver(contents));
    } else {
      results.push(match);
    }

    // NOTE: we don't care about the return value as we keep the value that we need in results
    return '';
  });
  results.push(parsed.slice(lastIndex));
  return results;
};
