import { Cronstrue } from "./cronstrue"
import { enLocaleLoader } from "./i18n/enLocaleLoader"

Cronstrue.initialize(new enLocaleLoader());

export = Cronstrue;
