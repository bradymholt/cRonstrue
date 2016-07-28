import { cronstrue } from './cronstrue'
import { LocalesLoaderEnglish } from './i18n/localesLoaderEnglish'

cronstrue.initialize(new LocalesLoaderEnglish());

export = cronstrue;