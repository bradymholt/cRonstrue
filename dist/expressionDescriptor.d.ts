import { Options } from "./options";
import { Locale } from "./i18n/locale";
import { LocaleLoader } from "./i18n/localeLoader";
export declare class ExpressionDescriptor {
    static locales: {
        [name: string]: Locale;
    };
    static specialCharacters: string[];
    expression: string;
    expressionParts: string[];
    options: Options;
    i18n: Locale;
    static toString(expression: string, {throwExceptionOnParseError, verbose, dayOfWeekStartIndexZero, use24HourTimeFormat, locale}?: Options): string;
    static initialize(localesLoader: LocaleLoader): void;
    constructor(expression: string, options: Options);
    protected getFullDescription(): string;
    protected getTimeOfDayDescription(): string;
    protected getSecondsDescription(): string;
    protected getMinutesDescription(): string;
    protected getHoursDescription(): string;
    protected getDayOfWeekDescription(): string;
    protected getMonthDescription(): string;
    protected getDayOfMonthDescription(): string;
    protected getYearDescription(): string;
    protected getSegmentDescription(expression: string, allDescription: string, getSingleItemDescription: (t: string) => string, getIntervalDescriptionFormat: (t: string) => string, getBetweenDescriptionFormat: (t: string) => string, getDescriptionFormat: (t: string) => string): string;
    protected generateBetweenSegmentDescription(betweenExpression: string, getBetweenDescriptionFormat: (t: string) => string, getSingleItemDescription: (t: string) => string): string;
    protected formatTime(hourExpression: string, minuteExpression: string, secondExpression: string): string;
    protected transformVerbosity(description: string, useVerboseFormat: boolean): string;
}
