// Czech

import { Locale } from "../locale";
export class cs implements Locale {
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
    return "Při vytváření popisu došlo k chybě. Zkontrolujte prosím správnost syntaxe cronu.";
  }
  everyMinute() {
    return "každou minutu";
  }
  everyHour() {
    return "každou hodinu";
  }
  atSpace() {
    return "V ";
  }
  everyMinuteBetweenX0AndX1() {
    return "Každou minutu mezi %s a %s";
  }
  at() {
    return "V";
  }
  spaceAnd() {
    return " a";
  }
  everySecond() {
    return "každou sekundu";
  }
  everyX0Seconds() {
    return "každých %s sekund";
  }
  secondsX0ThroughX1PastTheMinute() {
    return "sekundy od %s do %s";
  }
  atX0SecondsPastTheMinute() {
    return "v %s sekund";
  }
  everyX0Minutes() {
    return "každých %s minut";
  }
  minutesX0ThroughX1PastTheHour() {
    return "minuty od %s do %s";
  }
  atX0MinutesPastTheHour() {
    return "v %s minut";
  }
  everyX0Hours() {
    return "každých %s hodin";
  }
  betweenX0AndX1() {
    return "mezi %s a %s";
  }
  atX0() {
    return "v %s";
  }
  commaEveryDay() {
    return ", každý den";
  }
  commaEveryX0DaysOfTheWeek() {
    return ", každých %s dní v týdnu";
  }
  commaX0ThroughX1() {
    return ", od %s do %s";
  }
  first() {
    return "první";
  }
  second() {
    return "druhý";
  }
  third() {
    return "třetí";
  }
  fourth() {
    return "čtvrtý";
  }
  fifth() {
    return "pátý";
  }
  commaOnThe() {
    return ", ";
  }
  spaceX0OfTheMonth() {
    return " %s v měsíci";
  }
  lastDay() {
    return "poslední den";
  }
  commaOnTheLastX0OfTheMonth() {
    return ", poslední %s v měsíci";
  }
  commaOnlyOnX0() {
    return ", pouze v %s";
  }
  commaAndOnX0(){
    return ", a v %s";
  }
  commaEveryX0Months() {
    return ", každých %s měsíců";
  }
  commaOnlyInX0() {
    return ", pouze v %s";
  }
  commaOnTheLastDayOfTheMonth() {
    return ", poslední den v měsíci";
  }
  commaOnTheLastWeekdayOfTheMonth() {
    return ", poslední pracovní den v měsíci";
  }
  commaDaysBeforeTheLastDayOfTheMonth(){
    return ", %s dní před posledním dnem v měsíci"
  }
  firstWeekday() {
    return "první pracovní den";
  }
  weekdayNearestDayX0() {
    return "pracovní den nejblíže %s. dni";
  }
  commaOnTheX0OfTheMonth() {
    return ", v %s v měsíci";
  }
  commaEveryX0Days() {
    return ", každých %s dnů";
  }
  commaBetweenDayX0AndX1OfTheMonth() {
    return ", mezi dny %s a %s v měsíci";
  }
  commaOnDayX0OfTheMonth() {
    return ", %s. den v měsíci";
  }
  commaEveryX0Years() {
    return ", každých %s roků";
  }
  commaStartingX0() {
    return ", začínající %s";
  }
  daysOfTheWeek() {
    return ["Neděle", "Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota"];
  }
  monthsOfTheYear() {
    return [
      "Leden",
      "Únor",
      "Březen",
      "Duben",
      "Květen",
      "Červen",
      "Červenec",
      "Srpen",
      "Září",
      "Říjen",
      "Listopad",
      "Prosinec"
    ];
  }
}
