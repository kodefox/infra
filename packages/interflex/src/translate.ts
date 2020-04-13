const PLACEHOLDER = /\{(\w+)\}/g;
const FRAGMENT = /<(\w+)>(.*?)<\/\1>/g;
const DEFAULT_DICTIONARY = {
  localizedName: '',
  currencySymbol: '',
  thousandSeparator: '',
  decimalSeparator: '',
  decimalPlaces: 0,
  dateFormat: '',
  strings: {},
  monthNames: [],
  monthNamesShort: [],
  daysOfWeek: [],
  daysOfWeekShort: [],
  startOfWeek: 0,
};
let dictionary: LocaleDictionary = {};
let tLocale: Locale = 'en';

export type Params = { [key: string]: unknown };
export type ParamsWithResolver = {
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
export function injectDictionaries(data: LocaleDictionary): void {
  dictionary = { ...dictionary, ...data };
}

/**
 * (For testing) to generate basic dictionary entry with strings content.
 * @param strings
 */
export function generateDefaultDictionary(strings: {
  [key: string]: string;
}): LocaleData {
  return {
    ...DEFAULT_DICTIONARY,
    strings,
  };
}

/**
 * to get the dictionary given a locale which falls back to a default empty dictionary.
 * @param locale
 */

function getDictionary(locale: Locale): LocaleData {
  return dictionary[locale] || DEFAULT_DICTIONARY;
}

/**
 * interpolates tags with the given parameters.
 * @param input a string to be interpolated by tags.
 * @param params parameters to use for the tag.
 */
function tFrag(input: string, params: Params): Array<unknown> {
  let results: Array<unknown> = [];
  let lastIndex = 0;
  input.replace(FRAGMENT, (match, tagName, contents, index) => {
    let resolver = params[tagName];
    results.push(input.slice(lastIndex, index));
    lastIndex = index + match.length;
    contents = tFrag(contents, params);
    if (typeof resolver === 'function') {
      results.push(resolver(contents));
    } else {
      results.push(match);
    }

    // NOTE: we don't care about the return value as we keep the value that we need in results
    return '';
  });
  results.push(input.slice(lastIndex));
  return results;
}

/**
 * looks up a given string in the dictionary and interpolates it with the given options.
 * @param input a string to lookup in the dictionary or any string to be translated.
 * @param options optional locale and parameters to use when translating.
 */
export default function t(
  input: string,
  { locale = tLocale, params }: { locale?: Locale; params?: Params } = {},
): string | Array<unknown> {
  let { strings: dictionary } = getDictionary(locale);

  // NOTE: if string is undefined, fallback to input
  let lookedUpString = (dictionary && dictionary[input]) || input;

  if (params) {
    lookedUpString = lookedUpString.replace(
      PLACEHOLDER,
      (_: string, text: string) => (params[text] ? String(params[text]) : text),
    );
    let frags = tFrag(lookedUpString, params);
    return frags;
  }

  return lookedUpString;
}
