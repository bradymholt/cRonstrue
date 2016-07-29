export interface Locale {
    // TODO: Circle back and use null/undefined aware types for optionals below in TypeScript 2.0: https://github.com/Microsoft/TypeScript/pull/7140
    // TODO: These locale translations would be a good use for ES6 template strings except we sometimes concatenate multiple transactions together before
    //       doing the actual template replacement.

    AnErrorOccuredWhenGeneratingTheExpressionD(): string;
    EveryMinute(): string;
    EveryHour(): string;
    AtSpace(): string;
    EveryMinuteBetweenX0AndX1(): string;
    At(): string;
    SpaceAnd(): string;
    EverySecond(): string;
    EveryX0Seconds(): string;
    SecondsX0ThroughX1PastTheMinute(): string;
    AtX0SecondsPastTheMinute(): string;
    AtX0SecondsPastTheMinuteGt20(): string; //optional
    EveryX0Minutes(): string;
    MinutesX0ThroughX1PastTheHour(): string;
    AtX0MinutesPastTheHour(): string;
    AtX0MinutesPastTheHourGt20(): string; //optional
    EveryX0Hours(): string;
    BetweenX0AndX1(): string;
    AtX0(): string;
    ComaEveryDay(): string;
    ComaEveryX0DaysOfTheWeek(): string;
    ComaX0ThroughX1(): string;
    ComaMonthX0ThroughMonthX1(): string //optional
    ComaYearX0ThroughYearX1(): string //optional
    First(): string;
    Second(): string;
    Third(): string;
    Forth(): string;
    Fifth(): string;
    ComaOnThe(): string;
    SpaceX0OfTheMonth(): string;
    ComaOnTheLastX0OfTheMonth(): string;
    ComaOnlyOnX0(): string;
    ComaEveryX0Months(): string;
    ComaOnlyInX0(): string;
    ComaOnTheLastDayOfTheMonth(): string;
    ComaOnTheLastWeekdayOfTheMonth(): string;
    FirstWeekday(): string;
    WeekdayNearestDayX0(): string;
    ComaOnTheX0OfTheMonth(): string;
    ComaEveryX0Days(): string;
    ComaBetweenDayX0AndX1OfTheMonth(): string;
    ComaOnDayX0OfTheMonth(): string;
    SpaceAndSpace(): string;
    ComaEveryMinute(): string;
    ComaEveryHour(): string;
    ComaEveryX0Years(): string;
    CommaStartingX0(): string;
}
