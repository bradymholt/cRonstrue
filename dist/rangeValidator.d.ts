export default class RangeValidator {
    static secondRange(parse: string): void;
    static minuteRange(parse: string): void;
    static hourRange(parse: string): void;
    static dayOfMonthRange(parse: string): void;
    static monthRange(parse: string, monthStartIndexZero: boolean): void;
    static dayOfWeekRange(parse: string, dayOfWeekStartIndexZero: boolean): void;
}
