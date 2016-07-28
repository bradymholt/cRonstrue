import { cronstrue } from './cronstrue'
import { LocalesLoaderAll } from './i18n/localesLoaderAll'

cronstrue.initialize(new LocalesLoaderAll());

export = cronstrue;