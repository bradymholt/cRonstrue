export declare class CronParser {
    expression: string;
    dayOfWeekStartIndexZero: boolean;
    constructor(expression: string, dayOfWeekStartIndexZero?: boolean);
    parse(): string[];
    protected extractParts(expression: string): string[];
    protected normalize(expressionParts: string[]): void;
    protected validate(parsed: string[]): void;
    protected assertNoInvalidCharacters(partDescription: string, expression: string): void;
}
