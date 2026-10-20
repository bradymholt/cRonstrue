// English

import { Locale } from "../locale";

// A count of 1 takes the singular unit. A list like "1,15" is not a number, so it stays plural.
const isOne = (s?: string) => Number(s) === 1;

export class en implements Locale {
  atX0SecondsPastTheMinuteGt20(): string|null {
    return null;
  }
  atX0MinutesPastTheHourGt20(): string|null {
    return null;
  }
  commaMonthX0ThroughMonthX1(): string|null {
    return null;
  }
  commaYearX0ThroughYearX1(): string|null {
    return null;
  }

  use24HourTimeFormatByDefault() {
    return false;
  }

  anErrorOccuredWhenGeneratingTheExpressionD() {
    return "An error occurred when generating the expression description. Check the cron expression syntax.";
  }
  everyMinute() {
    return "every minute";
  }
  everyHour() {
    return "every hour";
  }
  atSpace() {
    return "At ";
  }
  everyMinuteBetweenX0AndX1() {
    return "Every minute between %s and %s";
  }
  at() {
    return "At";
  }
  spaceAnd() {
    return " and";
  }
  everySecond() {
    return "every second";
  }
  everyX0Seconds(s?: string) {
    return isOne(s) ? "every %s second" : "every %s seconds";
  }
  secondsX0ThroughX1PastTheMinute() {
    return "seconds %s through %s past the minute";
  }
  atX0SecondsPastTheMinute(s?: string) {
    return isOne(s) ? "at %s second past the minute" : "at %s seconds past the minute";
  }
  everyX0Minutes(s?: string) {
    return isOne(s) ? "every %s minute" : "every %s minutes";
  }
  minutesX0ThroughX1PastTheHour() {
    return "minutes %s through %s past the hour";
  }
  atX0MinutesPastTheHour(s?: string) {
    return isOne(s) ? "at %s minute past the hour" : "at %s minutes past the hour";
  }
  everyX0Hours(s?: string) {
    return isOne(s) ? "every %s hour" : "every %s hours";
  }
  betweenX0AndX1() {
    return "between %s and %s";
  }
  atX0() {
    return "at %s";
  }
  commaEveryDay() {
    return ", every day";
  }
  commaEveryX0DaysOfTheWeek() {
    return ", every %s days of the week";
  }
  commaAndEveryX0DaysOfTheWeek() {
    return ", and every %s days of the week";
  }
  commaX0ThroughX1() {
    return ", %s through %s";
  }
  commaAndX0ThroughX1() {
    return ", and %s through %s";
  }
  first() {
    return "first";
  }
  second() {
    return "second";
  }
  third() {
    return "third";
  }
  fourth() {
    return "fourth";
  }
  fifth() {
    return "fifth";
  }
  commaOnThe() {
    return ", on the ";
  }
  spaceX0OfTheMonth() {
    return " %s of the month";
  }
  lastDay() {
    return "the last day";
  }
  commaOnTheLastX0OfTheMonth() {
    return ", on the last %s of the month";
  }
  commaOnlyOnX0() {
    return ", only on %s";
  }
  commaAndOnX0() {
    return ", and on %s";
  }
  commaEveryX0Months() {
    return ", every %s months";
  }
  commaOnlyInX0() {
    return ", only in %s";
  }
  commaOnTheLastDayOfTheMonth() {
    return ", on the last day of the month";
  }
  commaOnTheLastWeekdayOfTheMonth() {
    return ", on the last weekday of the month";
  }
  commaDaysBeforeTheLastDayOfTheMonth(s?: string) {
    return isOne(s) ? ", %s day before the last day of the month" : ", %s days before the last day of the month";
  }
  firstWeekday() {
    return "first weekday";
  }
  weekdayNearestDayX0() {
    return "weekday nearest day %s";
  }
  commaOnTheX0OfTheMonth() {
    return ", on the %s of the month";
  }
  commaDaysBeforeTheX0OfTheMonth(s?: string) {
    return isOne(s) ? ", %s day before the %s of the month" : ", %s days before the %s of the month";
  }
  commaDaysAfterTheX0OfTheMonth(s?: string) {
    return isOne(s) ? ", %s day after the %s of the month" : ", %s days after the %s of the month";
  }
  commaEveryX0Days() {
    return ", every %s days in a month";
  }
  commaBetweenDayX0AndX1OfTheMonth() {
    return ", between day %s and %s of the month";
  }
  commaOnDayX0OfTheMonth() {
    return ", on day %s of the month";
  }
  commaEveryHour() {
    return ", every hour";
  }
  commaEveryX0Years(s?: string) {
    return isOne(s) ? ", every %s year" : ", every %s years";
  }
  commaStartingX0() {
    return ", starting %s";
  }
  daysOfTheWeek() {
    return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  }
  monthsOfTheYear() {
    return [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
  }

  atReboot() {
    return "Run once, at startup";
  }

  onTheHour() {
    return "on the hour";
  }
}
