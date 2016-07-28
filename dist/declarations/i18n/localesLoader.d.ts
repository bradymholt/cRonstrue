import { Locale } from './locale';
export interface LocalesLoader {
    init(locales: {
        [name: string]: Locale;
    }): void;
}
