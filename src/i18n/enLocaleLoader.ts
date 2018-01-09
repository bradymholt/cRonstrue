import { Locale } from "./locale";
import { en } from "./locales/en";

export class enLocaleLoader {
  load(availableLocales: { [name: string]: Locale }) {
    availableLocales["en"] = new en();
  }
}
