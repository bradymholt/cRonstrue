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
  everyX0Seconds(): string;
  secondsX0ThroughX1PastTheMinute(): string;
  atX0SecondsPastTheMinute(): string;
  atX0SecondsPastTheMinuteGt20(): string; //optional
  everyX0Minutes(): string;
  minutesX0ThroughX1PastTheHour(): string;
  atX0MinutesPastTheHour(): string;
  atX0MinutesPastTheHourGt20(): string; //optional
  everyX0Hours(): string;
  betweenX0AndX1(): string;
  atX0(): string;
  commaEveryDay(): string;
  commaEveryX0DaysOfTheWeek(): string;
  commaX0ThroughX1(): string;
  commaMonthX0ThroughMonthX1(): string; //optional
  commaYearX0ThroughYearX1(): string; //optional
  first(): string;
  second(): string;
  third(): string;
  fourth(): string;
  fifth(): string;
  commaOnThe(): string;
  spaceX0OfTheMonth(): string;
  lastDay(): string;
  commaOnTheLastX0OfTheMonth(): string;
  commaOnlyOnX0(): string;
  commaAndOnX0(): string;
  commaEveryX0Months(): string;
  commaOnlyInX0(): string;
  commaOnlyInMonthX0?(): string;
  commaOnlyInYearX0?(): string;
  commaOnTheLastDayOfTheMonth(): string;
  commaOnTheLastWeekdayOfTheMonth(): string;
  commaDaysBeforeTheLastDayOfTheMonth():string;
  firstWeekday(): string;
  weekdayNearestDayX0(): string;
  commaOnTheX0OfTheMonth(): string;
  commaEveryX0Days(): string;
  commaBetweenDayX0AndX1OfTheMonth(): string;
  commaOnDayX0OfTheMonth(): string;
  commaEveryX0Years(): string;
  commaStartingX0(): string;
  dayX0?(): string;
  daysOfTheWeek(): string[];
  monthsOfTheYear(): string[];
}
