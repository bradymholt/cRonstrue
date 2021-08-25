export declare class CronParser {
    expression: string;
    dayOfWeekStartIndexZero: boolean;
    monthStartIndexZero: boolean;
    constructor(expression: string, dayOfWeekStartIndexZero?: boolean, monthStartIndexZero?: boolean);
    parse(): string[];
    protected extractParts(expression: string): string[];
    protected normalize(expressionParts: string[]): void;
    protected validate(parsed: string[]): void;
    protected validateRange(parsed: string[]): void;
    protected assertNoInvalidCharacters(partDescription: string, expression: string): void;
}
