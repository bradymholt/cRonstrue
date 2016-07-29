import { cronstrue } from './cronstrue'
import { enLocaleLoader } from './i18n/enLocaleLoader'

cronstrue.initialize(new enLocaleLoader());

export = cronstrue;
