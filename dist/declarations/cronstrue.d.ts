import { IOptions } from './options';
import { CasingTypeEnum } from './casingTypeEnum';
import { Locale } from './locale/locale';
declare class cronstrue {
    static locales: {
        [name: string]: Locale;
    };
    expression: string;
    parsed: boolean;
    expressionParts: string[];
    options: IOptions;
    specialCharacters: string[];
    i18n: Locale;
    static toString(expression: string, {throwExceptionOnParseError, casingType, verbose, dayOfWeekStartIndexZero, use24HourTimeFormat, locale}?: IOptions): string;
    static initialize(): void;
    constructor(expression: string, options: IOptions);
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
    protected transformCase(description: string, caseType: CasingTypeEnum): string;
}
export = cronstrue;
