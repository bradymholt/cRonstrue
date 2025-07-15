// Croatian

import { Locale } from "../locale";

export class hr implements Locale {
  use24HourTimeFormatByDefault() {
    return true;
  }

  anErrorOccuredWhenGeneratingTheExpressionD() {
    return "Došlo je do pogreške pri generiranju izraza. Provjerite sintaksu cron izraza.";
  }

  at() {
    return "U";
  }

  atSpace() {
    return "U ";
  }

  atX0() {
    return "u %s";
  }

  atX0MinutesPastTheHour() {
    return "u %s minuta nakon punog sata";
  }

  atX0SecondsPastTheMinute() {
    return "u %s sekundi nakon pune minute";
  }

  betweenX0AndX1() {
    return "između %s i %s";
  }

  commaBetweenDayX0AndX1OfTheMonth() {
    return ", između %s. i %s. dana u mjesecu";
  }

  commaEveryDay() {
    return ", svaki dan";
  }

  commaEveryX0Days() {
    return ", svakih %s dana";
  }

  commaEveryX0DaysOfTheWeek() {
    return ", svakih %s dana u tjednu";
  }

  commaEveryX0Months() {
    return ", svakih %s mjeseci";
  }

  commaEveryX0Years() {
    return ", svakih %s godina";
  }

  commaOnDayX0OfTheMonth() {
    return ", %s. dan u mjesecu";
  }

  commaOnlyInX0() {
    return ", samo u %s";
  }

  commaOnlyOnX0() {
    return ", samo %s";
  }

  commaAndOnX0() {
    return ", i %s";
  }

  commaOnThe() {
    return ", ";
  }

  commaOnTheLastDayOfTheMonth() {
    return ", zadnji dan u mjesecu";
  }

  commaOnTheLastWeekdayOfTheMonth() {
    return ", zadnji radni dan u mjesecu";
  }

  commaDaysBeforeTheLastDayOfTheMonth() {
    return ", %s dana prije kraja mjeseca";
  }

  commaOnTheLastX0OfTheMonth() {
    return ", zadnji %s u mjesecu";
  }

  commaOnTheX0OfTheMonth() {
    return ", %s u mjesecu";
  }

  commaX0ThroughX1() {
    return ", od %s do %s";
  }

  commaAndX0ThroughX1() {
    return ", i od %s do %s";
  }

  everyHour() {
    return "svaki sat";
  }

  everyMinute() {
    return "svaku minutu";
  }

  everyMinuteBetweenX0AndX1() {
    return "Svaku minutu između %s i %s";
  }

  everySecond() {
    return "svaku sekundu";
  }

  everyX0Hours() {
    return "svakih %s sati";
  }

  everyX0Minutes() {
    return "svakih %s minuta";
  }

  everyX0Seconds() {
    return "svakih %s sekundi";
  }

  fifth() {
    return "peti";
  }

  first() {
    return "prvi";
  }

  firstWeekday() {
    return "prvi radni dan";
  }

  fourth() {
    return "četvrti";
  }

  minutesX0ThroughX1PastTheHour() {
    return "minute od %s do %s nakon punog sata";
  }

  second() {
    return "drugi";
  }

  secondsX0ThroughX1PastTheMinute() {
    return "sekunde od %s do %s nakon pune minute";
  }

  spaceAnd() {
    return " i";
  }

  spaceX0OfTheMonth() {
    return " %s u mjesecu";
  }

  lastDay() {
    return "zadnji dan";
  }

  third() {
    return "treći";
  }

  weekdayNearestDayX0() {
    return "radni dan najbliži %s. danu";
  }

  commaMonthX0ThroughMonthX1(): string | null {
    return null;
  }

  commaYearX0ThroughYearX1(): string | null {
    return null;
  }

  atX0MinutesPastTheHourGt20(): string | null {
    return null;
  }

  atX0SecondsPastTheMinuteGt20(): string | null {
    return null;
  }

  commaStartingX0() {
    return ", počevši od %s";
  }

  daysOfTheWeek() {
    return [
      "Nedjelja",
      "Ponedjeljak",
      "Utorak",
      "Srijeda",
      "Četvrtak",
      "Petak",
      "Subota",
    ];
  }

  monthsOfTheYear() {
    return [
      "siječanj",
      "veljača",
      "ožujak",
      "travanj",
      "svibanj",
      "lipanj",
      "srpanj",
      "kolovoz",
      "rujan",
      "listopad",
      "studeni",
      "prosinac",
    ];
  }
}
