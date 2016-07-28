import { Locale } from './locale';
import * as locales from './locales';

export function init(foo: { [name: string]: Locale }) {
    for (var property in locales) {
        if (locales.hasOwnProperty(property)) {
            let locale = new ((locales as any)[property]) as Locale;
            foo[property] = locale;
        }
    }
}