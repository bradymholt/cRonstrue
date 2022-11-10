export interface Locale {
  // TODO: Circle back and use null/undefined aware types for optionals below in TypeScript 2.0: https://github.com/Microsoft/TypeScript/pull/7140
  // TODO: These locale translations would be a good use for ES6 template strings except we sometimes concatenate multiple transactions together before
  //       doing the actual template replacement.

  setPeriodBeforeTime?(): boolean;
  pm?(): string;
  am?(): string;
  use24HourTimeFormatByDefault(): boolean;
  anErrorOccuredWhenGeneratingTheExpressionD(): string;
  everyMinute(): string;
  everyHour(): string;
  atSpace(): string;
  everyMinuteBetweenX0AndX1(): string;
  at(): string;
  spaceAnd(): string;
  everySecond(): string;
  everyX0Seconds(s?: string): string;
  secondsX0ThroughX1PastTheMinute(): string;
  atX0SecondsPastTheMinute(s?: string): string;
  atX0SecondsPastTheMinuteGt20(): string | null; // optional
  everyX0Minutes(s?: string): string;
  minutesX0ThroughX1PastTheHour(): string;
  atX0MinutesPastTheHour(s?: string): string;
  atX0MinutesPastTheHourGt20(): string | null; // optional
  everyX0Hours(s?: string): string;
  betweenX0AndX1(): string;
  atX0(): string;
  commaEveryDay(): string;
  commaEveryX0DaysOfTheWeek(s?: string): string;
  commaX0ThroughX1(s?: string): string;
  commaAndX0ThroughX1(s?: string): string;
  commaMonthX0ThroughMonthX1(): string | null; // optional
  commaYearX0ThroughYearX1(): string | null; // optional
  first(s?: string): string;
  second(s?: string): string;
  third(s?: string): string;
  fourth(s?: string): string;
  fifth(s?: string): string;
  commaOnThe(s?: string): string;
  spaceX0OfTheMonth(): string;
  lastDay(): string;
  commaOnTheLastX0OfTheMonth(s?: string): string;
  commaOnlyOnX0(s?: string): string;
  commaAndOnX0(): string;
  commaEveryX0Months(s?: string): string;
  commaOnlyInX0(): string;
  commaOnlyInMonthX0?(): string;
  commaOnlyInYearX0?(): string;
  commaOnTheLastDayOfTheMonth(): string;
  commaOnTheLastWeekdayOfTheMonth(): string;
  commaDaysBeforeTheLastDayOfTheMonth(s?: string): string;
  firstWeekday(): string;
  weekdayNearestDayX0(): string;
  commaOnTheX0OfTheMonth(): string;
  commaEveryX0Days(s?: string): string;
  commaBetweenDayX0AndX1OfTheMonth(s?: string): string;
  commaOnDayX0OfTheMonth(s?: string): string;
  commaEveryX0Years(s?: string): string;
  commaStartingX0(): string;
  dayX0?(): string;
  daysOfTheWeek(): string[];
  /** If multiple forms are needed in "%s through %s"
   * @param f 1 for "from", 2 for "through"
   * @return {string[]} days of week
   */
  daysOfTheWeekInCase?(f?: number): string[];
  monthsOfTheYear(): string[];
  /** If multiple forms are needed in "%s through %s"
   * @param f 1 for "from", 2 for "through"
   * @return {string[]} months of year
   */
  monthsOfTheYearInCase?(f?: number): string[];
}
