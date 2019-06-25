// Danish

import { Locale } from "../locale";
export class da implements Locale {
  use24HourTimeFormatByDefault() {
    return true;
  }
  anErrorOccuredWhenGeneratingTheExpressionD() {
    return "Der opstod en fejl ved generering af udtryksbeskrivelsen. Tjek cron-ekspressionssyntaxen.";
  }
  at() {
    return "kl";
  }
  atSpace() {
    return "kl ";
  }
  atX0() {
    return "kl %s";
  }
  atX0MinutesPastTheHour() {
    return "%s minutter efter timeskift";
  }
  atX0SecondsPastTheMinute() {
    return "%s sekunder efter minutskift";
  }
  betweenX0AndX1() {
    return "mellem %s og %s";
  }
  commaBetweenDayX0AndX1OfTheMonth() {
    return ", mellem dag %s og %s i måneden";
  }
  commaEveryDay() {
    return ", hver dag";
  }
  commaEveryX0Days() {
    return ", hver %s. dag";
  }
  commaEveryX0DaysOfTheWeek() {
    return ", hver %s. ugedag";
  }
  commaEveryX0Months() {
    return ", hver %s. måned";
  }
  commaEveryX0Years() {
    return ", hvert %s. år";
  }
  commaOnDayX0OfTheMonth() {
    return ", på dag %s i måneden";
  }
  commaOnlyInX0() {
    return ", kun i %s";
  }
  commaOnlyOnX0() {
    return ", kun på %s";
  }
  commaAndOnX0() {
    return ", og på %s";
  }
  commaOnThe() {
    return ", på den ";
  }
  commaOnTheLastDayOfTheMonth() {
    return ", på den sidste dag i måneden";
  }
  commaOnTheLastWeekdayOfTheMonth() {
    return ", på den sidste hverdag i måneden";
  }
  commaDaysBeforeTheLastDayOfTheMonth() {
    return ", %s dage før den sidste dag i måneden";
  }
  commaOnTheLastX0OfTheMonth() {
    return ", på den sidste %s i måneden";
  }
  commaOnTheX0OfTheMonth() {
    return ", på den %s i måneden";
  }
  commaX0ThroughX1() {
    return ", %s til og med %s";
  }
  everyHour() {
    return "hver time";
  }
  everyMinute() {
    return "hvert minut";
  }
  everyMinuteBetweenX0AndX1() {
    return "hvert minut mellem %s og %s";
  }
  everySecond() {
    return "hvert sekund";
  }
  everyX0Hours() {
    return "hver %s. time";
  }
  everyX0Minutes() {
    return "hvert %s. minut";
  }
  everyX0Seconds() {
    return "hvert %s. sekund";
  }
  fifth() {
    return "femte";
  }
  first() {
    return "første";
  }
  firstWeekday() {
    return "første hverdag";
  }
  fourth() {
    return "fjerde";
  }
  minutesX0ThroughX1PastTheHour() {
    return "minutterne fra %s til og med %s hver time";
  }
  second() {
    return "anden";
  }
  secondsX0ThroughX1PastTheMinute() {
    return "sekunderne fra %s til og med %s hvert minut";
  }
  spaceAnd() {
    return " og";
  }
  spaceX0OfTheMonth() {
    return " %s i måneden";
  }
  lastDay() {
    return "sidste dag";
  }
  third() {
    return "tredje";
  }
  weekdayNearestDayX0() {
    return "hverdag nærmest dag %s";
  }
  commaMonthX0ThroughMonthX1():string {
    return null;
  }
  commaYearX0ThroughYearX1():string {
    return null;
  }
  atX0MinutesPastTheHourGt20():string {
    return null;
  }
  atX0SecondsPastTheMinuteGt20():string {
    return null;
  }
  commaStartingX0() {
    return ", startende %s";
  }
  daysOfTheWeek() {
    return ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"];
  }
  monthsOfTheYear() {
    return [
      "januar",
      "februar",
      "marts",
      "april",
      "maj",
      "juni",
      "juli",
      "august",
      "september",
      "oktober",
      "november",
      "december"
    ];
  }
}
