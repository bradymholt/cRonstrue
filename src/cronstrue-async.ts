import { ExpressionDescriptor } from "./expressionDescriptor";
import { Locale } from "./i18n/locale";
import { Options } from "./options";

const LOCALE_BASE_PATH = './i18n/locales/';

/**
 * This interface is used to resolve locales.
 *
 * @export
 * @interface LocaleResolveParams
 */
export interface LocaleResolveParams {
  /**
   * A language code (like 'en' for English or 'de' for German)
   *
   * @type {string}
   * @memberof LocaleResolveParams
   */
  languageCode: string;

  /**
   * The base path that will be prepended to the locale file name.
   * It must end with a slash.
   * 
   * For example: './i18n/locales/'
   *
   * @type {string}
   * @memberof LocaleResolveParams
   */
  localeBasePath?: string;

  /**
   * Can be used to override specific methods
   * of a Locale.
   *
   * @type {Partial<Locale>}
   * @memberof LocaleResolveParams
   */
  localeOverride?: Partial<Locale>;
}

/**
 * Asynchronously intitializes an instance of cronstrue.
 * This function makes use of Promise.
 * So keep in mind that your environment must support it.
 *
 * @export
 * @param {LocaleResolveParams[]} [localeResolveParams]
 * @returns an instance of cronstrue
 */
export async function initialize(localeResolveParams?: LocaleResolveParams[]) {
  localeResolveParams = localeResolveParams && localeResolveParams.length > 0
    ? localeResolveParams
    : [{ languageCode: 'en', localeBasePath: LOCALE_BASE_PATH }];
  const asyncLocaleLoadTasks: Promise<{ [name: string]: Locale }>[] = localeResolveParams.map(
    (localeResolveParam) => {
      const localeBasePath = localeResolveParam.localeBasePath || LOCALE_BASE_PATH;
      const languageCode = localeResolveParam.languageCode;
      const localeOverride = localeResolveParam.localeOverride || {};
      return import(`${localeBasePath}${languageCode}`)
        .then((result) => {
          const locale = Object.assign(new result[languageCode](), localeOverride);
          return { [languageCode]: locale };
        }
    )
    }
  );
  const locales = (await Promise.all(asyncLocaleLoadTasks)).reduce((p, c) => ({ ...p, ...c }), {});
  return {
    toString: (
      expression: string,
      {
        throwExceptionOnParseError = true,
        verbose = false,
        dayOfWeekStartIndexZero = true,
        use24HourTimeFormat,
        locale = "en"
      }: Options = {}
    ) => {
      const options = <Options>{
        throwExceptionOnParseError,
        verbose,
        dayOfWeekStartIndexZero,
        use24HourTimeFormat,
        locale
      };
      const descriptor = new ExpressionDescriptor(expression, options, locales);
      return descriptor.getFullDescription();
    }
  }
}
