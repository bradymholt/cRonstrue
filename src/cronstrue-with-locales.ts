import { cronstrue } from './cronstrue'
import { allLocalesLoader } from './i18n/allLocalesLoader'

cronstrue.initialize(new allLocalesLoader());

export = cronstrue;
