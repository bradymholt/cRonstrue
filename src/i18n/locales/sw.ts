// Kiswahili

import { Locale } from "../locale";
export class sw implements Locale {
  atX0SecondsPastTheMinuteGt20(): string {
    return null;
  }
  atX0MinutesPastTheHourGt20(): string {
    return null;
  }
  commaMonthX0ThroughMonthX1(): string {
    return null;
  }
  commaYearX0ThroughYearX1(): string {
    return null;
  }

  use24HourTimeFormatByDefault() {
    return false;
  }

  anErrorOccuredWhenGeneratingTheExpressionD() {
    return "Kuna tatizo wakati wa kutunga msemo. Angalia cron expression syntax.";
  }
  everyMinute() {
    return "kila dakika";
  }
  everyHour() {
    return "kila saa";
  }
  atSpace() {
    return "Kwa ";
  }
  everyMinuteBetweenX0AndX1() {
    return "Kila dakika kwanzia %s hadi %s";
  }
  at() {
    return "Kwa";
  }
  spaceAnd() {
    return " na";
  }
  everySecond() {
    return "kila sekunde";
  }
  everyX0Seconds() {
    return "kila sekunde %s";
  }
  secondsX0ThroughX1PastTheMinute() {
    return "sekunde ya %s hadi %s baada ya dakika";
  }
  atX0SecondsPastTheMinute() {
    return "at %s seconds past the minute";
    return "sekunde %s baada ya dakika";
  }
  everyX0Minutes() {
    return "kila dakika %s";
  }
  minutesX0ThroughX1PastTheHour() {
    return "minutes %s through %s past the hour";
  }
  atX0MinutesPastTheHour() {
    return "at %s minutes past the hour";
  }
  everyX0Hours() {
    return "every %s hours";
  }
  betweenX0AndX1() {
    return "kati ya %s na %s";
  }
  atX0() {
    return "kwenye %s";
  }
  commaEveryDay() {
    return ", kila siku";
  }
  commaEveryX0DaysOfTheWeek() {
    return ", kila siku %s ya wiki";
  }
  commaX0ThroughX1() {
    return ", %s hadi %s";
  }
  first() {
    return "ya kwanza";
  }
  second() {
    return "ya pili";
  }
  third() {
    return "ya tatu";
  }
  fourth() {
    return "ya nne";
  }
  fifth() {
    return "ya tano";
  }
  commaOnThe() {
    return ", kwenye ";
  }
  spaceX0OfTheMonth() {
    return " siku %s ya mwezi";
  }
  lastDay() {
    return "siku ya mwisho";
  }
  commaOnTheLastX0OfTheMonth() {
    return ", siku ya %s ya mwezi";
  }
  commaOnlyOnX0() {
//    return ", only on %s";
    return ", kwa %s tu";
  }
  commaAndOnX0(){
    return ", na pia %s";
  }
  commaEveryX0Months() {
    return ", kila mwezi wa %s";
  }
  commaOnlyInX0() {
//    return ", only in %s";
    return ", kwa %s tu";
  }
  commaOnTheLastDayOfTheMonth() {
    return ", siku ya mwisho wa mwezi";
  }
  commaOnTheLastWeekdayOfTheMonth() {
    return ", wikendi ya mwisho wa mwezi";
  }
  commaDaysBeforeTheLastDayOfTheMonth(){
    return ", siku ya %s kabla ya siku ya mwisho wa mwezi"
  }
  firstWeekday() {
    return "siku za kazi ya kwanza";
  }
  weekdayNearestDayX0() {
    return "siku ya kazi karibu na siku ya %s";
  }
  commaOnTheX0OfTheMonth() {
    return ", siku ya %s ya mwezi";
  }
  commaEveryX0Days() {
    return ", kila siku %s";
  }
  commaBetweenDayX0AndX1OfTheMonth() {
    return ", kati ya siku %s na %s ya mwezi";
  }
  commaOnDayX0OfTheMonth() {
    return ", siku ya %s ya mwezi";
  }
  commaEveryX0Years() {
    return ", kila miaka %s";
  }
  commaStartingX0() {
    return ", kwanzia %s";
  }
  daysOfTheWeek() {
    return ["Jumapili", "Jumatatu", "Jumanne", "Jumatano", "Alhamisi", "Ijumaa", "Jumamosi"];
  }
  monthsOfTheYear() {
    return [
      "Januari",
      "Februari",
      "Machi",
      "Aprili",
      "Mei",
      "Juni",
      "Julai",
      "Agosti",
      "Septemba",
      "Oktoba",
      "Novemba",
      "Desemba"
    ];
  }
}
