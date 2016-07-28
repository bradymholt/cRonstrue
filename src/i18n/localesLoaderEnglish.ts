import { Locale } from './locale';
import { en } from './locales/en';

export class LocalesLoaderEnglish {
    init(locales: { [name: string]: Locale }) {
        locales['en'] = new en();
    }
}