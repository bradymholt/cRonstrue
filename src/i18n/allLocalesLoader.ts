import { Locale } from "./locale";
import * as allLocales from "./allLocales";

export class allLocalesLoader {
  load(availableLocales: { [name: string]: Locale }) {
    for (var property in allLocales) {
      if (allLocales.hasOwnProperty(property)) {
        availableLocales[property] = new (allLocales as any)[property]() as Locale;
      }
    }
  }
}
