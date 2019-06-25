// Polish

import { Locale } from "../locale";
export class pl implements Locale {
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
    return true;
  }
  anErrorOccuredWhenGeneratingTheExpressionD() {
    return "Wystąpił błąd podczas generowania opisu wyrażenia cron. Sprawdź składnię wyrażenia cron.";
  }
  at() {
    return "O";
  }
  atSpace() {
    return "O ";
  }
  atX0() {
    return "o %s";
  }
  atX0MinutesPastTheHour() {
    return "w %s minucie";
  }
  atX0SecondsPastTheMinute() {
    return "w %s sekundzie";
  }
  betweenX0AndX1() {
    return "od %s do %s";
  }
  commaBetweenDayX0AndX1OfTheMonth() {
    return ", od %s-ego do %s-ego dnia miesiąca";
  }
  commaEveryDay() {
    return ", co dzień";
  }
  commaEveryX0Days() {
    return ", co %s dni";
  }
  commaEveryX0DaysOfTheWeek() {
    return ", co %s dni tygodnia";
  }
  commaEveryX0Months() {
    return ", co %s miesięcy";
  }
  commaEveryX0Years() {
    return ", co %s lat";
  }
  commaOnDayX0OfTheMonth() {
    return ", %s-ego dnia miesiąca";
  }
  commaOnlyInX0() {
    return ", tylko %s";
  }
  commaOnlyOnX0() {
    return ", tylko %s";
  }
  commaAndOnX0(){
    return ", i %s";
  }
  commaOnThe() {
    return ", ";
  }
  commaOnTheLastDayOfTheMonth() {
    return ", ostatni dzień miesiąca";
  }
  commaOnTheLastWeekdayOfTheMonth() {
    return ", ostatni dzień roboczy miesiąca";
  }
  commaDaysBeforeTheLastDayOfTheMonth(){
    return ", %s dni przed ostatnim dniem miesiąca"
  }
  commaOnTheLastX0OfTheMonth() {
    return ", ostatni %s miesiąca";
  }
  commaOnTheX0OfTheMonth() {
    return ", %s miesiąca";
  }
  commaX0ThroughX1() {
    return ", od %s do %s";
  }
  everyHour() {
    return "co godzinę";
  }
  everyMinute() {
    return "co minutę";
  }
  everyMinuteBetweenX0AndX1() {
    return "Co minutę od %s do %s";
  }
  everySecond() {
    return "co sekundę";
  }
  everyX0Hours() {
    return "co %s godzin";
  }
  everyX0Minutes() {
    return "co %s minut";
  }
  everyX0Seconds() {
    return "co %s sekund";
  }
  fifth() {
    return "piąty";
  }
  first() {
    return "pierwszy";
  }
  firstWeekday() {
    return "pierwszy dzień roboczy";
  }
  fourth() {
    return "czwarty";
  }
  minutesX0ThroughX1PastTheHour() {
    return "minuty od %s do %s";
  }
  second() {
    return "drugi";
  }
  secondsX0ThroughX1PastTheMinute() {
    return "sekundy od %s do %s";
  }
  spaceAnd() {
    return " i";
  }
  spaceX0OfTheMonth() {
    return " %s miesiąca";
  }
  lastDay() {
    return "ostatni dzień";
  }
  third() {
    return "trzeci";
  }
  weekdayNearestDayX0() {
    return "dzień roboczy najbliższy %s-ego dnia";
  }
  commaStartingX0() {
    return ", startowy %s";
  }
  daysOfTheWeek() {
    return ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"];
  }
  monthsOfTheYear() {
    return [
      "styczeń",
      "luty",
      "marzec",
      "kwiecień",
      "maj",
      "czerwiec",
      "lipiec",
      "sierpień",
      "wrzesień",
      "październik",
      "listopad",
      "grudzień"
    ];
  }
}
