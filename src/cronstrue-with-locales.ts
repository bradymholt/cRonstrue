import { Cronstrue } from './cronstrue'
import { allLocalesLoader } from './i18n/allLocalesLoader'

Cronstrue.initialize(new allLocalesLoader());

export = Cronstrue;
