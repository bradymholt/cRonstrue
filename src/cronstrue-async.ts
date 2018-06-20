import { ExpressionDescriptor } from "./expressionDescriptor";
import { Locale } from "./i18n/locale";

export async function initialize(locales?: string[]) {
  locales = locales && locales.length > 0 ? locales : ['en'];
  const loadJobs: Promise<{ [name: string]: Locale }>[] = locales.map(
    locale => import(`./i18n/locales/${locale}`).then((result) => {
      return { [locale]: result[locale] };
    }).catch(err => {
      console.error(err);
      return { };
    })
  );
  const allLocales = (await Promise.all(loadJobs)).reduce((p, c) => ({ ...p, ...c }), {});
  ExpressionDescriptor.initialize({
    load: (availableLocales: { [name: string]: Locale }) => {
      for (var property in allLocales) {
        if (allLocales.hasOwnProperty(property)) {
          availableLocales[property] = new (allLocales as any)[property]() as Locale;
        }
      }
    }
  });
  return { toString: ExpressionDescriptor.toString };
}
