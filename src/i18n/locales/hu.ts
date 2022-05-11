// Hungarian


import { Locale } from "../locale";
export class hu implements Locale {
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
    return "Hiba történt a kifejezésleírás generálásakor. Ellenőrizze a cron kifejezés szintaxisát.";
  }
  everyMinute() {
    return "minden percben";
  }
  everyHour() {
    return "minden órában";
  }
  atSpace() {
    return "At ";
  }
  everyMinuteBetweenX0AndX1() {
    return "Percenként %s és %s között";
  }
  at() {
    return "At";
  }
  spaceAnd() {
    return " és";
  }
  everySecond() {
    return "minden másodpercben";
  }
  everyX0Seconds() {
    return "minden %s másodpercben";
  }
  secondsX0ThroughX1PastTheMinute() {
    return "seconds %s through %s past the minute";
  }
  atX0SecondsPastTheMinute() {
    return "at %s seconds past the minute";
  }
  everyX0Minutes() {
    return "minden %s percben";
  }
  minutesX0ThroughX1PastTheHour() {
    return "minutes %s through %s past the hour";
  }
  atX0MinutesPastTheHour() {
    return "at %s minutes past the hour";
  }
  everyX0Hours() {
    return "minden %s órában";
  }
  betweenX0AndX1() {
    return "%s és %s között";
  }
  atX0() {
    return "at %s";
  }
  commaEveryDay() {
    return ", minden nap";
  }
  commaEveryX0DaysOfTheWeek() {
    return ", a hét minden %s napján";
  }
  commaX0ThroughX1() {
    return ", %s through %s";
  }
  first() {
    return "első";
  }
  second() {
    return "második";
  }
  third() {
    return "harmadik";
  }
  fourth() {
    return "negyedik";
  }
  fifth() {
    return "ötödik";
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
    return ", minden %s hónapban";
  }
  commaOnlyInX0() {
    return ", only in %s";
  }
  commaOnTheLastDayOfTheMonth() {
    return ", a hónap utolsó napján";
  }
  commaOnTheLastWeekdayOfTheMonth() {
    return ", a hónap utolsó hétköznapján";
  }
  commaDaysBeforeTheLastDayOfTheMonth() {
    return ", %s nappal a hónap utolsó napja előtt";
  }
  firstWeekday() {
    return "első hétköznap";
  }
  weekdayNearestDayX0() {
    return "weekday nearest day %s";
  }
  commaOnTheX0OfTheMonth() {
    return ", on the %s of the month";
  }
  commaEveryX0Days() {
    return ", %s naponként";
  }
  commaBetweenDayX0AndX1OfTheMonth() {
    return ", between day %s and %s of the month";
  }
  commaOnDayX0OfTheMonth() {
    return ", on day %s of the month";
  }
  commaEveryHour() {
    return ", minden órában";
  }
  commaEveryX0Years() {
    return ", %s évente";
  }
  commaStartingX0() {
    return ", starting %s";
  }
  daysOfTheWeek() {
    return ["vasárnap", "hétfő", "kedd", "szerda", "csütörtök", "péntek", "szombat"];
  }
  monthsOfTheYear() {
    return [
      "január",
      "február",
      "március",
      "április",
      "május",
      "június",
      "július",
      "augusztus",
      "szeptember",
      "október",
      "november",
      "december",
    ];
  }
}
