export declare class CronParser {
    expression: string;
    dayOfWeekStartIndexZero: boolean;
    constructor(expression: string, dayOfWeekStartIndexZero?: boolean);
    parse(): string[];
    protected normalizeExpression(expressionParts: string[]): void;
}
