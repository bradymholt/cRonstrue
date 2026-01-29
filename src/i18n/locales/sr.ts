// Serbian

import { Locale } from "../locale";

export class sr implements Locale {
  use24HourTimeFormatByDefault() {
    return true;
  }

  anErrorOccuredWhenGeneratingTheExpressionD() {
    return "Došlo je do greške pri generisanju izraza. Proverite sintaksu cron izraza.";
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
    return "u %s minuta posle punog sata";
  }

  atX0SecondsPastTheMinute() {
    return "u %s sekundi posle pune minute";
  }

  betweenX0AndX1() {
    return "između %s i %s";
  }

  commaBetweenDayX0AndX1OfTheMonth() {
    return ", između %s. i %s. dana u mesecu";
  }

  commaEveryDay() {
    return ", svaki dan";
  }

  commaEveryX0Days() {
    return ", svakih %s dana";
  }

  commaEveryX0DaysOfTheWeek() {
    return ", svakih %s dana u nedelji";
  }

  commaEveryX0Months() {
    return ", svakih %s meseci";
  }

  commaEveryX0Years() {
    return ", svakih %s godina";
  }

  commaOnDayX0OfTheMonth() {
    return ", %s. dan u mesecu";
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
    return ", poslednjeg dana u mesecu";
  }

  commaOnTheLastWeekdayOfTheMonth() {
    return ", poslednjeg radnog dana u mesecu";
  }

  commaDaysBeforeTheLastDayOfTheMonth() {
    return ", %s dana pre kraja meseca";
  }

  commaOnTheLastX0OfTheMonth() {
    return ", poslednji %s u mesecu";
  }

  commaOnTheX0OfTheMonth() {
    return ", %s u mesecu";
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
    return "svakog minuta";
  }

  everyMinuteBetweenX0AndX1() {
    return "Svakog minuta između %s i %s";
  }

  everySecond() {
    return "svake sekunde";
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
    return "minute od %s do %s posle punog sata";
  }

  second() {
    return "drugi";
  }

  secondsX0ThroughX1PastTheMinute() {
    return "sekunde od %s do %s posle pune minute";
  }

  spaceAnd() {
    return " i";
  }

  spaceX0OfTheMonth() {
    return " %s u mesecu";
  }

  lastDay() {
    return "poslednji dan";
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
      "Nedelja",
      "Ponedeljak",
      "Utorak",
      "Sreda",
      "Četvrtak",
      "Petak",
      "Subota",
    ];
  }

  monthsOfTheYear() {
    return [
      "januar",
      "februar",
      "mart",
      "april",
      "maj",
      "jun",
      "jul",
      "avgust",
      "septembar",
      "oktobar",
      "novembar",
      "decembar",
    ];
  }

  onTheHour() {
    return "u pun sat";
  }
}
